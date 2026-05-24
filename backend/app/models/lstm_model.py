import os
import tensorflow as tf
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


print(f"Current working directory: {BASE_DIR}")
print(f"Loading LSTM model from {MODEL_PATH}")
print(f"Loading scaler from {SCALER_PATH}")


model = tf.keras.models.load_model(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)