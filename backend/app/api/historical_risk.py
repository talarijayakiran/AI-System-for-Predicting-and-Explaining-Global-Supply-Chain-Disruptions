from fastapi import APIRouter
from sqlalchemy import func

from app.core.database import SessionLocal
from app.models.live_metric import LiveMetric

router = APIRouter()


@router.get("/historical-risk")
def get_historical_risk():

    db = SessionLocal()

    try:

        results = (
            db.query(
                LiveMetric.port,
                func.avg(
                    LiveMetric.risk
                ).label("avg_risk")
            )
            .group_by(
                LiveMetric.port
            )
            .all()
        )

        return [
            {
                "port": row.port,
                "average_risk": round(
                    float(row.avg_risk), 2
                )
            }
            for row in results
        ]

    finally:
        db.close()