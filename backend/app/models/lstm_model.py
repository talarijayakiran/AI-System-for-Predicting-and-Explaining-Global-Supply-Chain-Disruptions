from pathlib import Path
import tensorflow as tf
import joblib


BASE_DIR = Path(__file__).resolve().parents[3]

MODEL_PATH = BASE_DIR / "ml" / "models" / "lstm_model.keras"
SCALER_PATH = BASE_DIR / "ml" / "models" / "scaler.pkl"


print(f"Loading LSTM model from {MODEL_PATH}")
print(f"Loading scaler from {SCALER_PATH}")


model = tf.keras.models.load_model(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)