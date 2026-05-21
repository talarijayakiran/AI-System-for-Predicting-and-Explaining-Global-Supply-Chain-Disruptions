from fastapi import APIRouter
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models.port_metrics import PortMetric

router = APIRouter()


@router.get("/dashboard")
def get_dashboard_data():

    db: Session = SessionLocal()

    data = db.query(PortMetric).all()

    results = []

    for row in data:

        results.append({
            "id": row.id,
            "port": row.port_name,
            "container_volume": row.container_volume,
            "delay_hours": row.avg_delay_hours,
            "congestion": row.congestion_level,
            "weather_score": row.weather_score,
            "risk": row.disruption_risk,
            "timestamp": row.timestamp
        })

    return results