import pandas as pd
from sqlalchemy import create_engine
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)

query = "SELECT * FROM port_metrics"

df = pd.read_sql(query, engine)

print(df.head())

print(df.shape)

df = df.sort_values("timestamp")

df = df.reset_index(drop=True)

print(df.head())