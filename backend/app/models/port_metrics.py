from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime

from app.core.database import Base


class PortMetric(Base):

    __tablename__ = "port_metrics"

    id = Column(Integer, primary_key=True, index=True)

    port_name = Column(String, nullable=False)

    container_volume = Column(Integer)

    avg_delay_hours = Column(Float)

    congestion_level = Column(Float)

    weather_score = Column(Float)

    disruption_risk = Column(Float)

    timestamp = Column(DateTime, default=datetime.utcnow)