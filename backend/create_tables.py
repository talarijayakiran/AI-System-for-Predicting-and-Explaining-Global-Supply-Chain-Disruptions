from app.core.database import engine, Base

from app.models.port_metrics import PortMetric

print("Creating tables...")

Base.metadata.create_all(bind=engine)

print("Tables created successfully!")