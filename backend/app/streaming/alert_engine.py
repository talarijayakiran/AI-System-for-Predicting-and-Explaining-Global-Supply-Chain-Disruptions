from app.streaming.live_engine import (

    generate_live_metrics
)
from datetime import datetime

from app.streaming.event_history import (

    event_history
)


def generate_alerts():

    metrics = generate_live_metrics()

    alerts = []

    for item in metrics:

        risk = item["risk"]

        if risk >= 0.85:

            severity = "CRITICAL"

            message = (

                f"{item['port']} disruption risk "

                f"critically high."
            )

        elif risk >= 0.7:

            severity = "HIGH"

            message = (

                f"{item['port']} operational "

                f"risk escalating rapidly."
            )

        elif risk >= 0.5:

            severity = "MODERATE"

            message = (

                f"{item['port']} showing "

                f"moderate instability."
            )

        else:

            severity = "LOW"

            message = (

                f"{item['port']} operations stable."
            )

        alerts.append({ 
                       

            "port": item["port"],

            "risk": risk,

            "severity": severity,

            "message": message
        })
        event_history.append({

            "timestamp": str(datetime.utcnow()),

            "port": item["port"],

            "severity": severity,

            "risk": risk,

            "message": message
        })
        if len(event_history) > 50:

            event_history.pop(0)
    return alerts