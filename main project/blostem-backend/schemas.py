from pydantic import BaseModel
from typing import Optional, List
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
    outreach_status: Optional[str] = None

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
    outreach_status: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class ApproveSequenceRequest(BaseModel):
    """Request body for approving or un-approving a sequence."""
    approve: bool = True

# Bug Fix: manual_context now has a default so the endpoint
# works even if the body is empty (edge case: direct API calls)
class SignalGenerationRequest(BaseModel):
    manual_context: str = ""

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

class OutreachMessage(BaseModel):
    channel: str
    subject: str
    body: str

class PersonaOutreach(BaseModel):
    persona_name: str
    messages: list[OutreachMessage]

class OutreachGenerationOutput(BaseModel):
    outreach_payload: list[PersonaOutreach]

# ─── Module 6: Compliance Check ───────────────────────────────────────────────

class ComplianceFlaggedIssue(BaseModel):
    """A single compliance issue found in the outreach content."""
    issue_type: str   # e.g. "False Claim", "Regulatory Overstatement"
    description: str
    offending_text: str
    suggestion: str

class ComplianceCheckResult(BaseModel):
    """Structured compliance audit result from Gemini."""
    overall_status: str         # "APPROVED" | "NEEDS_REVISION" | "FLAGGED"
    issues: List[ComplianceFlaggedIssue]
    compliance_summary: str     # 1-2 sentence executive summary
    safe_to_send: bool

# ─── Module 8: Sales Action Recommendation ────────────────────────────────────

class NextActionResult(BaseModel):
    """Structured next-action recommendation."""
    action: str                 # "Contact Now" | "Nurture" | "Escalate to Rep" | "Rework Message" | "Deprioritize"
    reason: str                 # 1-2 sentences explaining why
    suggested_owner: str        # e.g. "AE", "SDR", "Marketing"
    suggested_timing: str       # e.g. "Reach out within 48 hours"
    priority_label: str         # "High" | "Medium" | "Low"

# ─── Module 9: Analytics ──────────────────────────────────────────────────────

class AnalyticsSummary(BaseModel):
    """Aggregate analytics for the dashboard."""
    total_prospects: int
    prospects_scored: int
    prospects_with_personas: int
    prospects_with_outreach: int
    approved_count: int
    high_priority_count: int    # priority_score >= 70
    avg_priority_score: float
    top_prospects: list         # Top 3 by priority_score

# ─── Module 7: Sequence Builder ───────────────────────────────────────────────

class SequenceStep(BaseModel):
    """A single touchpoint in an outreach sequence."""
    day: int                    # e.g. 1, 3, 7
    channel: str                # "Email" | "LinkedIn"
    subject: Optional[str] = None
    body: str

class SequencePlan(BaseModel):
    """The full multi-day sequence for a specific persona."""
    persona_name: str
    steps: List[SequenceStep]

class FullSequenceOutput(BaseModel):
    """The complete sequence plan for all personas."""
    sequence_payload: List[SequencePlan]
