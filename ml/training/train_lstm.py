import numpy as np

from tensorflow.keras.models import Sequential

from tensorflow.keras.layers import (
    LSTM,
    Dense,
    Dropout
)

from tensorflow.keras.callbacks import EarlyStopping

X_train = np.load(
    "ml/data/X_train.npy"
)

X_test = np.load(
    "ml/data/X_test.npy"
)

y_train = np.load(
    "ml/data/y_train.npy"
)

y_test = np.load(
    "ml/data/y_test.npy"
)

print(X_train.shape)

print(y_train.shape)

model = Sequential()

model.add(

    LSTM(

        64,

        return_sequences=True,

        input_shape=(
            X_train.shape[1],
            X_train.shape[2]
        )
    )
)

model.add(
    Dropout(0.2)
)

model.add(
    LSTM(32)
)

model.add(
    Dense(1)
)

model.compile(

    optimizer="adam",

    loss="mse",

    metrics=["mae"]
)

model.summary()

early_stopping = EarlyStopping(

    monitor="val_loss",

    patience=5,

    restore_best_weights=True
)

history = model.fit(

    X_train,

    y_train,

    validation_data=(
        X_test,
        y_test
    ),

    epochs=50,

    batch_size=8,

    callbacks=[early_stopping]
)

model.save(
    "ml/models/lstm_model.keras"
)

print("LSTM training completed!")