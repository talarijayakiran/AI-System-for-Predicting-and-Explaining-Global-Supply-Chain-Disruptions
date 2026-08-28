from fastapi import APIRouter
from pydantic import BaseModel

from app.services.explanation_service import (
    generate_explanation
)

router = APIRouter()


class ExplanationRequest(BaseModel):

    query: str

    prediction_risk: float
    congestion: float
    delay: float
    weather: float


@router.post("/explain")
def explain_prediction(request: ExplanationRequest):

    result = generate_explanation(

        query=request.query,

        prediction_risk=request.prediction_risk,

        congestion=request.congestion,

        delay=request.delay,

        weather=request.weather
    )

    return result