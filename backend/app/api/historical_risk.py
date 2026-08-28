from fastapi import APIRouter
from sqlalchemy import desc

from app.core.database import SessionLocal
from app.models.live_metric import LiveMetric

router = APIRouter()


@router.get("/historical-risk")
def get_historical_risk():

    db = SessionLocal()

    try:

        # --------------------------------------------------
        # Get total number of historical observations
        # --------------------------------------------------

        total_observations = (
            db.query(LiveMetric)
            .count()
        )

        # --------------------------------------------------
        # Only send the latest 300 observations
        # to the frontend for visualization.
        #
        # The database may contain tens of thousands
        # of records, but the browser does not need all
        # of them to draw the trend.
        # --------------------------------------------------

        rows = (
            db.query(
                LiveMetric.timestamp,
                LiveMetric.risk
            )
            .order_by(
                desc(LiveMetric.timestamp)
            )
            .limit(300)
            .all()
        )

        # --------------------------------------------------
        # Reverse so the chart receives chronological data
        # from oldest -> newest.
        # --------------------------------------------------

        rows.reverse()

        data = [
            {
                "timestamp": row.timestamp.isoformat()
                if row.timestamp
                else None,
                "risk": round(
                    float(row.risk),
                    3
                )
            }
            for row in rows
        ]

        return {
            "data": data,
            "total_observations": total_observations
        }

    finally:

        db.close()