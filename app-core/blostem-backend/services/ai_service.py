import os
import json
import re
import time
from google import genai
import httpx
from dotenv import load_dotenv

from schemas import (
    SignalsOutput, ScoringSubScores, PersonaMapOutput,
    OutreachGenerationOutput, ComplianceCheckResult, NextActionResult
)

load_dotenv()

# Gemini Multi-Key Configuration
GEMINI_KEYS = [
    os.getenv("GEMINI_API_KEY_1"),
    os.getenv("GEMINI_API_KEY_2"),
    os.getenv("GEMINI_API_KEY_3"),
    os.getenv("GEMINI_API_KEY_4")
]
# Filter out None values in case some keys aren't set
GEMINI_KEYS = [k for k in GEMINI_KEYS if k]

MODEL_ID = "gemini-2.0-flash"
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "gemma2")
OLLAMA_URL = "http://localhost:11434/api/generate"

_clients_cache = None

def get_clients():
    """
    Lazy-init Gemini clients so missing env keys don't crash app import/startup.
    Returns an empty list when no keys are configured.
    """
    global _clients_cache
    if _clients_cache is not None:
        return _clients_cache
    if not GEMINI_KEYS:
        _clients_cache = []
        return _clients_cache
    _clients_cache = [genai.Client(api_key=k) for k in GEMINI_KEYS]
    return _clients_cache

def _clean_json(text: str) -> str:
    """Robustly extract JSON from text, handling model chatter."""
    if not text: return "{}"
    text = text.strip()
    # Try looking for markdown blocks
    match = re.search(r'```(?:json)?\s*(\{.*?\})\s*```', text, re.DOTALL)
    if match: 
        text = match.group(1)
    else:
        # Try finding the first { and last }
        start = text.find('{')
        end = text.rfind('}')
        if start != -1 and end != -1: 
            text = text[start:end+1]
    
    # Remove control characters but keep common whitespace
    return "".join(char for char in text if char.isprintable() or char in "\n\r\t").strip()

def _call_ollama(prompt: str, json_mode: bool = True):
    """Fallback to local Ollama instance."""
    try:
        print(f"DEBUG: Attempting fallback to local Ollama (Model: {OLLAMA_MODEL})")
        payload = {
            "model": OLLAMA_MODEL,
            "prompt": prompt,
            "stream": False,
        }
        if json_mode:
            payload["format"] = "json"
            
        with httpx.Client(timeout=60.0) as client:
            response = client.post(OLLAMA_URL, json=payload)
            response.raise_for_status()
            data = response.json()
            return data.get("response", "")
    except Exception as e:
        print(f"ERROR: Local Ollama fallback failed: {str(e)}")
        raise e

def _call_ai(prompt: str, json_mode: bool = True):
    """Retries with multiple Gemini API keys if quota/rate limits occur."""
    last_error = None
    clients = get_clients()
    
    # Try Gemini first when configured
    if clients:
        # Try each API key in sequence (rotation fallback)
        for i, client in enumerate(clients):
            for attempt in range(2): # Try each key twice if it's a transient error
                try:
                    print(f"DEBUG: Attempting Gemini call with Key {i+1} (Attempt {attempt+1})")
                    
                    # Gemini 1.0+ SDK call
                    response = client.models.generate_content(
                        model=MODEL_ID,
                        contents=prompt,
                        config={
                            'temperature': 0.1 if json_mode else 0.2,
                            'response_mime_type': 'application/json' if json_mode else 'text/plain'
                        }
                    )
                    
                    if not response or not response.text:
                        raise ValueError("Gemini returned an empty response.")
                        
                    return response.text
                    
                except Exception as e:
                    last_error = e
                    err_msg = str(e).lower()
                    
                    # Check for rate limit / quota issues (ResourceExhausted or 429)
                    if "429" in err_msg or "quota" in err_msg or "exhausted" in err_msg or "rate_limit" in err_msg:
                        print(f"WARNING: Key {i+1} rate-limited or quota exhausted. Switching to next key...")
                        break # Break inner loop, move to next client
                    
                    print(f"ERROR: Key {i+1} failed with error: {str(e)[:100]}. Trying next fallback...")
                    break # Move to next key for any other error too
                
    # Final Fallback to local Ollama
    print("WARNING: All Gemini API keys failed or were rate-limited. Falling back to local Ollama...")
    try:
        response_text = _call_ollama(prompt, json_mode)
        print(f"DEBUG: RAW OLLAMA RESPONSE: {response_text[:200]}...")
        return response_text
    except Exception as ollama_err:
        print("CRITICAL: Both Gemini AND Ollama systems failed.")
        if last_error:
            raise last_error
        raise ollama_err

