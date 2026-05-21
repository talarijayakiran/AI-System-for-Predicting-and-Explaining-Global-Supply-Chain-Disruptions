from fastapi import APIRouter, UploadFile, File
import pandas as pd

from app.core.database import SessionLocal
from app.models.port_metrics import PortMetric

router = APIRouter()


@router.post("/upload/csv")
async def upload_csv(
    file: UploadFile = File(...)
):

    df = pd.read_csv(file.file)

    db = SessionLocal()

    for _, row in df.iterrows():

        metric = PortMetric(

            port_name=row["port_name"],

            container_volume=row["container_volume"],

            avg_delay_hours=row["avg_delay_hours"],

            congestion_level=row["congestion_level"],

            weather_score=row["weather_score"],

            disruption_risk=row["disruption_risk"]
        )

        db.add(metric)

    db.commit()

    return {
        "message": "CSV uploaded successfully!",
        "rows_inserted": len(df)
    }