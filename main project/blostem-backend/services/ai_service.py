import os
import json
from google import genai
from dotenv import load_dotenv

from schemas import SignalsOutput, ScoringSubScores, PersonaMapOutput, OutreachGenerationOutput

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

def get_client():
    if not GEMINI_API_KEY:
        raise ValueError("GEMINI_API_KEY not configured")
    return genai.Client(api_key=GEMINI_API_KEY)

def generate_prospect_signals(company_name: str, industry: str, size: str, manual_context: str) -> SignalsOutput:
    """
    Calls Gemini API with Google Search Grounding to extract hyper-specific signals.
    """
    client = get_client()

    prompt = f"""
    You are an elite B2B Fintech Sales Analyst.
    Your task is to analyze the following company using LIVE Google Search Data and extract highly specific, hyper-personalized actionable sales signals.
    DO NOT GENERATE GENERIC MARKETING FLUFF. You must provide a mixture of general business overview and *very* specific facts found online right now (e.g., recent news, stock changes, specific product launches, specific leadership names or exact headcount quotes).
    
    Company Name: {company_name}
    Industry: {industry or 'Unknown'}
    Size: {size or 'Unknown'}
    Additional Context: {manual_context}

    Output Requirements (MUST BE RAW JSON):
    You MUST output ONLY a valid JSON object matching the following structure exactly, with absolutely NO markdown formatting or conversational text around it:
    {{
      "signal_summary": "A 3-sentence summary. Sentence 1: Strategic overview. Sentence 2-3: Hyper-specific recent events or specific data points found from the search context that make them a prime target right now.",
      "reason_tags": ["Acquired Company X in 2024", "Launched Treasury API", "Seeking Series C"],
      "raw_notes": "• Bullet point 1 with hard facts\\n• Bullet point 2 with exact numbers\\n• Bullet point 3"
    }}
    """

    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=prompt,
        config={
            'temperature': 0.2,
            'tools': [{'google_search': {}}]
        }
    )

    result_json = response.text
    # Robustly strip markdown JSON blocks
    if "```json" in result_json:
        result_json = result_json.split("```json")[-1].split("```")[0].strip()
    elif "```" in result_json:
        result_json = result_json.split("```")[1].split("```")[0].strip()
    else:
        result_json = result_json.strip()

    parsed_dict = json.loads(result_json)
    return SignalsOutput(**parsed_dict)

def generate_lead_score(signals_json: str, company_name: str) -> dict:
    """
    Calls Gemini API to evaluate signals based on 5 strict heuristics.
    Then mathematically calculates fit_score, intent_score, and priority_score in Python.
    """
    client = get_client()

    prompt = f"""
    You are a stringent B2B Fintech Scoring Algorithm.
    Provide a score from 0.0 to 10.0 for the following 5 categories based *only* on the provided signals.
    Be extremely critical. If there is no hard evidence for a category, score it low. Focus on the hyper-specific details provided.
    
    Company: {company_name}
    Signals: {signals_json}

    Categories to score (0-10):
    1. fintech_relevance: Is the company clearly in the fintech ecosystem? (e.g. Neo-bank = 10, Logistics = 0)
    2. growth_signals: Are there indicators of rapid growth, funding, or market expansion?
    3. product_fit: Does their size and stage suggest they need enterprise infrastructure?
    4. hiring_activity: Are they actively hiring, especially in engineering or product?
    5. recency_engagement: Is the data recent and do they seem active in the market right now?

    Also provide:
    - score_explanation: A 2-3 sentence internal reasoning for these scores based on the specific evidence.
    - short_justification: A single punchy, highly-specific sentence to show on the dashboard including a specific data point from the signals.
    """

    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=prompt,
        config={
            'response_mime_type': 'application/json',
            'response_schema': ScoringSubScores,
            'temperature': 0.1
        }
    )

    result_json = response.text
    if result_json.startswith("```json"):
        result_json = result_json.replace("```json", "").replace("```", "").strip()

    sub_scores = json.loads(result_json)
    
    # Base calculation following the exact MVP rule-based weights
    w_fintech = 0.30
    w_growth = 0.25
    w_fit = 0.20
    w_hiring = 0.15
    w_recency = 0.10

    priority_score = (
        float(sub_scores["fintech_relevance"]) * w_fintech +
        float(sub_scores["growth_signals"]) * w_growth +
        float(sub_scores["product_fit"]) * w_fit +
        float(sub_scores["hiring_activity"]) * w_hiring +
        float(sub_scores["recency_engagement"]) * w_recency
    ) * 10 

    fit_score = ((float(sub_scores["fintech_relevance"]) * 0.6) + (float(sub_scores["product_fit"]) * 0.4)) * 10
    intent_score = ((float(sub_scores["growth_signals"]) * 0.5) + (float(sub_scores["hiring_activity"]) * 0.3) + (float(sub_scores["recency_engagement"]) * 0.2)) * 10

    non_zero_count = sum(1 for k in ["fintech_relevance", "growth_signals", "product_fit", "hiring_activity", "recency_engagement"] if float(sub_scores[k]) > 0)
    confidence_score = (non_zero_count / 5.0) * 100.0

    return {
        "fit_score": round(fit_score, 1),
        "intent_score": round(intent_score, 1),
        "priority_score": round(priority_score, 1),
        "confidence_score": round(confidence_score, 1),
        "score_explanation": sub_scores["score_explanation"],
        "short_justification": sub_scores["short_justification"]
    }

