import random
import time


ports = [

    "Singapore",

    "Rotterdam",

    "Los Angeles",

    "Shanghai"

]


def generate_live_metrics():

    live_data = []

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

        live_data.append({

            "port": port,

            "risk": risk,

            "delay_hours": delay,

            "congestion": congestion

        })

    return live_data


if __name__ == "__main__":

    while True:

        data = generate_live_metrics()

        print("\nLIVE STREAM UPDATE\n")

        for item in data:

            print(item)

        time.sleep(5)