from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.core.database import get_db
from app.services.copilot_service import generate_copilot_answer

router = APIRouter()


class CopilotRequest(BaseModel):
    question: str


@router.post("/ask")
def ask_copilot(payload: CopilotRequest, db: Session = Depends(get_db)):

    answer = generate_copilot_answer(
        db=db,
        question=payload.question
    )

    return {
        "response": answer
    }