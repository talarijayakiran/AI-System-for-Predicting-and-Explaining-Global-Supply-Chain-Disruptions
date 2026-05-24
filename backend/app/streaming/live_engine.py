import random
import time
from datetime import datetime

from app.streaming.event_history import event_history

ports = [
    "Singapore",
    "Rotterdam",
    "Los Angeles",
    "Shanghai"
]


def generate_live_metrics():
    live_data = []

    new_events = []

    for port in ports:
        risk = round(
            random.uniform(0.2, 0.95),
            2
        )

        delay = round(
            random.uniform(10, 72),
            2
        )

        congestion = round(
            random.uniform(0.1, 1.0),
            2
        )

        metric = {
            "port": port,
            "risk": risk,
            "delay_hours": delay,
            "congestion": congestion,
            "timestamp": datetime.utcnow().isoformat()
        }

        live_data.append(metric)

        if risk >= 0.7:

            severity = (
                "Critical"
                if risk >= 0.85
                else "High"
            )

            event = {
                "timestamp": datetime.utcnow().strftime(
                    "%H:%M:%S"
                ),
                "port": port,
                "severity": severity,
                "risk": risk,
                "message": f"Disruption risk elevated in {port}"
            }

            new_events.append(event)

    if new_events:
        event_history.extend(new_events)

    if len(event_history) > 50:
        del event_history[:-50]

    return live_data


if __name__ == "__main__":
    while True:
        data = generate_live_metrics()

        print("\nLIVE STREAM UPDATE\n")

        for item in data:
            print(item)

        time.sleep(5)