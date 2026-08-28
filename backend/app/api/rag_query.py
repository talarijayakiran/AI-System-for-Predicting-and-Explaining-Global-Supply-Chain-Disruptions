from fastapi import APIRouter
from pydantic import BaseModel, Field

from app.services.rag_service import (
    generate_rag_explanation
)


router = APIRouter()


# ============================================================
# REQUEST MODEL
# ============================================================

class RAGQueryRequest(BaseModel):

    query: str = Field(
        ...,
        min_length=1,
        description="Supply chain question"
    )

    prediction_risk: float | None = Field(
        default=None,
        ge=0.0,
        le=1.0,
        description="Optional predicted disruption risk"
    )


# ============================================================
# RAG QUERY ENDPOINT
# ============================================================

@router.post("/rag-query")
def rag_query(
    request: RAGQueryRequest
):

    result = generate_rag_explanation(
        query=request.query,
        prediction_risk=request.prediction_risk
    )

    return {
        "query": request.query,
        "rag_explanation": result
    }