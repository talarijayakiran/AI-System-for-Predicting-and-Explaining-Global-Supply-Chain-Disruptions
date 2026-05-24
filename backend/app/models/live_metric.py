from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime

from app.core.database import Base


class LiveMetric(Base):
    __tablename__ = "live_metrics"

    id = Column(Integer, primary_key=True, index=True)

    port = Column(String)

    risk = Column(Float)

    delay_hours = Column(Float)

    congestion = Column(Float)

    timestamp = Column(
        DateTime,
        default=datetime.utcnow
    )