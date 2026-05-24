from fastapi import APIRouter

router = APIRouter()

@router.get("/health")
def health_check():
    return {"status": "healthy",
        "service": "ai-supply-chain-platform",
        "version": "1.0.0"}