# ─────────────────────────────────────────────────────────────────────────────
# MODULES
# ─────────────────────────────────────────────────────────────────────────────

def generate_prospect_signals(company_name: str, industry: str, size: str, manual_context: str) -> SignalsOutput:
    prompt = (
        f"Analyze {company_name} ({industry}, {size}). Context: {manual_context}. "
        "Return JSON strictly with: signal_summary (string, 3 sentences min), reason_tags (list of strings), raw_notes (single string with multi-line bullet points)."
    )
    raw_response = _call_ai(prompt)
    try:
        data = json.loads(_clean_json(raw_response))
        if isinstance(data.get("raw_notes"), list):
            data["raw_notes"] = "\n".join(f"- {note}" for note in data["raw_notes"])
        return SignalsOutput(**data)
    except Exception as e:
        print(f"ERROR: Signals parsing failed: {e}. Returning safe fallback.")
        return SignalsOutput(
            signal_summary="Signal analysis in progress.",
            reason_tags=["Pending"],
            raw_notes="Automated analysis failed. Please review manually."
        )

def generate_lead_score(signals_json: str, company_name: str) -> dict:
    prompt = (
        f"Score {company_name} 0-10 on these metrics based on signals: {signals_json}. "
        "Metrics: fintech_relevance, growth_signals, product_fit, hiring_activity, recency_engagement. "
        "Return JSON with sub-scores and 'short_justification'."
    )
    raw_response = _call_ai(prompt)
    sub_scores = json.loads(_clean_json(raw_response))
    
    w_fintech, w_growth, w_fit, w_hiring, w_recency = 0.30, 0.25, 0.20, 0.15, 0.10
    priority_score = (sum(float(sub_scores.get(k, 0)) * w for k, w in zip(["fintech_relevance", "growth_signals", "product_fit", "hiring_activity", "recency_engagement"], [w_fintech, w_growth, w_fit, w_hiring, w_recency]))) * 10

    # Calculate confidence score from signal richness (not hardcoded)
    try:
        sig_data = json.loads(signals_json)
        tag_count = len(sig_data.get("reason_tags", []))
        raw_notes = sig_data.get("raw_notes", "")
        note_bullet_count = raw_notes.count("- ") if raw_notes else 0
        summary_words = len(sig_data.get("signal_summary", "").split())
        confidence_score = round(min(45.0 + (tag_count * 5.0) + (note_bullet_count * 3.0) + (summary_words * 0.3), 97.0), 1)
    except Exception:
        confidence_score = 65.0

    return {
        "fit_score": round(((float(sub_scores.get("fintech_relevance", 0)) * 0.6) + (float(sub_scores.get("product_fit", 0)) * 0.4)) * 10, 1),
        "intent_score": round(((float(sub_scores.get("growth_signals", 0)) * 0.5) + (float(sub_scores.get("hiring_activity", 0)) * 0.3) + (float(sub_scores.get("recency_engagement", 0)) * 0.2)) * 10, 1),
        "priority_score": round(priority_score, 1),
        "confidence_score": confidence_score,
        "score_explanation": sub_scores.get("short_justification", "Analysis complete."),
        "short_justification": sub_scores.get("short_justification", "Analysis complete.")
    }

