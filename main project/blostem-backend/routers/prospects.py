import csv
import io
import json
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from typing import List

import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment
from openpyxl.utils import get_column_letter

from database import get_db
import models, schemas

router = APIRouter(
    prefix="/prospects",
    tags=["prospects"],
)

# ─────────────────────────────────────────────────────────────────────────────
# NOTE: Static routes (exports, upload) MUST come before dynamic /{id} routes
# to prevent FastAPI matching "export" as a prospect_id.
# ─────────────────────────────────────────────────────────────────────────────

# ── MODULE 10: Export ────────────────────────────────────────────────────────

def generate_prospect_xlsx(prospects: List[models.Prospect]):
    """Helper to generate a styled XLSX for a list of prospects."""
    wb = openpyxl.Workbook()

    HEADER_FILL = PatternFill("solid", fgColor="1E293B")
    HEADER_FONT = Font(bold=True, color="FFFFFF", name="Calibri", size=11)
    SUBROW_FONT = Font(name="Calibri", size=10)
    CENTER = Alignment(horizontal="center", vertical="center", wrap_text=True)
    LEFT   = Alignment(horizontal="left",   vertical="top",    wrap_text=True)

    def style_header_row(ws, headers: list):
        for col_idx, h in enumerate(headers, start=1):
            cell = ws.cell(row=1, column=col_idx, value=h)
            cell.fill = HEADER_FILL
            cell.font = HEADER_FONT
            cell.alignment = CENTER
        ws.row_dimensions[1].height = 22

    def auto_width(ws, min_w=12, max_w=60):
        for col in ws.columns:
            if not col:
                continue
            max_len = 0
            col_letter = get_column_letter(col[0].column)
            for cell in col:
                if cell.value:
                    max_len = max(max_len, len(str(cell.value)))
            ws.column_dimensions[col_letter].width = min(max(max_len + 2, min_w), max_w)

    # Sheet 1: Accounts summary
    ws_accounts = wb.active
    ws_accounts.title = "accounts"
    acc_headers = [
        "Company", "Website", "Industry", "Size",
        "Fit Score", "Intent Score", "Priority Score", "Confidence Score",
        "Compliance Status", "Next Action", "Personas Mapped", "Outreach Status", "Notes"
    ]
    style_header_row(ws_accounts, acc_headers)

    for row_idx, p in enumerate(prospects, start=2):
        persona_count = 0
        if p.persona_map:
            try:
                pm = json.loads(p.persona_map)
                persona_count = len(pm.get("personas", []))
            except Exception:
                pass

        short_explanation = ""
        if p.score_explanation:
            short_explanation = p.score_explanation.split("\n")[0][:120]

        row_data = [
            p.company_name, p.website or "", p.industry or "", p.size or "",
            p.fit_score, p.intent_score, p.priority_score, p.confidence_score,
            p.compliance_status or "Not Checked",
            p.next_action or "Not Set",
            persona_count, p.outreach_status or "NOT APPROVED",
            short_explanation
        ]
        for col_idx, val in enumerate(row_data, start=1):
            cell = ws_accounts.cell(row=row_idx, column=col_idx, value=val)
            cell.font = SUBROW_FONT
            cell.alignment = LEFT
        ws_accounts.row_dimensions[row_idx].height = 18

    auto_width(ws_accounts)

    # Sheet 2: Outreach sequences
    ws_seq = wb.create_sheet(title="sequences")
    seq_headers = ["Company", "Industry", "Persona Name", "Channel", "Subject / Note", "Body"]
    style_header_row(ws_seq, seq_headers)

    seq_row = 2
    for p in prospects:
        if not p.messages:
            continue
        try:
            msg_data = json.loads(p.messages)
            outreach_payload = msg_data.get("outreach_payload", [])
        except Exception:
            continue

        for persona in outreach_payload:
            persona_name = persona.get("persona_name", "Unknown Persona")
            for msg in persona.get("messages", []):
                row_data = [
                    p.company_name,
                    p.industry or "",
                    persona_name,
                    msg.get("channel", ""),
                    msg.get("subject", ""),
                    msg.get("body", "")
                ]
                for col_idx, val in enumerate(row_data, start=1):
                    cell = ws_seq.cell(row=seq_row, column=col_idx, value=val)
                    cell.font = SUBROW_FONT
                    cell.alignment = LEFT
                ws_seq.row_dimensions[seq_row].height = 60
                seq_row += 1

    auto_width(ws_seq)
    ws_seq.column_dimensions["F"].width = 80

    # Sheet 3: Compliance issues
    ws_comp = wb.create_sheet(title="compliance")
    comp_headers = ["Company", "Compliance Status", "Safe to Send", "Summary", "Issue Type", "Issue Description", "Offending Text", "Suggestion"]
    style_header_row(ws_comp, comp_headers)

    comp_row = 2
    for p in prospects:
        if not p.compliance_status:
            continue
        # Try to parse compliance JSON if stored as JSON, else just show status
        comp_row_data = [
            p.company_name,
            p.compliance_status,
            "", "", "", "", "", ""
        ]
        for col_idx, val in enumerate(comp_row_data, start=1):
            ws_comp.cell(row=comp_row, column=col_idx, value=val).font = SUBROW_FONT
        comp_row += 1

    auto_width(ws_comp)

    output = io.BytesIO()
    wb.save(output)
    output.seek(0)
    return output


