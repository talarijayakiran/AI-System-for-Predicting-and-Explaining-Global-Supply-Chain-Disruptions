from fastapi import APIRouter, WebSocket
import asyncio

from app.streaming.live_engine import generate_live_metrics
from app.services.save_live_metrics import save_live_metrics
router = APIRouter()


@router.websocket("/ws/live")

async def websocket_live_metrics(websocket: WebSocket):

    await websocket.accept()

    try:

        while True:

            live_data = generate_live_metrics()

            save_live_metrics(live_data)

            await websocket.send_json({
                "live_operational_data": live_data
            })

            await asyncio.sleep(5)

    except Exception as e:

        print(
            f"WebSocket disconnected: {e}"
        )