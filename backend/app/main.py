from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import Routes
from app.routes.auth import router as auth_router
from app.routes.advisory import router as advisory_router

app = FastAPI(
    title="MandiMitra API",
    description="Backend API for MandiMitra Hackathon Project",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5175"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Home Route
@app.get("/")
def home():
    return {
        "message": "Welcome to MandiMitra Backend"
    }

# Health Check
@app.get("/health")
def health():
    return {
        "status": "Running"
    }

# Register Routes
app.include_router(auth_router)

# Advisory Routes
app.include_router(advisory_router)