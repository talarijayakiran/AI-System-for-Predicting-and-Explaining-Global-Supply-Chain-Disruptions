from pathlib import Path
import joblib


BASE_DIR = Path(__file__).resolve().parents[2]


MODEL_PATH = (
    BASE_DIR
    / "ml"
    / "models"
    / "lstm_model.keras"
)

SCALER_PATH = (
    BASE_DIR
    / "ml"
    / "models"
    / "scaler.pkl"
)


model = None
scaler = None


def get_model():
    global model

    if model is None:
        print(f"Loading LSTM model from: {MODEL_PATH}")

        if not MODEL_PATH.exists():
            raise FileNotFoundError(
                f"LSTM model not found: {MODEL_PATH}"
            )

        import tensorflow as tf

        model = tf.keras.models.load_model(MODEL_PATH)

    return model


def get_scaler():
    global scaler

    if scaler is None:
        print(f"Loading scaler from: {SCALER_PATH}")

        if not SCALER_PATH.exists():
            raise FileNotFoundError(
                f"Scaler not found: {SCALER_PATH}"
            )

        scaler = joblib.load(SCALER_PATH)

    return scaler