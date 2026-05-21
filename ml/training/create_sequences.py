import pandas as pd
import numpy as np

df = pd.read_csv(
    "ml/data/engineered_port_data.csv"
)

features = [

    "container_volume",

    "avg_delay_hours",

    "congestion_level",

    "weather_score",

    "delay_rolling_mean",

    "congestion_rolling_mean",

    "weather_rolling_mean",

    "risk_change"
]

X_data = df[features].values

y_data = df["disruption_risk"].values

sequence_length = 5

X_sequences = []

y_sequences = []

for i in range(len(X_data) - sequence_length):

    X_seq = X_data[
        i : i + sequence_length
    ]

    y_seq = y_data[
        i + sequence_length
    ]

    X_sequences.append(X_seq)

    y_sequences.append(y_seq)

X_sequences = np.array(X_sequences)

y_sequences = np.array(y_sequences)

print("X shape:", X_sequences.shape)

print("y shape:", y_sequences.shape)

np.save(
    "ml/data/X_sequences.npy",
    X_sequences
)

np.save(
    "ml/data/y_sequences.npy",
    y_sequences
)

print("Sequence generation completed!")