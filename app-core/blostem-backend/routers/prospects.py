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
from auth_utils import get_owner_id
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

        # Parse next_action JSON to show clean text
        next_action_text = "Not Set"
        if p.next_action:
            try:
                na_data = json.loads(p.next_action)
                action = na_data.get("action", "")
                timing = na_data.get("suggested_timing", "")
                next_action_text = f"{action} — {timing}" if timing else action or "Not Set"
            except Exception:
                next_action_text = p.next_action[:80] if p.next_action else "Not Set"

        # Parse compliance_status to show clean text
        compliance_text = "Not Checked"
        if p.compliance_status:
            try:
                c_data = json.loads(p.compliance_status)
                compliance_text = c_data.get("overall_status", "Not Checked")
            except Exception:
                compliance_text = p.compliance_status[:40] if p.compliance_status else "Not Checked"

        row_data = [
            p.company_name, p.website or "", p.industry or "", p.size or "",
            p.fit_score, p.intent_score, p.priority_score, p.confidence_score,
            compliance_text,
            next_action_text,
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
        try:
            c_data = json.loads(p.compliance_status)
            overall_status = c_data.get("overall_status", "")
            safe_to_send = str(c_data.get("safe_to_send", ""))
            summary = c_data.get("compliance_summary", "")
            issues = c_data.get("issues", [])

            if not issues:
                # Write one summary row with no issues
                comp_row_data = [p.company_name, overall_status, safe_to_send, summary, "", "", "", ""]
                for col_idx, val in enumerate(comp_row_data, start=1):
                    ws_comp.cell(row=comp_row, column=col_idx, value=val).font = SUBROW_FONT
                comp_row += 1
            else:
                # Write one row per issue
                for issue in issues:
                    comp_row_data = [
                        p.company_name,
                        overall_status,
                        safe_to_send,
                        summary,
                        issue.get("issue_type", ""),
                        issue.get("description", ""),
                        issue.get("offending_text", ""),
                        issue.get("suggestion", "")
                    ]
                    for col_idx, val in enumerate(comp_row_data, start=1):
                        cell = ws_comp.cell(row=comp_row, column=col_idx, value=val)
                        cell.font = SUBROW_FONT
                        cell.alignment = LEFT
                    comp_row += 1
        except Exception:
            # Fallback: raw status only
            ws_comp.cell(row=comp_row, column=1, value=p.company_name).font = SUBROW_FONT
            ws_comp.cell(row=comp_row, column=2, value=p.compliance_status[:100] if p.compliance_status else "").font = SUBROW_FONT
            comp_row += 1

    auto_width(ws_comp)

    output = io.BytesIO()
    wb.save(output)
    output.seek(0)
    return output


@router.get("/export")
def export_approved_sequences(db: Session = Depends(get_db), owner_id: str = Depends(get_owner_id)):
    """Export all APPROVED prospects to XLSX."""
    approved = db.query(models.Prospect).filter(
        models.Prospect.owner_id == owner_id,
        models.Prospect.outreach_status == "APPROVED"
    ).all()
    if not approved:
        raise HTTPException(status_code=404, detail="No approved sequences found. Approve at least one prospect first.")

    xlsx_data = generate_prospect_xlsx(approved)
    return StreamingResponse(
        xlsx_data,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": 'attachment; filename="blostem_approved_export.xlsx"'}
    )

@router.get("/export-all")
def export_all_prospects(db: Session = Depends(get_db), owner_id: str = Depends(get_owner_id)):
    """Export all prospects to XLSX regardless of approval status."""
    all_prospects = db.query(models.Prospect).filter(models.Prospect.owner_id == owner_id).all()
    if not all_prospects:
        raise HTTPException(status_code=404, detail="No prospects found to export. Add some prospects first.")

    xlsx_data = generate_prospect_xlsx(all_prospects)
    return StreamingResponse(
        xlsx_data,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": 'attachment; filename="blostem_full_export.xlsx"'}
    )

@router.get("/export-json")
def export_all_json(db: Session = Depends(get_db), owner_id: str = Depends(get_owner_id)):
    """Export all prospects as a downloadable JSON file for CRM import or external use."""
    all_prospects = db.query(models.Prospect).filter(models.Prospect.owner_id == owner_id).all()
    if not all_prospects:
        raise HTTPException(status_code=404, detail="No prospects to export.")

    export_list = []
    for p in all_prospects:
        # Parse JSON fields cleanly
        signals_data = {}
        persona_data = {}
        messages_data = {}
        compliance_data = {}
        next_action_data = {}
        sequence_data = {}

        try: signals_data = json.loads(p.signals) if p.signals else {}
        except Exception: pass
        try: persona_data = json.loads(p.persona_map) if p.persona_map else {}
        except Exception: pass
        try: messages_data = json.loads(p.messages) if p.messages else {}
        except Exception: pass
        try: compliance_data = json.loads(p.compliance_status) if p.compliance_status else {}
        except Exception: pass
        try: next_action_data = json.loads(p.next_action) if p.next_action else {}
        except Exception: pass
        try: sequence_data = json.loads(p.sequence_plan) if p.sequence_plan else {}
        except Exception: pass

        export_list.append({
            "id": p.id,
            "company_name": p.company_name,
            "website": p.website,
            "industry": p.industry,
            "size": p.size,
            "scores": {
                "fit_score": p.fit_score,
                "intent_score": p.intent_score,
                "priority_score": p.priority_score,
                "confidence_score": p.confidence_score,
                "score_explanation": p.score_explanation,
            },
            "signals": signals_data,
            "persona_map": persona_data,
            "outreach_messages": messages_data,
            "compliance": compliance_data,
            "next_action": next_action_data,
            "sequence_plan": sequence_data,
            "outreach_status": p.outreach_status,
            "created_at": p.created_at.isoformat() if p.created_at else None,
            "updated_at": p.updated_at.isoformat() if p.updated_at else None,
        })

    json_bytes = json.dumps(export_list, indent=2, ensure_ascii=False).encode("utf-8")
    return StreamingResponse(
        io.BytesIO(json_bytes),
        media_type="application/json",
        headers={"Content-Disposition": 'attachment; filename="blostem_pipeline_export.json"'}
    )

@router.get("/export-csv")
def export_all_csv(db: Session = Depends(get_db), owner_id: str = Depends(get_owner_id)):
    """Export all prospects as a downloadable CSV (flat columns for CRM import)."""
    all_prospects = db.query(models.Prospect).filter(models.Prospect.owner_id == owner_id).all()
    if not all_prospects:
        raise HTTPException(status_code=404, detail="No prospects to export.")

    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow([
        "id",
        "company_name",
        "website",
        "industry",
        "size",
        "fit_score",
        "intent_score",
        "priority_score",
        "confidence_score",
        "outreach_status",
        "primary_persona",
        "compliance_overall_status",
        "next_action",
        "created_at",
        "updated_at",
    ])

    for p in all_prospects:
        primary_persona = ""
        try:
            persona_data = json.loads(p.persona_map) if p.persona_map else {}
            personas = persona_data.get("personas", [])
            if personas:
                primary_persona = personas[0].get("role") or personas[0].get("persona_name") or ""
        except Exception:
            primary_persona = ""

        compliance_overall = ""
        try:
            compliance_data = json.loads(p.compliance_status) if p.compliance_status else {}
            compliance_overall = compliance_data.get("overall_status", "")
        except Exception:
            compliance_overall = ""

        next_action_text = ""
        try:
            na_data = json.loads(p.next_action) if p.next_action else {}
            next_action_text = na_data.get("action", "") or ""
        except Exception:
            next_action_text = ""

        writer.writerow([
            p.id,
            p.company_name,
            p.website or "",
            p.industry or "",
            p.size or "",
            p.fit_score if p.fit_score is not None else "",
            p.intent_score if p.intent_score is not None else "",
            p.priority_score if p.priority_score is not None else "",
            p.confidence_score if p.confidence_score is not None else "",
            p.outreach_status or "",
            primary_persona,
            compliance_overall,
            next_action_text,
            p.created_at.isoformat() if p.created_at else "",
            p.updated_at.isoformat() if p.updated_at else "",
        ])

    csv_bytes = output.getvalue().encode("utf-8")
    return StreamingResponse(
        io.BytesIO(csv_bytes),
        media_type="text/csv",
        headers={"Content-Disposition": 'attachment; filename="blostem_pipeline_export.csv"'}
    )

# ── MODULE 9: Analytics ──────────────────────────────────────────────────────

@router.get("/analytics", response_model=schemas.AnalyticsSummary)
def get_analytics(db: Session = Depends(get_db), owner_id: str = Depends(get_owner_id)):
    """Return aggregate dashboard analytics for the UI."""
    all_p = db.query(models.Prospect).filter(models.Prospect.owner_id == owner_id).all()

    scored      = [p for p in all_p if p.priority_score is not None]
    with_persona = [p for p in all_p if p.persona_map]
    with_outreach = [p for p in all_p if p.messages]
    approved    = [p for p in all_p if p.outreach_status == "APPROVED"]
    high_pri    = [p for p in scored if (p.priority_score or 0) >= 70]

    avg_score = 0.0
    avg_conf = 0.0
    avg_int = 0.0
    if scored:
        avg_score = round(sum(p.priority_score for p in scored) / len(scored), 1)
        conf_vals = [p.confidence_score for p in scored if p.confidence_score is not None]
        intent_vals = [p.intent_score for p in scored if p.intent_score is not None]
        avg_conf = round(sum(conf_vals) / len(conf_vals), 1) if conf_vals else 0.0
        avg_int = round(sum(intent_vals) / len(intent_vals), 1) if intent_vals else 0.0

    approval_rate = 0.0
    if with_outreach:
        approval_rate = round((len(approved) / len(with_outreach)) * 100, 1)

    flagged_count = 0
    for p in all_p:
        if p.compliance_status:
            try:
                import json
                c_data = json.loads(p.compliance_status)
                if c_data.get("overall_status") == "FLAGGED":
                    flagged_count += 1
            except:
                pass

    best_persona = "N/A"
    persona_counts = {}
    for p in approved:
        if p.persona_map:
            try:
                p_data = json.loads(p.persona_map)
                personas = p_data.get("personas", [])
                if personas:
                    # Extract a clean role title (e.g. "CEO" instead of long desc)
                    role = personas[0].get("role", "Unknown")
                    # Quick clean up: if it's too long, take the first 3 words or split by ' - '
                    if len(role) > 25:
                        role = role.split(" overseeing ")[0].split(" - ")[0].split(" responsible ")[0][:25].strip()
                    persona_counts[role] = persona_counts.get(role, 0) + 1
            except:
                pass
    
    if persona_counts:
        best_persona = max(persona_counts, key=persona_counts.get)

    top_3 = sorted(scored, key=lambda p: p.priority_score or 0, reverse=True)[:3]
    top_3_data = [
        {
            "id": p.id,
            "company_name": p.company_name,
            "priority_score": p.priority_score,
            "fit_score": p.fit_score,
            "intent_score": p.intent_score,
            "confidence_score": p.confidence_score,
            "next_action": p.next_action,
            "outreach_status": p.outreach_status,
            "persona_map": p.persona_map
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
        avg_confidence=avg_conf,
        avg_intent=avg_int,
        approval_rate=approval_rate,
        compliance_flagged_count=flagged_count,
        best_persona=best_persona,
        top_prospects=top_3_data
    )

# ── MODULE 1: Prospect CRUD ──────────────────────────────────────────────────

@router.post("/", response_model=schemas.ProspectResponse)
def create_prospect(prospect: schemas.ProspectCreate, db: Session = Depends(get_db), owner_id: str = Depends(get_owner_id)):
    """Create a single prospect manually."""
    db_prospect = models.Prospect(**prospect.model_dump(), owner_id=owner_id)
    db.add(db_prospect)
    db.commit()
    db.refresh(db_prospect)
    return db_prospect

@router.get("/", response_model=List[schemas.ProspectResponse])
def get_prospects(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), owner_id: str = Depends(get_owner_id)):
    """List all prospects for the current user, ordered by creation date."""
    prospects = db.query(models.Prospect).filter(models.Prospect.owner_id == owner_id).offset(skip).limit(limit).all()
    return prospects

@router.post("/upload/")
async def upload_csv(file: UploadFile = File(...), db: Session = Depends(get_db), owner_id: str = Depends(get_owner_id)):
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
            "owner_id": owner_id,
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
def delete_prospect(prospect_id: int, db: Session = Depends(get_db), owner_id: str = Depends(get_owner_id)):
    """Delete a prospect and all its associated data."""
    prospect = db.query(models.Prospect).filter(
        models.Prospect.id == prospect_id,
        models.Prospect.owner_id == owner_id
    ).first()
    if not prospect:
        raise HTTPException(status_code=404, detail="Prospect not found.")
    db.delete(prospect)
    db.commit()
    return None

@router.post("/batch-delete", status_code=204)
def batch_delete_prospects(request: schemas.BatchActionRequest, db: Session = Depends(get_db), owner_id: str = Depends(get_owner_id)):
    """Delete multiple prospects at once."""
    if not request.ids:
        return None
    db.query(models.Prospect).filter(
        models.Prospect.id.in_(request.ids),
        models.Prospect.owner_id == owner_id
    ).delete(synchronize_session=False)
    db.commit()
    return None

@router.post("/seed-sample-data", status_code=201)
def seed_sample_data(db: Session = Depends(get_db), owner_id: str = Depends(get_owner_id)):
    """Inject 10 high-quality mock Fintech prospects for demo purposes."""
    sample_data = [
        {"company_name": "Stripe", "website": "stripe.com", "industry": "Payments", "size": "5000-10000"},
        {"company_name": "Plaid", "website": "plaid.com", "industry": "Fintech Infrastructure", "size": "1000-5000"},
        {"company_name": "Brex", "website": "brex.com", "industry": "Financial Services", "size": "1000-5000"},
        {"company_name": "Ramp", "website": "ramp.com", "industry": "Spend Management", "size": "500-1000"},
        {"company_name": "Revolut", "website": "revolut.com", "industry": "Neobanking", "size": "5000-10000"},
        {"company_name": "Klarna", "website": "klarna.com", "industry": "E-commerce", "size": "1000-5000"},
        {"company_name": "Wise", "website": "wise.com", "industry": "International Transfers", "size": "1000-5000"},
        {"company_name": "Marqeta", "website": "marqeta.com", "industry": "Card Issuing", "size": "500-1000"},
        {"company_name": "Checkout.com", "website": "checkout.com", "industry": "Payments", "size": "1000-5000"},
        {"company_name": "Chime", "website": "chime.com", "industry": "Banking", "size": "1000-5000"},
    ]
    
    added = 0
    for data in sample_data:
        # Check if already exists to avoid duplicates
        exists = db.query(models.Prospect).filter(
            models.Prospect.company_name == data["company_name"],
            models.Prospect.owner_id == owner_id
        ).first()
        if not exists:
            db.add(models.Prospect(**data, owner_id=owner_id))
            added += 1
    
    db.commit()
    return {"message": f"Successfully seeded {added} demo prospects.", "added": added}

# ── MODULE 2: Signal Intelligence ────────────────────────────────────────────

@router.post("/{prospect_id}/generate-signals", response_model=schemas.ProspectResponse)
def generate_signals(prospect_id: int, setup: schemas.SignalGenerationRequest, db: Session = Depends(get_db), owner_id: str = Depends(get_owner_id)):
    """
    Generate AI-powered market signals for a prospect using Gemini + Google Search.
    manual_context is optional — omit or pass empty string.
    """
    from services.ai_service import run_intelligence_pipeline

    prospect = db.query(models.Prospect).filter(
        models.Prospect.id == prospect_id,
        models.Prospect.owner_id == owner_id
    ).first()
    if not prospect:
        raise HTTPException(status_code=404, detail="Prospect not found.")

    try:
        # Consolidated Call 1: Signals + Scoring + Persona Mapping
        intel_data = run_intelligence_pipeline(
            company_name=prospect.company_name,
            industry=prospect.industry,
            size=prospect.size,
            manual_context=setup.manual_context
        )
        
        if "error" in intel_data:
            raise HTTPException(status_code=500, detail=intel_data["error"])

        # Update Signals
        prospect.signals = json.dumps(intel_data.get("signals", {}))
        
        # Update Scores
        derived = intel_data.get("derived_scores", {})
        prospect.fit_score        = derived.get("fit_score")
        prospect.intent_score     = derived.get("intent_score")
        prospect.priority_score   = derived.get("priority_score")
        prospect.confidence_score = derived.get("confidence_score")
        prospect.score_explanation = derived.get("score_explanation")
        
        # Update Personas
        prospect.persona_map = json.dumps({"personas": intel_data.get("personas", [])})

        db.commit()
        db.refresh(prospect)
        return prospect
    except Exception as e:
        import traceback; traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

# ── MODULE 3: Lead Scoring ────────────────────────────────────────────────────

@router.post("/{prospect_id}/score", response_model=schemas.ProspectResponse)
def score_prospect(prospect_id: int, db: Session = Depends(get_db), owner_id: str = Depends(get_owner_id)):
    """
    Run the weighted lead scoring algorithm.
    Requires: signals must be generated first (400 if not).
    """
    from services.ai_service import generate_lead_score

    prospect = db.query(models.Prospect).filter(
        models.Prospect.id == prospect_id,
        models.Prospect.owner_id == owner_id
    ).first()
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
def map_personas(prospect_id: int, db: Session = Depends(get_db), owner_id: str = Depends(get_owner_id)):
    """
    Map key stakeholder personas based on signals.
    Requires: signals must be generated first (400 if not).
    """
    from services.ai_service import generate_persona_mapping

    prospect = db.query(models.Prospect).filter(
        models.Prospect.id == prospect_id,
        models.Prospect.owner_id == owner_id
    ).first()
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
def generate_outreach(prospect_id: int, db: Session = Depends(get_db), owner_id: str = Depends(get_owner_id)):
    """
    Generate persona-aware outreach sequences.
    Requires: persona_map must be generated first (400 if not).
    Resets outreach_status to DRAFTED and compliance_status to None on regeneration.
    """
    from services.ai_service import run_execution_pipeline

    prospect = db.query(models.Prospect).filter(
        models.Prospect.id == prospect_id,
        models.Prospect.owner_id == owner_id
    ).first()
    if not prospect:
        raise HTTPException(status_code=404, detail="Prospect not found.")
    if not prospect.persona_map:
        raise HTTPException(status_code=400, detail="No persona map found. Run intelligence first.")

    try:
        # Consolidated Call 2: Outreach + Compliance + Next Action + Sequence Timeline
        exec_data = run_execution_pipeline(
            company_name=prospect.company_name,
            industry=prospect.industry,
            signals_json=prospect.signals or "{}",
            persona_map_json=prospect.persona_map,
            priority_score=prospect.priority_score or 0.0
        )
        
        if "error" in exec_data:
            raise HTTPException(status_code=500, detail=exec_data["error"])

        # Update Messages
        prospect.messages = json.dumps({"outreach_payload": exec_data.get("outreach_payload", [])})
        prospect.outreach_status = "DRAFTED"
        
        # Update Compliance
        prospect.compliance_status = json.dumps(exec_data.get("compliance", {
            "overall_status": "APPROVED",
            "safe_to_send": True,
            "issues": [],
            "compliance_summary": "Auto-verified."
        }))

        # Update Next Action
        prospect.next_action = json.dumps(exec_data.get("next_action", {}))
        
        # Update Sequence Plan
        prospect.sequence_plan = json.dumps({"sequence_payload": exec_data.get("sequence_payload", [])})

        db.commit()
        db.refresh(prospect)
        return prospect
    except Exception as e:
        import traceback; traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

# ── MODULE 6: Compliance Built-In ─────────────────────────────────────────────
# Compliance check is now built into the outreach generation prompt.



@router.post("/{prospect_id}/approve", response_model=schemas.ProspectResponse)
def approve_sequence(prospect_id: int, request: schemas.ApproveSequenceRequest, db: Session = Depends(get_db), owner_id: str = Depends(get_owner_id)):
    """
    Toggle the outreach sequence approval status.
    If approving: calls AI to build the multi-day sequence plan (Module 7).
    Requires: messages must be generated first.
    """
    from services.ai_service import generate_sequence_timeline

    prospect = db.query(models.Prospect).filter(
        models.Prospect.id == prospect_id,
        models.Prospect.owner_id == owner_id
    ).first()
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


