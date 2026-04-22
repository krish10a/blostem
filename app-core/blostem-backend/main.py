from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import models
from database import engine
from routers import prospects

from sqlalchemy import text, inspect
# Create database tables
models.Base.metadata.create_all(bind=engine)

# Quick fix for missing columns in existing tables (SQLAlchemy create_all doesn't perform migrations)
try:
    with engine.connect() as conn:
        inspector = inspect(engine)
        if "prospects" in inspector.get_table_names():
            existing_columns = [c['name'] for c in inspector.get_columns('prospects')]
            for column in models.Prospect.__table__.columns:
                if column.name not in existing_columns:
                    # Basic type mapping for common types
                    col_type = "VARCHAR"
                    if "FLOAT" in str(column.type).upper(): col_type = "FLOAT"
                    elif "INT" in str(column.type).upper(): col_type = "INTEGER"
                    elif "BOOLEAN" in str(column.type).upper(): col_type = "BOOLEAN"
                    elif "JSON" in str(column.type).upper(): col_type = "JSONB"
                    elif "DATETIME" in str(column.type).upper(): col_type = "TIMESTAMP"
                    
                    conn.execute(text(f"ALTER TABLE prospects ADD COLUMN IF NOT EXISTS {column.name} {col_type};"))
            conn.commit()
except Exception as e:
    print(f"Migration notice (handled): {e}")

app = FastAPI(title="Blostem AI MVP Backend")

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://blostem.vercel.app",
        "http://localhost:3000",
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(prospects.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Blostem AI Backend API", "status": "operational"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
