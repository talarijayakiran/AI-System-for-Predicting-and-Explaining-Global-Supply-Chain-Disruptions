from fastapi import APIRouter

from app.services.explanation_service import (
    generate_explanation
)

router = APIRouter()


@router.post("/explain")
def explain_prediction():

    prediction_risk = 0.82

    congestion = 0.91

    delay = 52

    weather = 0.76

    result = generate_explanation(

        prediction_risk,

        congestion,

        delay,

        weather
    )

    return result