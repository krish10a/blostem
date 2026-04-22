from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import models
from database import engine
from routers import prospects

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Blostem AI MVP Backend")

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In a real app, specify exact origins
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
