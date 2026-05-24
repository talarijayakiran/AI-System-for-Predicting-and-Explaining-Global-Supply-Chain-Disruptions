from fastapi import APIRouter
from app.services.llm_service import (
    generate_copilot_response
)

router = APIRouter()


@router.post("/copilot")
def copilot():

    context = """
    Current disruption risks are rising
    across major global ports.

    Analyze operational conditions
    and recommend operational actions.
    """

    response = generate_copilot_response(
        context
    )

    return {
        "copilot_response": response
    }