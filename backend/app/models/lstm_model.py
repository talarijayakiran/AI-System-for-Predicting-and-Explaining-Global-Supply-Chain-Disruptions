from tensorflow.keras.models import load_model
import joblib

from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent

MODEL_PATH = BASE_DIR / "ml/models/lstm_model.keras"

SCALER_PATH = BASE_DIR / "ml/models/scaler.pkl"

print("Loading LSTM model...")
print(MODEL_PATH)

print("Loading scaler...")
print(SCALER_PATH)

model = load_model(MODEL_PATH)

scaler = joblib.load(SCALER_PATH)

print("LSTM model loaded successfully!")