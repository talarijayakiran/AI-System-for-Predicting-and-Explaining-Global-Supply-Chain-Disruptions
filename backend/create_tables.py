from app.core.database import Base, engine

# import every model BEFORE create_all
from app.models.live_metric import LiveMetric
from app.models.port_metrics import PortMetric

print("Creating database tables...")

Base.metadata.create_all(bind=engine)

print("Tables created successfully!")