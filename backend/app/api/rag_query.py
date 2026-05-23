from fastapi import APIRouter

from app.services.rag_service import (
    generate_rag_explanation
)

router = APIRouter()


@router.post("/rag-query")
def rag_query():

    query = "shipment congestion delays"

    prediction_risk = 0.81

    result = generate_rag_explanation(

        query,

        prediction_risk
    )

    return {

        "rag_explanation": result
    }