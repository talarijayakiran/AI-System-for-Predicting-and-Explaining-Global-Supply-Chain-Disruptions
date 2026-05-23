from fastapi import APIRouter

from app.streaming.live_engine import (

    generate_live_metrics

)

router = APIRouter()


@router.get("/live-metrics")

def get_live_metrics():

    data = generate_live_metrics()

    return {

        "live_operational_data": data
    }