def generate_persona_mapping(company_name: str, industry: str, signals_json: str) -> dict:
    prompt = (
        f"Identify exactly 5 decision-maker personas for {company_name} ({industry}). Signals: {signals_json}. "
        "The 5 personas MUST cover these roles (adapt names to fit the company): "
        "1) Founder or CEO, 2) Head of Product, 3) Head of Partnerships or BizDev, "
        "4) Head of Growth or Marketing, 5) Compliance or Risk Lead. "
        "If the company is technical, replace role 5 with Engineering or Tech Lead. "
        "Strictly return JSON with exactly one key 'personas', mapping to a list of 5 objects. "
        "Each object MUST have these exact snake_case keys: "
        "persona_name, role, pain_points, objections, pitch_angle, message_tone, call_to_action_style."
    )
    raw_response = _call_ai(prompt)
    try:
        data = json.loads(_clean_json(raw_response))
        
        # Robust fallback parsing if AI grouped it under "PersonaMapOutput" instead of "personas"
        if "PersonaMapOutput" in data:
            personas = data["PersonaMapOutput"]
        elif "personas" in data:
            personas = data["personas"]
        elif isinstance(data, list):
            personas = data
        else:
            personas = [data] # Fallback
            
        # Ensure standard snake_case keys are returned
        standardized_personas = []
        for p in personas:
            standardized_personas.append({
                "persona_name": p.get("persona_name", p.get("PersonaName", "Decision Maker")),
                "role": p.get("role", p.get("Role", "Management")),
                "pain_points": p.get("pain_points", p.get("PainPoints", p.get("FocusArea", "General"))),
                "objections": p.get("objections", p.get("Objections", "Cost")),
                "pitch_angle": p.get("pitch_angle", p.get("PitchAngle", "Efficiency")),
                "message_tone": p.get("message_tone", p.get("MessageTone", "Professional")),
                "call_to_action_style": p.get("call_to_action_style", p.get("CallToActionStyle", "Meeting Request"))
            })
            
        return {"personas": standardized_personas}
    except Exception as e:
        print(f"ERROR: Persona mapping failed: {e}")
        return {"personas": [{"persona_name": "Decision Maker", "role": "Management", "pain_points": "General", "objections": "Cost", "pitch_angle": "Efficiency", "message_tone": "Professional", "call_to_action_style": "Meeting Request"}]}

def generate_outreach_sequence(company_name: str, industry: str, signals_json: str, persona_map_json: str) -> dict:
    prompt = (
        f"Write exactly 5 personalized sales messages per persona for {company_name} ({industry}). "
        f"Tailor every message specifically to these signals: {signals_json} and these personas: {persona_map_json}. "
        "The 5 messages MUST use EXACTLY these channels in order: "
        "1) channel='Initial Email' — a formal first-touch introduction email (subject + 4-5 sentence body), "
        "2) channel='Follow-up Email' — a follow-up to be sent 5-7 days later if no reply (subject + 3-4 sentence body), "
        "3) channel='LinkedIn Note' — a short 2-3 line LinkedIn connection message (subject='LinkedIn Connection', body max 60 words), "
        "4) channel='Call Script Summary' — a concise, bulleted script for a phone call (subject='Phone Script', body should include: opening, value-prop tie-in, and closing question), "
        "5) channel='Internal Sales Note' — NOT for sending externally; a brief internal note for the sales rep summarizing the persona's pain point and specific reason for outreach (subject='Sales Rep Note', body 2-4 sentences). "
        "CRITICAL COMPLIANCE RULES: "
        "1. Do not use high-pressure sales tactics. "
        "2. Do not guarantee ROI or make definitive financial promises. "
        "3. Ensure the tone is consultative and professional. "
        "4. Avoid generic buzzwords; focus strictly on verifiable value propositions. "
        "5. Every message must feel tailor-made for the specific persona role and company context — not generic. "
        "Your generated outreach MUST comply with these rules. "
        "Strictly return JSON with exactly one key 'outreach_payload', mapping to a list of PersonaOutreach objects. "
        "Each PersonaOutreach object MUST have these exact keys: persona_name, messages. "
        "Each message MUST have these exact keys: channel, subject, body."
    )
    raw_response = _call_ai(prompt)
    try:
        data = json.loads(_clean_json(raw_response))
        
        # Robust parsing fallback
        if "OutreachGenerationOutput" in data:
            if "outreach_payload" in data["OutreachGenerationOutput"]:
                payload = data["OutreachGenerationOutput"]["outreach_payload"]
            else:
                payload = data["OutreachGenerationOutput"]
        elif "outreach_payload" in data:
            payload = data["outreach_payload"]
        elif isinstance(data, list):
            payload = data
        else:
            payload = [data]
            
        print(f"DEBUG: Processed payload has {len(payload)} personas")
        return {"outreach_payload": payload}
    except Exception as e:
        print(f"ERROR: Outreach generation failed: {e}")
        return {"outreach_payload": []}