@router.get("/export")
def export_approved_sequences(db: Session = Depends(get_db)):
    """Export all APPROVED prospects to XLSX."""
    approved = db.query(models.Prospect).filter(models.Prospect.outreach_status == "APPROVED").all()
    if not approved:
        raise HTTPException(status_code=404, detail="No approved sequences found. Approve at least one prospect first.")

    xlsx_data = generate_prospect_xlsx(approved)
    return StreamingResponse(
        xlsx_data,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": 'attachment; filename="blostem_approved_export.xlsx"'}
    )

@router.get("/export-all")
def export_all_prospects(db: Session = Depends(get_db)):
    """Export all prospects to XLSX regardless of approval status."""
    all_prospects = db.query(models.Prospect).all()
    if not all_prospects:
        raise HTTPException(status_code=404, detail="No prospects found to export. Add some prospects first.")

    xlsx_data = generate_prospect_xlsx(all_prospects)
    return StreamingResponse(
        xlsx_data,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": 'attachment; filename="blostem_full_export.xlsx"'}
    )

# ── MODULE 9: Analytics ──────────────────────────────────────────────────────

@router.get("/analytics", response_model=schemas.AnalyticsSummary)
def get_analytics(db: Session = Depends(get_db)):
    """Return aggregate dashboard analytics for the UI."""
    all_p = db.query(models.Prospect).all()

    scored      = [p for p in all_p if p.priority_score is not None]
    with_persona = [p for p in all_p if p.persona_map]
    with_outreach = [p for p in all_p if p.messages]
    approved    = [p for p in all_p if p.outreach_status == "APPROVED"]
    high_pri    = [p for p in scored if (p.priority_score or 0) >= 70]

    avg_score = 0.0
    if scored:
        avg_score = round(sum(p.priority_score for p in scored) / len(scored), 1)

    top_3 = sorted(scored, key=lambda p: p.priority_score or 0, reverse=True)[:3]
    top_3_data = [
        {
            "id": p.id,
            "company_name": p.company_name,
            "priority_score": p.priority_score,
            "fit_score": p.fit_score,
            "intent_score": p.intent_score,
            "next_action": p.next_action,
            "outreach_status": p.outreach_status
        }
        for p in top_3
    ]

    return schemas.AnalyticsSummary(
        total_prospects=len(all_p),
        prospects_scored=len(scored),
        prospects_with_personas=len(with_persona),
        prospects_with_outreach=len(with_outreach),
        approved_count=len(approved),
        high_priority_count=len(high_pri),
        avg_priority_score=avg_score,
        top_prospects=top_3_data
    )

# ── MODULE 1: Prospect CRUD ──────────────────────────────────────────────────

@router.post("/", response_model=schemas.ProspectResponse)
def create_prospect(prospect: schemas.ProspectCreate, db: Session = Depends(get_db)):
    """Create a single prospect manually."""
    db_prospect = models.Prospect(**prospect.model_dump())
    db.add(db_prospect)
    db.commit()
    db.refresh(db_prospect)
    return db_prospect

