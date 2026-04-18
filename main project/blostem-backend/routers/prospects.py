import csv
import io
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from typing import List

from database import get_db
import models, schemas

router = APIRouter(
    prefix="/prospects",
    tags=["prospects"],
)

@router.post("/", response_model=schemas.ProspectResponse)
def create_prospect(prospect: schemas.ProspectCreate, db: Session = Depends(get_db)):
    db_prospect = models.Prospect(**prospect.model_dump())
    db.add(db_prospect)
    db.commit()
    db.refresh(db_prospect)
    return db_prospect

@router.get("/", response_model=List[schemas.ProspectResponse])
def get_prospects(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    prospects = db.query(models.Prospect).offset(skip).limit(limit).all()
    return prospects

@router.post("/upload/")
async def upload_csv(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="Only CSV files are allowed")
    
    content = await file.read()
    try:
        decoded_content = content.decode('utf-8')
    except UnicodeDecodeError:
        raise HTTPException(status_code=400, detail="Invalid file encoding. Must be UTF-8")
        
    csv_reader = csv.DictReader(io.StringIO(decoded_content))
    
    # Expected standard columns: company_name, website, industry, size
    # We will grab any matching fields
    added_count = 0
    for row in csv_reader:
        company_name = row.get("company_name", "").strip()
        if not company_name:
            # We skip rows without a company name mapping
            continue
            
        prospect_data = {
            "company_name": company_name,
            "website": row.get("website", "").strip() or None,
            "industry": row.get("industry", "").strip() or None,
            "size": row.get("size", "").strip() or None
        }
        
        db_prospect = models.Prospect(**prospect_data)
        db.add(db_prospect)
        added_count += 1
        
    db.commit()
    
    return {"message": f"Successfully processed {added_count} prospects"}

@router.post("/{prospect_id}/generate-signals", response_model=schemas.ProspectResponse)
def generate_signals(prospect_id: int, setup: schemas.SignalGenerationRequest, db: Session = Depends(get_db)):
    from services.ai_service import generate_prospect_signals
    
    prospect = db.query(models.Prospect).filter(models.Prospect.id == prospect_id).first()
    if not prospect:
        raise HTTPException(status_code=404, detail="Prospect not found")
        
    try:
        # Call Gemini AI
        signals_output = generate_prospect_signals(
            company_name=prospect.company_name,
            industry=prospect.industry,
            size=prospect.size,
            manual_context=setup.manual_context
        )
        
        import json
        # Store structured JSON into the signals column
        prospect.signals = json.dumps({
            "signal_summary": signals_output.signal_summary,
            "reason_tags": signals_output.reason_tags,
            "raw_notes": signals_output.raw_notes
        })
        
        # We can also update the intent_score heuristically based on tags later, for now we just save signals
        
        db.commit()
        db.refresh(prospect)
        return prospect
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/{prospect_id}/score", response_model=schemas.ProspectResponse)
def score_prospect(prospect_id: int, db: Session = Depends(get_db)):
    from services.ai_service import generate_lead_score
    
    prospect = db.query(models.Prospect).filter(models.Prospect.id == prospect_id).first()
    if not prospect:
        raise HTTPException(status_code=404, detail="Prospect not found")
        
    if not prospect.signals:
        raise HTTPException(status_code=400, detail="Prospect has no signals to score. Generate signals first.")
        
    try:
        score_data = generate_lead_score(
            signals_json=prospect.signals,
            company_name=prospect.company_name
        )
        
        # Update prospect row
        prospect.fit_score = score_data["fit_score"]
        prospect.intent_score = score_data["intent_score"]
        prospect.priority_score = score_data["priority_score"]
        prospect.confidence_score = score_data["confidence_score"]
        prospect.score_explanation = score_data["score_explanation"]
        # we aren't saving short_justification separately in db, we can append it or ignore, 
        # but the schema expects score_explanation, actually maybe we can just put both in explanation or 
        # add a short justification field?
        # Let's combine them into the score_explanation field.
        combined_explanation = f"{score_data['short_justification']} \n\nDetails: {score_data['score_explanation']}"
        prospect.score_explanation = combined_explanation
        
        db.commit()
        db.refresh(prospect)
        return prospect
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/{prospect_id}/map-personas", response_model=schemas.ProspectResponse)
def map_personas(prospect_id: int, db: Session = Depends(get_db)):
    from services.ai_service import generate_persona_mapping
    import json
    
    prospect = db.query(models.Prospect).filter(models.Prospect.id == prospect_id).first()
    if not prospect:
        raise HTTPException(status_code=404, detail="Prospect not found")
        
    if not prospect.signals:
        raise HTTPException(status_code=400, detail="Prospect has no signals. Generate signals first.")
        
    try:
        persona_data = generate_persona_mapping(
            company_name=prospect.company_name,
            industry=prospect.industry,
            signals_json=prospect.signals
        )
        
        # persona_data is a dict with a "personas" key since it corresponds to PersonaMapOutput schema
        prospect.persona_map = json.dumps(persona_data)
        
        db.commit()
        db.refresh(prospect)
        return prospect
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

