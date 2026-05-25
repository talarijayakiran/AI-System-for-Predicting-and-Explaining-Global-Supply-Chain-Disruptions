import os
import joblib

BASE_DIR = os.getcwd()

MODEL_PATH = os.path.join(
    BASE_DIR,
    "ml",
    "models",
    "lstm_model.keras"
)

SCALER_PATH = os.path.join(
    BASE_DIR,
    "ml",
    "models",
    "scaler.pkl"
)

model = None
scaler = None


def get_model():
    global model

    if model is None:
        print(f"Loading LSTM model from {MODEL_PATH}")

        import tensorflow as tf

        model = tf.keras.models.load_model(MODEL_PATH)

    return model


def get_scaler():
    global scaler

    if scaler is None:
        print(f"Loading scaler from {SCALER_PATH}")

        scaler = joblib.load(SCALER_PATH)

    return scaler