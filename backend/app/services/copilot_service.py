from sqlalchemy.orm import Session
from sqlalchemy import desc

from app.models.live_metric import LiveMetric
from app.services.rag_service import retrieve_context
from app.services.llm_service import generate_copilot_response


def generate_copilot_answer(db: Session, question: str):

    latest_metric = (
        db.query(LiveMetric)
        .order_by(desc(LiveMetric.timestamp))
        .first()
    )

    rag_context = retrieve_context(question)

    prompt = f"""
You are an AI Supply Chain Operations Copilot.

User Question:
{question}

Latest Supply Chain Metrics:

Port: {latest_metric.port if latest_metric else 'N/A'}

Risk Score: {latest_metric.risk if latest_metric else 'N/A'}

Delay Hours: {latest_metric.delay_hours if latest_metric else 'N/A'}

Congestion Level: {latest_metric.congestion if latest_metric else 'N/A'}

Knowledge Context:
{rag_context}

Answer in this format:

1. Risk Summary
2. Main Cause
3. Immediate Action Recommendation

Keep response concise, operational, and under 120 words.
"""

    response = generate_copilot_response(prompt)

    return response