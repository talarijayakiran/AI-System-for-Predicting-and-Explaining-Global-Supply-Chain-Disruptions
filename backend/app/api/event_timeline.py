from fastapi import APIRouter

from app.streaming.event_history import (

    event_history
)

router = APIRouter()


@router.get("/event-timeline")

def get_event_timeline():

    return {

        "timeline": event_history[::-1]
    }