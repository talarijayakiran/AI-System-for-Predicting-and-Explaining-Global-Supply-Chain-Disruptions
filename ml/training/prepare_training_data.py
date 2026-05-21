import numpy as np

from sklearn.model_selection import train_test_split

from sklearn.preprocessing import MinMaxScaler

import joblib

X = np.load(
    "ml/data/X_sequences.npy"
)

y = np.load(
    "ml/data/y_sequences.npy"
)

print("Original X shape:", X.shape)

print("Original y shape:", y.shape)

samples, timesteps, features = X.shape

X_reshaped = X.reshape(
    samples * timesteps,
    features
)

scaler = MinMaxScaler()

X_scaled = scaler.fit_transform(
    X_reshaped
)

X_scaled = X_scaled.reshape(
    samples,
    timesteps,
    features
)

X_train, X_test, y_train, y_test = train_test_split(

    X_scaled,

    y,

    test_size=0.2,

    random_state=42
)

print("X_train:", X_train.shape)

print("X_test:", X_test.shape)

print("y_train:", y_train.shape)

print("y_test:", y_test.shape)

np.save(
    "ml/data/X_train.npy",
    X_train
)

np.save(
    "ml/data/X_test.npy",
    X_test
)

np.save(
    "ml/data/y_train.npy",
    y_train
)

np.save(
    "ml/data/y_test.npy",
    y_test
)

joblib.dump(
    scaler,
    "ml/models/scaler.pkl"
)

print("Training data preparation completed!")