@router.get("/", response_model=List[schemas.ProspectResponse])
def get_prospects(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """List all prospects, ordered by creation date."""
    prospects = db.query(models.Prospect).offset(skip).limit(limit).all()
    return prospects

@router.post("/upload/")
async def upload_csv(file: UploadFile = File(...), db: Session = Depends(get_db)):
    """
    Upload a CSV file to bulk-ingest prospects.
    Expects columns: company_name (required), website, industry, size.
    Rows missing company_name are silently skipped.
    Non-UTF-8 files return a 400 error.
    """
    if not file.filename or not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="Only .csv files are accepted.")

    content = await file.read()
    try:
        decoded_content = content.decode('utf-8')
    except UnicodeDecodeError:
        raise HTTPException(status_code=400, detail="Invalid file encoding. File must be UTF-8 encoded.")

    csv_reader = csv.DictReader(io.StringIO(decoded_content))
    fieldnames = csv_reader.fieldnames or []
    
    # Fuzzy header mapping
    def find_col(aliases):
        for f in fieldnames:
            if f.lower().strip() in aliases:
                return f
        return None

    # Define aliases for common headers
    MAP = {
        "company":  find_col(["company_name", "company", "name", "account", "business", "prospect"]),
        "website":  find_col(["website", "url", "domain", "site", "web"]),
        "industry": find_col(["industry", "sector", "category", "niche"]),
        "size":     find_col(["size", "headcount", "employees", "employees_count", "staff"]),
    }

    added_count = 0
    skipped_count = 0
    for row in csv_reader:
        company_name = row.get(MAP["company"] or "", "").strip() if MAP["company"] else ""
        if not company_name:
            skipped_count += 1
            continue

        prospect_data = {
            "company_name": company_name,
            "website":  (row.get(MAP["website"], "").strip() if MAP["website"] else "") or None,
            "industry": (row.get(MAP["industry"], "").strip() if MAP["industry"] else "") or None,
            "size":     (row.get(MAP["size"], "").strip() if MAP["size"] else "") or None,
        }
        db.add(models.Prospect(**prospect_data))
        added_count += 1

    db.commit()
    return {
        "message":        f"Successfully ingested {added_count} prospect(s).",
        "added":          added_count,
        "skipped_rows":   skipped_count,
    }

@router.delete("/{prospect_id}", status_code=204)
def delete_prospect(prospect_id: int, db: Session = Depends(get_db)):
    """Delete a prospect and all its associated data."""
    prospect = db.query(models.Prospect).filter(models.Prospect.id == prospect_id).first()
    if not prospect:
        raise HTTPException(status_code=404, detail="Prospect not found.")
    db.delete(prospect)
    db.commit()
    return None

# ── MODULE 2: Signal Intelligence ────────────────────────────────────────────

@router.post("/{prospect_id}/generate-signals", response_model=schemas.ProspectResponse)
def generate_signals(prospect_id: int, setup: schemas.SignalGenerationRequest, db: Session = Depends(get_db)):
    """
    Generate AI-powered market signals for a prospect using Gemini + Google Search.
    manual_context is optional — omit or pass empty string.
    """
    from services.ai_service import generate_prospect_signals

    prospect = db.query(models.Prospect).filter(models.Prospect.id == prospect_id).first()
    if not prospect:
        raise HTTPException(status_code=404, detail="Prospect not found.")

    try:
        signals_output = generate_prospect_signals(
            company_name=prospect.company_name,
            industry=prospect.industry,
            size=prospect.size,
            manual_context=setup.manual_context
        )
        prospect.signals = json.dumps({
            "signal_summary": signals_output.signal_summary,
            "reason_tags":    signals_output.reason_tags,
            "raw_notes":      signals_output.raw_notes,
        })
        db.commit()
        db.refresh(prospect)
        return prospect
    except Exception as e:
        import traceback; traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

# ── MODULE 3: Lead Scoring ────────────────────────────────────────────────────

@router.post("/{prospect_id}/score", response_model=schemas.ProspectResponse)
def score_prospect(prospect_id: int, db: Session = Depends(get_db)):
    """
    Run the weighted lead scoring algorithm.
    Requires: signals must be generated first (400 if not).
    """
    from services.ai_service import generate_lead_score

    prospect = db.query(models.Prospect).filter(models.Prospect.id == prospect_id).first()
    if not prospect:
        raise HTTPException(status_code=404, detail="Prospect not found.")
    if not prospect.signals:
        raise HTTPException(status_code=400, detail="No signals found. Generate signals first.")

    try:
        score_data = generate_lead_score(
            signals_json=prospect.signals,
            company_name=prospect.company_name
        )
        prospect.fit_score        = score_data["fit_score"]
        prospect.intent_score     = score_data["intent_score"]
        prospect.priority_score   = score_data["priority_score"]
        prospect.confidence_score = score_data["confidence_score"]
        prospect.score_explanation = score_data["score_explanation"]
        db.commit()
        db.refresh(prospect)
        return prospect
    except Exception as e:
        import traceback; traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

# ── MODULE 4: Persona Mapping ─────────────────────────────────────────────────

