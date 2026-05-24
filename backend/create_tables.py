from app.core.database import Base, engine

# import every model BEFORE create_all
from app.models.live_metric import LiveMetric

print("Creating tables...")

Base.metadata.create_all(bind=engine)

print("Tables created successfully!")