from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ProspectBase(BaseModel):
    company_name: str
    website: Optional[str] = None
    industry: Optional[str] = None
    size: Optional[str] = None

class ProspectCreate(ProspectBase):
    pass

class ProspectUpdate(BaseModel):
    signals: Optional[str] = None
    fit_score: Optional[float] = None
    intent_score: Optional[float] = None
    priority_score: Optional[float] = None
    confidence_score: Optional[float] = None
    score_explanation: Optional[str] = None
    persona_map: Optional[str] = None
    messages: Optional[str] = None
    sequence_plan: Optional[str] = None
    compliance_status: Optional[str] = None
    next_action: Optional[str] = None

class ProspectResponse(ProspectBase):
    id: int
    signals: Optional[str] = None
    fit_score: Optional[float] = None
    intent_score: Optional[float] = None
    priority_score: Optional[float] = None
    confidence_score: Optional[float] = None
    score_explanation: Optional[str] = None
    persona_map: Optional[str] = None
    messages: Optional[str] = None
    sequence_plan: Optional[str] = None
    compliance_status: Optional[str] = None
    next_action: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class SignalGenerationRequest(BaseModel):
    manual_context: str

class SignalsOutput(BaseModel):
    signal_summary: str
    reason_tags: list[str]
    raw_notes: str

class ScoringSubScores(BaseModel):
    fintech_relevance: float
    growth_signals: float
    product_fit: float
    hiring_activity: float
    recency_engagement: float
    score_explanation: str
    short_justification: str

class ScoringOutput(BaseModel):
    fit_score: float
    intent_score: float
    priority_score: float
    confidence_score: float
    score_explanation: str
    short_justification: str

class Persona(BaseModel):
    persona_name: str
    role: str
    pain_points: str
    objections: str
    pitch_angle: str
    message_tone: str
    call_to_action_style: str

class PersonaMapOutput(BaseModel):
    personas: list[Persona]
