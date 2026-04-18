import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, Text
from database import Base

class Prospect(Base):
    __tablename__ = "prospects"

    id = Column(Integer, primary_key=True, index=True)
    company_name = Column(String, index=True, nullable=False)
    website = Column(String, nullable=True)
    industry = Column(String, nullable=True)
    size = Column(String, nullable=True)

    # Signals summary
    signals = Column(Text, nullable=True) # Stored as JSON string or plain text
    
    # Lead Scoring
    fit_score = Column(Float, nullable=True)
    intent_score = Column(Float, nullable=True)
    priority_score = Column(Float, nullable=True)
    confidence_score = Column(Float, nullable=True)

    # Generated output (Stored as JSON strings)
    score_explanation = Column(Text, nullable=True)
    persona_map = Column(Text, nullable=True) 
    messages = Column(Text, nullable=True)
    sequence_plan = Column(Text, nullable=True)
    
    # AI recommendations and checks
    compliance_status = Column(String, nullable=True)
    next_action = Column(String, nullable=True)

    # Timestamps
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
