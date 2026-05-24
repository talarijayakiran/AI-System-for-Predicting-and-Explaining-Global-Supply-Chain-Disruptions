from app.models.live_metric import LiveMetric
from app.core.database import SessionLocal


def save_live_metrics(data):

    db = SessionLocal()

    try:

        for item in data:

            metric = LiveMetric(
                port=item["port"],
                risk=item["risk"],
                delay_hours=item["delay_hours"],
                congestion=item["congestion"]
            )

            db.add(metric)

        db.commit()

    finally:
        db.close()