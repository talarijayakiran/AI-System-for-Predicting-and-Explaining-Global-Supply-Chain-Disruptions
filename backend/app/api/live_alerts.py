from fastapi import APIRouter

from app.streaming.alert_engine import (

    generate_alerts
)

router = APIRouter()


@router.get("/live-alerts")

def get_live_alerts():

    alerts = generate_alerts()

    return {

        "alerts": alerts
    }