from fastapi import APIRouter

router = APIRouter()


@router.get("/live-alerts")
def get_live_alerts():
    return [
        {
            "severity": "High",
            "message": "Port congestion rising in Singapore"
        },
        {
            "severity": "Medium",
            "message": "Shipment delays increasing in Rotterdam"
        },
        {
            "severity": "Critical",
            "message": "Container backlog detected in Shanghai"
        }
    ]