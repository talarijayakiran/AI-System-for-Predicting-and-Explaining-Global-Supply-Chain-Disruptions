from fastapi import APIRouter
import numpy as np

from app.models.lstm_model import get_model, get_scaler

router = APIRouter()


@router.post("/predict")
def predict_disruption():

    model = get_model()
    scaler = get_scaler()

    sample_sequence = np.array([
        [
            [15000, 42, 0.82, 0.71, 35, 0.75, 0.65, 0.12],
            [16000, 45, 0.85, 0.72, 37, 0.77, 0.67, 0.15],
            [17000, 48, 0.88, 0.73, 39, 0.80, 0.70, 0.18],
            [18000, 50, 0.90, 0.75, 41, 0.82, 0.72, 0.22],
            [19000, 55, 0.93, 0.78, 44, 0.85, 0.75, 0.25]
        ]
    ])

    reshaped = sample_sequence.reshape(5, 8)

    scaled = scaler.transform(reshaped)

    scaled = scaled.reshape(1, 5, 8)

    prediction = model.predict(scaled)

    return {
        "predicted_disruption_risk": float(prediction[0][0])
    }