from fastapi import FastAPI
from app.api.healthy import router as health_router

app = FastAPI(
    title="Supply Chain AI Platform",
    version="1.0.0"
)

app.include_router(health_router)



@app.get("/")
def root():
    return {"message": "Supply Chain AI Platform Running"}