from fastapi import APIRouter
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.core.database import SessionLocal
from app.models.port_metrics import PortMetric

router = APIRouter()


@router.get("/analytics/summary")
def analytics_summary():

    db: Session = SessionLocal()

    data = (
        db.query(
            PortMetric.port_name,

            func.avg(
                PortMetric.disruption_risk
            ).label("average_risk"),

            func.avg(
                PortMetric.avg_delay_hours
            ).label("average_delay")
        )

        .group_by(PortMetric.port_name)

        .all()
    )

    results = []

    for row in data:

        if row.average_risk >= 0.7:
            status = "HIGH RISK"

        elif row.average_risk >= 0.4:
            status = "MODERATE"

        else:
            status = "STABLE"

        results.append({
            "port": row.port_name,

            "average_risk": round(
                row.average_risk, 2
            ),

            "average_delay": round(
                row.average_delay, 2
            ),

            "status": status
        })

    return results