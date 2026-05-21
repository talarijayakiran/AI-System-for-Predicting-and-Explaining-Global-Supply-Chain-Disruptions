import random
from datetime import datetime

from app.core.database import SessionLocal
from app.models.port_metrics import PortMetric

db = SessionLocal()

ports = [
    "Los Angeles",
    "Shanghai",
    "Singapore",
    "Rotterdam"
]

for _ in range(100):

    metric = PortMetric(

        port_name=random.choice(ports),

        container_volume=random.randint(5000, 20000),

        avg_delay_hours=random.uniform(1, 72),

        congestion_level=random.uniform(0, 1),

        weather_score=random.uniform(0, 1),

        disruption_risk=random.uniform(0, 1),

        timestamp=datetime.utcnow()
    )

    db.add(metric)

db.commit()

print("Synthetic data inserted successfully!")