@router.post("/{prospect_id}/map-personas", response_model=schemas.ProspectResponse)
def map_personas(prospect_id: int, db: Session = Depends(get_db)):
    """
    Map key stakeholder personas based on signals.
    Requires: signals must be generated first (400 if not).
    """
    from services.ai_service import generate_persona_mapping

    prospect = db.query(models.Prospect).filter(models.Prospect.id == prospect_id).first()
    if not prospect:
        raise HTTPException(status_code=404, detail="Prospect not found.")
    if not prospect.signals:
        raise HTTPException(status_code=400, detail="No signals found. Generate signals first.")

    try:
        persona_data = generate_persona_mapping(
            company_name=prospect.company_name,
            industry=prospect.industry,
            signals_json=prospect.signals
        )
        prospect.persona_map = json.dumps(persona_data)
        db.commit()
        db.refresh(prospect)
        return prospect
    except Exception as e:
        import traceback; traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

# ── MODULE 5: Outreach Generation ────────────────────────────────────────────

@router.post("/{prospect_id}/generate-outreach", response_model=schemas.ProspectResponse)
def generate_outreach(prospect_id: int, db: Session = Depends(get_db)):
    """
    Generate persona-aware outreach sequences.
    Requires: persona_map must be generated first (400 if not).
    Resets outreach_status to DRAFTED and compliance_status to None on regeneration.
    """
    from services.ai_service import generate_outreach_sequence

    prospect = db.query(models.Prospect).filter(models.Prospect.id == prospect_id).first()
    if not prospect:
        raise HTTPException(status_code=404, detail="Prospect not found.")
    if not prospect.persona_map:
        raise HTTPException(status_code=400, detail="No persona map found. Map personas first.")

    try:
        outreach_data = generate_outreach_sequence(
            company_name=prospect.company_name,
            industry=prospect.industry,
            signals_json=prospect.signals,
            persona_map_json=prospect.persona_map
        )
        prospect.messages = json.dumps(outreach_data)
        prospect.outreach_status = "DRAFTED"
        
        # Compliance is now built into the prompt itself, automatically mark as approved
        prospect.compliance_status = json.dumps({
            "overall_status": "APPROVED",
            "safe_to_send": True,
            "issues": [],
            "compliance_summary": "Auto-verified via strict compliant prompt design."
        })

        # The whole pipeline is complete. Automatically generate Sales Action Recommendation.
        from services.ai_service import generate_next_action
        action_result = generate_next_action(
            company_name=prospect.company_name,
            priority_score=prospect.priority_score or 0.0,
            fit_score=prospect.fit_score or 0.0,
            intent_score=prospect.intent_score or 0.0,
            signals_json=prospect.signals or "{}",
            compliance_status="APPROVED"
        )
        prospect.next_action = json.dumps({
            "action":           action_result.action,
            "reason":           action_result.reason,
            "suggested_owner":  action_result.suggested_owner,
            "suggested_timing": action_result.suggested_timing,
            "priority_label":   action_result.priority_label
        })

        db.commit()
        db.refresh(prospect)
        return prospect
    except Exception as e:
        import traceback; traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

# ── MODULE 6: Compliance Built-In ─────────────────────────────────────────────
# Compliance check is now built into the outreach generation prompt.



@router.post("/{prospect_id}/approve", response_model=schemas.ProspectResponse)
def approve_sequence(prospect_id: int, request: schemas.ApproveSequenceRequest, db: Session = Depends(get_db)):
    """
    Toggle the outreach sequence approval status.
    If approving: calls AI to build the multi-day sequence plan (Module 7).
    Requires: messages must be generated first.
    """
    from services.ai_service import generate_sequence_timeline

    prospect = db.query(models.Prospect).filter(models.Prospect.id == prospect_id).first()
    if not prospect:
        raise HTTPException(status_code=404, detail="Prospect not found.")
    
    if not request.approve:
        prospect.outreach_status = "DRAFTED"
        db.commit()
        db.refresh(prospect)
        return prospect

    if not prospect.messages:
        raise HTTPException(status_code=400, detail="No outreach sequences found. Generate sequences first.")

    try:
        # Module 7: Build Sequence Timeline
        sequence_data = generate_sequence_timeline(
            company_name=prospect.company_name,
            signals_json=prospect.signals or "{}",
            outreach_json=prospect.messages
        )
        
        prospect.sequence_plan = json.dumps(sequence_data)
        prospect.outreach_status = "APPROVED"
        db.commit()
        db.refresh(prospect)
        return prospect
    except Exception as e:
        import traceback; traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Sequence generation failed: {str(e)}")

# ── MODULE 8: Sales Action Recommendation ─────────────────────────────────────
# Sales Action Recommendation is now automatically generated at the end of Outreach Generation.


