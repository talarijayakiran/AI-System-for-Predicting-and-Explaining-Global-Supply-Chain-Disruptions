from fastapi import FastAPI
from app.api.predict import router as predict_router
from app.api.healthy import router as health_router
from app.api.dashboard import router as dashboard_router
from app.api.analytics import router as analytics_router
from app.api.upload import router as upload_router
from app.api.explain import router as explain_router
from app.api.rag_query import router as rag_router
from app.api.copilot import (
    router as copilot_router
)
from fastapi.middleware.cors import (
    CORSMiddleware
)

app = FastAPI(
    title="Supply Chain AI Platform",
    version="1.0.0"
)

app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

app.include_router(health_router)

app.include_router(dashboard_router)

app.include_router(analytics_router)
app.include_router(upload_router)
app.include_router(predict_router)
app.include_router(explain_router)
app.include_router(rag_router)
app.include_router(
    copilot_router
)

@app.get("/")
def root():
    return {
        "message": "Supply Chain AI Platform Running"
    }