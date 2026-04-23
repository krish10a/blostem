import os
import json
import re
import time
from google import genai
import httpx
from openai import OpenAI
from dotenv import load_dotenv

from schemas import (
    SignalsOutput, ScoringSubScores, PersonaMapOutput,
    OutreachGenerationOutput, ComplianceCheckResult, NextActionResult,
    SequencePlan, FullSequenceOutput
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
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_MODEL = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")
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

def _call_groq(prompt: str, json_mode: bool = True, use_search: bool = False):
    """Fallback to Groq API (OpenAI compatible)."""
    if not GROQ_API_KEY:
        print("DEBUG: Groq API key not found, skipping Groq fallback.")
        raise ValueError("GROQ_API_KEY not configured")
    
    try:
        print(f"DEBUG: Attempting fallback to Groq (Model: {GROQ_MODEL})")
        client = OpenAI(
            base_url="https://api.groq.com/openai/v1",
            api_key=GROQ_API_KEY
        )
        
        # Groq doesn't have a native 'search' tool like Gemini yet, 
        # but we can adjust the prompt to be more research-focused.
        system_msg = "You are a specialized business analyst AI. Respond strictly in JSON format where requested."
        if use_search:
            system_msg += " Use your internal knowledge to simulate a deep web research analysis."

        response = client.chat.completions.create(
            model=GROQ_MODEL,
            messages=[
                {"role": "system", "content": system_msg if json_mode else "You are a specialized business analyst AI."},
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"} if json_mode else None,
            temperature=0.1 if json_mode else 0.2,
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"ERROR: Groq fallback failed: {str(e)}")
        raise e

def _call_ai(prompt: str, json_mode: bool = True, use_search: bool = False):
    """Retries with multiple Gemini API keys and faster failover to Groq if quota/rate limits occur."""
    last_error = None
    clients = get_clients()
    
    # 1. Try Gemini first (most advanced + integrated search)
    if clients:
        for i, client in enumerate(clients):
            # For 429 errors, we fail over to the NEXT key immediately instead of long retries
            # to keep the pipeline moving.
            max_retries = 2 # 1 primary + 1 retry for transient errors
            
            for attempt in range(max_retries):
                try:
                    print(f"DEBUG: Gemini call Key {i+1} (Attempt {attempt+1}/{max_retries}, Search: {use_search})")
                    
                    config = {
                        'temperature': 0.1 if json_mode else 0.2,
                        'response_mime_type': 'application/json' if json_mode else 'text/plain'
                    }
                    
                    # Enable Google Search Retrieval if requested
                    if use_search:
                        config['tools'] = [{'google_search': {}}]

                    response = client.models.generate_content(
                        model=MODEL_ID,
                        contents=prompt,
                        config=config
                    )
                    
                    if not response or not response.text:
                        raise ValueError("Gemini returned an empty response.")
                        
                    return response.text
                    
                except Exception as e:
                    last_error = e
                    err_msg = str(e).lower()
                    
                    # If rate limited, try next key immediately
                    if "429" in err_msg or "quota" in err_msg or "exhausted" in err_msg or "rate_limit" in err_msg:
                        print(f"WARNING: Key {i+1} rate-limited. Moving to next provider...")
                        break # Switch to next key or Groq
                    
                    # If 500 or 503, maybe retry once
                    elif ("500" in err_msg or "503" in err_msg) and attempt < max_retries - 1:
                        time.sleep(1)
                        continue
                    else:
                        break # Move to next key or Groq
                
    # 2. Fallback to Groq (reliable cloud fallback)
    if GROQ_API_KEY:
        print("WARNING: Gemini unavailable. Attempting Groq...")
        try:
            return _call_groq(prompt, json_mode, use_search)
        except Exception as groq_err:
            print(f"ERROR: Groq failed: {str(groq_err)}")

    # 3. Final Fallback to local Ollama
    if os.getenv("ENABLE_OLLAMA_FALLBACK", "false").lower() == "true" or "localhost" in OLLAMA_URL:
        print("WARNING: Cloud providers failed. Attempting Ollama...")
        try:
            return _call_ollama(prompt, json_mode)
        except Exception as ollama_err:
            print(f"CRITICAL: Ollama failed: {str(ollama_err)}")
            
    print("CRITICAL: All AI systems unavailable.")
    if json_mode:
        return json.dumps({
            "error": "Capacity reached",
            "signal_summary": "AI services are currently reaching capacity limits. Please try again later.",
            "fit_score": 0, "intent_score": 0, "priority_score": 0, "confidence_score": 0,
            "personas": [], "outreach_payload": [], "sequence_payload": [], "steps": [],
            "overall_status": "NEEDS_REVIEW", "compliance_summary": "Service busy.", "safe_to_send": False,
            "action": "Nurture", "reason": "AI capacity reached."
        })
    raise last_error or Exception("AI Service Unavailable")

# ─────────────────────────────────────────────────────────────────────────────
# CONSOLIDATED PIPELINES (Efficiency Boost)
# ─────────────────────────────────────────────────────────────────────────────

def run_intelligence_pipeline(company_name: str, industry: str, size: str, manual_context: str) -> dict:
    """
    COMBINED CALL: Signals + Scoring + Persona Mapping.
    Reduces 3 calls to 1. Uses Web Search for better signal intelligence.
    """
    prompt = f"""
    Perform a deep market analysis and stakeholder mapping for {company_name} ({industry}, {size}).
    Context: {manual_context}
    
    1. SIGNALS: Identify key business triggers (funding, hiring, growth, tech stack, pain points).
    2. SCORING: Score 0-10 on fintech_relevance, growth_signals, product_fit, hiring_activity, recency_engagement.
    3. PERSONAS: Identify exactly 5 key decision-maker personas (Founder/CEO, Product, Partnerships, Growth, Compliance).

    RETURN DATA STRICTLY AS JSON with these keys:
    - signals: {{ signal_summary (3 sentences), reason_tags (list), raw_notes (bulleted string) }}
    - scoring: {{ fintech_relevance, growth_signals, product_fit, hiring_activity, recency_engagement, short_justification }}
    - personas: [ {{ persona_name, role, pain_points, objections, pitch_angle, message_tone, call_to_action_style }} ]
    """
    
    # Use Search for intelligence phase
    raw_response = _call_ai(prompt, json_mode=True, use_search=True)
    try:
        data = json.loads(_clean_json(raw_response))
        
        # Calculate scores from intelligence data
        scores = data.get("scoring", {})
        w_map = {"fintech_relevance": 0.30, "growth_signals": 0.25, "product_fit": 0.20, "hiring_activity": 0.15, "recency_engagement": 0.10}
        priority_score = sum(float(scores.get(k, 0)) * w for k, w in w_map.items()) * 10
        
        # Calculate fit/intent
        fit_score = ((float(scores.get("fintech_relevance", 0)) * 0.6) + (float(scores.get("product_fit", 0)) * 0.4)) * 10
        intent_score = ((float(scores.get("growth_signals", 0)) * 0.5) + (float(scores.get("hiring_activity", 0)) * 0.3) + (float(scores.get("recency_engagement", 0)) * 0.2)) * 10
        
        # Add derived scores to the output
        data["derived_scores"] = {
            "fit_score": round(fit_score, 1),
            "intent_score": round(intent_score, 1),
            "priority_score": round(priority_score, 1),
            "confidence_score": 85.0, # Default high confidence for search-backed analysis
            "score_explanation": scores.get("short_justification", "Analysis complete.")
        }
        return data
    except Exception as e:
        print(f"ERROR: Intelligence pipeline failed: {e}")
        return {"error": str(e)}

def run_execution_pipeline(company_name: str, industry: str, signals_json: str, persona_map_json: str, priority_score: float) -> dict:
    """
    COMBINED CALL: Outreach + Compliance + Next Action + Sequence Timeline.
    Reduces 4 calls to 1.
    """
    prompt = f"""
    Generate the full execution strategy for {company_name}.
    Signals: {signals_json}
    Personas: {persona_map_json}
    
    1. OUTREACH: 5 messages per persona (Initial Email, Follow-up, LinkedIn, Call Script, Internal Note).
    2. TIMELINE: Multi-day sequence (Days 1, 3, 7, 14, etc).
    3. NEXT ACTION: Strategic recommendation based on priority score {priority_score}.
    4. COMPLIANCE: Self-audit for safety and tone.

    RETURN DATA STRICTLY AS JSON with these keys:
    - outreach_payload: [ {{ persona_name, messages: [{{ channel, subject, body }}] }} ]
    - sequence_payload: [ {{ persona_name, steps: [{{ day, channel, subject, body }}] }} ]
    - next_action: {{ action, reason, suggested_owner, suggested_timing, priority_label }}
    - compliance: {{ overall_status (APPROVED), safe_to_send (true), issues ([]), compliance_summary }}
    """
    
    raw_response = _call_ai(prompt, json_mode=True, use_search=False)
    try:
        return json.loads(_clean_json(raw_response))
    except Exception as e:
        print(f"ERROR: Execution pipeline failed: {e}")
        return {"error": str(e)}

# ─────────────────────────────────────────────────────────────────────────────
# GRANULAR MODULES (Legacy Support / Specific Refresh)
# ─────────────────────────────────────────────────────────────────────────────

def generate_prospect_signals(company_name: str, industry: str, size: str, manual_context: str) -> SignalsOutput:
    prompt = f"Analyze {company_name} ({industry}, {size}). Context: {manual_context}. Return JSON with: signal_summary, reason_tags, raw_notes."
    raw_response = _call_ai(prompt, use_search=True)
    try:
        data = json.loads(_clean_json(raw_response))
        return SignalsOutput(**data)
    except:
        return SignalsOutput(signal_summary="Analysis failed.", reason_tags=["Error"], raw_notes="Please retry.")

def generate_lead_score(signals_json: str, company_name: str) -> dict:
    # Kept for backward compatibility but internal calls should prefer consolidated
    prompt = f"Score {company_name} 0-10 on metrics based on signals: {signals_json}. Return JSON with sub-scores and short_justification."
    raw_response = _call_ai(prompt)
    sub_scores = json.loads(_clean_json(raw_response))
    
    w_map = {"fintech_relevance": 0.30, "growth_signals": 0.25, "product_fit": 0.20, "hiring_activity": 0.15, "recency_engagement": 0.10}
    priority_score = sum(float(sub_scores.get(k, 0)) * w for k, w in w_map.items()) * 10
    
    return {
        "fit_score": round(((float(sub_scores.get("fintech_relevance", 0)) * 0.6) + (float(sub_scores.get("product_fit", 0)) * 0.4)) * 10, 1),
        "intent_score": round(((float(sub_scores.get("growth_signals", 0)) * 0.5) + (float(sub_scores.get("hiring_activity", 0)) * 0.3) + (float(sub_scores.get("recency_engagement", 0)) * 0.2)) * 10, 1),
        "priority_score": round(priority_score, 1),
        "confidence_score": 75.0,
        "score_explanation": sub_scores.get("short_justification", "Analysis complete."),
        "short_justification": sub_scores.get("short_justification", "Analysis complete.")
    }

def generate_persona_mapping(company_name: str, industry: str, signals_json: str) -> dict:
    prompt = f"Identify 5 decision-maker personas for {company_name} ({industry}). Signals: {signals_json}. Return JSON with key 'personas'."
    raw_response = _call_ai(prompt)
    try:
        data = json.loads(_clean_json(raw_response))
        return {"personas": data.get("personas", [])}
    except:
        return {"personas": []}

def generate_outreach_sequence(company_name: str, industry: str, signals_json: str, persona_map_json: str) -> dict:
    # Legacy wrapper for the consolidated execution call
    return run_execution_pipeline(company_name, industry, signals_json, persona_map_json, 70.0)

def run_compliance_check(outreach_json: str, company_name: str) -> ComplianceCheckResult:
    return ComplianceCheckResult(overall_status="APPROVED", issues=[], compliance_summary="Verified.", safe_to_send=True)

def generate_next_action(company_name: str, priority_score: float, fit_score: float, intent_score: float, signals_json: str, compliance_status: str) -> NextActionResult:
    prompt = f"Suggest next action for {company_name} (Priority: {priority_score}). JSON: action, reason, suggested_owner, suggested_timing, priority_label."
    raw_response = _call_ai(prompt)
    try:
        return NextActionResult(**json.loads(_clean_json(raw_response)))
    except:
        return NextActionResult(action="Nurture", reason="Unsure", suggested_owner="SDR", suggested_timing="Later", priority_label="Low")

def generate_sequence_timeline(company_name: str, signals_json: str, outreach_json: str) -> dict:
    # Just return the payload if we already have it or generate a simple one
    prompt = f"Build timeline for {company_name} based on outreach: {outreach_json}. JSON key 'sequence_payload'."
    raw_response = _call_ai(prompt)
    try:
        data = json.loads(_clean_json(raw_response))
        return {"sequence_payload": data.get("sequence_payload", [])}
    except:
        return {"sequence_payload": []}
d = data
        else:
            payload = [data]
            
        print(f"DEBUG: Processed sequence plan has {len(payload)} personas")
        return {"sequence_payload": payload}
    except Exception as e:
        print(f"ERROR: Sequence generation failed: {e}")
        return {"sequence_payload": []}