def generate_persona_mapping(company_name: str, industry: str, signals_json: str) -> dict:
    """
    Calls Gemini API to map key personas and generate tailored pitch angles.
    """
    client = get_client()

    prompt = f"""
    You are an elite B2B Fintech Sales Strategist.
    Based on the specific signals and company profile below, identify 3-5 key decision-making personas (e.g. Founder, Head of Product, Compliance Lead).
    For each persona, output their specific pain points, likely objections, the best pitch angle for Blostem, the recommended message tone, and the call-to-action style.
    Do not use generic fluff. Be highly specific to their industry and the signals.
    
    Company: {company_name}
    Industry: {industry or 'Unknown'}
    Signals: {signals_json}

    Return a list of personas matching the provided JSON schema.
    """

    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=prompt,
        config={
            'response_mime_type': 'application/json',
            'response_schema': PersonaMapOutput,
            'temperature': 0.2
        }
    )

    result_json = response.text
    if result_json.startswith("```json"):
        result_json = result_json.replace("```json", "").replace("```", "").strip()
        
    return json.loads(result_json)

def generate_outreach_sequence(company_name: str, industry: str, signals_json: str, persona_map_json: str) -> dict:
    """
    Calls Gemini API to output highly personalized, compliance-safe sales outreach messages (Emails, LinkedIn) for each identified persona.
    """
    client = get_client()

    prompt = f"""
    You are an elite B2B Fintech Account Executive closing multi-million dollar deals.
    You need to write hyper-personalized outreach sequences for the decision-makers at {company_name} ({industry or 'Unknown Industry'}).
    
    CRITICAL RULE: NOTHING you write should be a generic template. ALL MESSAGES must be hyper-specific to the exact Persona Pain Points, Pitch Angle, and the Company Signals provided below. 
    You must be compliance-safe: NO false promises, NO regulatory overstatements, NO spammy "cheap" sales language.
    
    Personalization & Tone:
    - Use placeholders like `[Prospect Name]` and `[Your Name]` to make the messages feel human and direct.
    - Maintain a professional, peer-to-peer executive tone.
    
    Formatting:
    - IMPORTANT: Do not return a single block of text.
    - Use standard professional email/message formatting with clear paragraphs and double line breaks (`\\n\\n`) between them.
    - Keep paragraphs short (2-3 sentences max) for high readability.
    
    Here is the Company Context (Signals):
    {signals_json}
    
    Here are the specific Stakeholders and their tailored angles (Personas):
    {persona_map_json}
    
    For EVERY persona in the map, you must generate exactly three outreach messages:
    1. "Email - Initial" (Include a concise, hyper-focused Subject Line)
    2. "Email - Follow-up" (Include a concise Subject Line)
    3. "LinkedIn Connection" (Keep the subject field blank or "N/A", keep body under 300 chars, highly personalized)
    
    Return a JSON object conforming strictly to the requested schema.
    """

    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=prompt,
        config={
            'response_mime_type': 'application/json',
            'response_schema': OutreachGenerationOutput,
            'temperature': 0.3
        }
    )

    result_json = response.text
    if result_json.startswith("```json"):
        result_json = result_json.replace("```json", "").replace("```", "").strip()
        
    return json.loads(result_json)
