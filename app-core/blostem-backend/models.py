from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, JSON, ForeignKey, Float
from sqlalchemy.orm import relationship
from database import Base

class Prospect(Base):
    __tablename__ = "prospects"

    id = Column(Integer, primary_key=True, index=True)
    # Added owner_id for multi-tenancy with Supabase
    owner_id = Column(String, index=True, nullable=False)
    
    first_name = Column(String, nullable=True)
    last_name = Column(String, nullable=True)
    email = Column(String, unique=True, index=True, nullable=True)
    company_name = Column(String, nullable=False) # Changed from company
    website = Column(String, nullable=True)
    title = Column(String, nullable=True)
    linkedin_url = Column(String, nullable=True)
    location = Column(String, nullable=True)
    industry = Column(String, nullable=True)
    size = Column(String, nullable=True)
    
    # AI Enrichment & Scoring
    signals = Column(String, nullable=True)
    fit_score = Column(Float, default=0.0)
    intent_score = Column(Float, default=0.0)
    priority_score = Column(Float, default=0.0)
    confidence_score = Column(Float, default=0.0)
    score_explanation = Column(String, nullable=True)
    
    # Generation Modules
    persona_map = Column(String, nullable=True) # JSON stored as string
    messages = Column(String, nullable=True)    # JSON stored as string
    sequence_plan = Column(String, nullable=True) # JSON stored as string
    compliance_status = Column(String, nullable=True)
    next_action = Column(String, nullable=True)
    outreach_status = Column(String, default="PENDING")

    # Enrichment Status (Legacy/Sync)
    is_enriched = Column(Boolean, default=False)
    enrichment_status = Column(String, default="pending") 
    last_enriched_at = Column(DateTime, nullable=True)
    
    # Lead Score (Legacy compatibility)
    lead_score = Column(Float, default=0.0)
    score_justification = Column(String, nullable=True)
    
    # Raw & Analyzed Data
    raw_data = Column(JSON, nullable=True)
    analyzed_data = Column(JSON, nullable=True)
    
    # Timeline & Metadata
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    outreach_events = relationship("OutreachEvent", back_populates="prospect", cascade="all, delete-orphan")


class OutreachEvent(Base):
    __tablename__ = "outreach_events"

    id = Column(Integer, primary_key=True, index=True)
    prospect_id = Column(Integer, ForeignKey("prospects.id"))
    
    type = Column(String) # email, linkedin_message, connection_request
    status = Column(String) # pending, scheduled, sent, opened, replied
    content = Column(String)
    
    scheduled_at = Column(DateTime, nullable=True)
    sent_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    prospect = relationship("Prospect", back_populates="outreach_events")
