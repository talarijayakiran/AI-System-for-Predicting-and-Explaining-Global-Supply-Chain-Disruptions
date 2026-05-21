from sqlalchemy import create_engine
from app.core.database import engine
DATABASE_URL = "postgresql://postgres:jai484@localhost:5432/supplychain_db"

try:
    engine = create_engine(DATABASE_URL)

    connection = engine.connect()

    print("Database connected successfully!")

    connection.close()

except Exception as e:
    print("Connection failed!")
    print(e)
    

print(engine)