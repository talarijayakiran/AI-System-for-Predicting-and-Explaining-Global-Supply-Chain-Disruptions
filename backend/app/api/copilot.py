from fastapi import APIRouter

from app.services.copilot_service import (
    operational_copilot
)

router = APIRouter()


@router.post("/copilot")
def copilot_query():

    query = """
Why are shipment delays
increasing in Rotterdam?
"""

    result = operational_copilot(
        query
    )

    return {

        "copilot_response": result
    }