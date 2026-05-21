from fastapi import FastAPI

from app.api.healthy import router as health_router
from app.api.dashboard import router as dashboard_router
from app.api.analytics import router as analytics_router
from app.api.upload import router as upload_router
app = FastAPI(
    title="Supply Chain AI Platform",
    version="1.0.0"
)

app.include_router(health_router)

app.include_router(dashboard_router)

app.include_router(analytics_router)
app.include_router(upload_router)

@app.get("/")
def root():
    return {
        "message": "Supply Chain AI Platform Running"
    }