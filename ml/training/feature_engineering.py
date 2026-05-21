import pandas as pd
from sqlalchemy import create_engine
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)

query = "SELECT * FROM port_metrics"

df = pd.read_sql(query, engine)

df = df.sort_values("timestamp")

df = df.reset_index(drop=True)

df["delay_rolling_mean"] = (
    df["avg_delay_hours"]
    .rolling(window=5)
    .mean()
)

df["congestion_rolling_mean"] = (
    df["congestion_level"]
    .rolling(window=5)
    .mean()
)

df["weather_rolling_mean"] = (
    df["weather_score"]
    .rolling(window=5)
    .mean()
)

df["risk_change"] = (
    df["disruption_risk"]
    .diff()
)

df = df.fillna(0)

print(df.head(10))

df.to_csv(
    "ml/data/engineered_port_data.csv",
    index=False
)

print("Feature engineering completed!")