def run_compliance_check(outreach_json: str, company_name: str) -> ComplianceCheckResult:
    prompt = (
        f"Audit these sales messages for {company_name} for compliance. "
        "Strictly return JSON with these keys: "
        "'overall_status' (APPROVED/NEEDS_REVISION/FLAGGED), "
        "'issues' (list with issue_type, description, offending_text, suggestion), "
        "'compliance_summary' (string), "
        "'safe_to_send' (boolean). "
        f"Messages content: {outreach_json}"
    )
    raw_response = _call_ai(prompt)
    try:
        return ComplianceCheckResult(**json.loads(_clean_json(raw_response)))
    except Exception as e:
        print(f"ERROR: Compliance parsing failed: {e}. Returning safe fallback.")
        return ComplianceCheckResult(
            overall_status="NEEDS_REVIEW",
            issues=[],
            compliance_summary="Automated audit failed; manual check required.",
            safe_to_send=False
        )

def generate_next_action(company_name: str, priority_score: float, fit_score: float, intent_score: float, signals_json: str, compliance_status: str) -> NextActionResult:
    prompt = (
        f"Suggest next sales action for {company_name} based on scores ({priority_score}, {fit_score}, {intent_score}). "
        "Strictly return JSON with keys: action, reason, suggested_owner, suggested_timing, priority_label."
    )
    raw_response = _call_ai(prompt)
    try:
        return NextActionResult(**json.loads(_clean_json(raw_response)))
    except Exception as e:
        print(f"ERROR: NextAction parsing failed: {e}")
        return NextActionResult(
            action="Nurture",
            reason="AI analysis inconclusive. Defaulting to long-term nurture.",
            suggested_owner="SDR",
            suggested_timing="Follow up in 7 days",
            priority_label="Medium"
        )

def generate_sequence_timeline(company_name: str, signals_json: str, outreach_json: str) -> dict:
    prompt = (
        f"Build a multi-day outreach timeline for {company_name} based on: {outreach_json}. "
        "CRITICAL RULES: "
        "1. The 'day' values must NOT be sequential (e.g. not 1, 2, 3). Use staggered intervals with suitable gaps, for example: Day 1, Day 3, Day 7, Day 14. "
        "Strictly return JSON with exactly one key 'sequence_payload', mapping to a list of SequencePlan objects. "
        "Each SequencePlan MUST have keys: persona_name, steps. "
        "Each step MUST have keys: day, channel, subject, body."
    )
    raw_response = _call_ai(prompt)
    try:
        data = json.loads(_clean_json(raw_response))
        
        # Robust parsing fallback
        if "FullSequenceOutput" in data:
            if "sequence_payload" in data["FullSequenceOutput"]:
                payload = data["FullSequenceOutput"]["sequence_payload"]
            else:
                payload = data["FullSequenceOutput"]
        elif "sequence_payload" in data:
            payload = data["sequence_payload"]
        elif isinstance(data, list):
            payload = data
        else:
            payload = [data]
            
        print(f"DEBUG: Processed sequence plan has {len(payload)} personas")
        return {"sequence_payload": payload}
    except Exception as e:
        print(f"ERROR: Sequence generation failed: {e}")
        return {"sequence_payload": []}
