FROM python:3.13-slim

WORKDIR /app

# Runtime dependency required by TensorFlow / PyTorch
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# Upgrade pip
RUN python -m pip install --upgrade pip

# Install CPU-only PyTorch
RUN python -m pip install --no-cache-dir \
    --index-url https://download.pytorch.org/whl/cpu \
    "torch==2.12.0+cpu"

# Copy backend dependency specification
COPY backend/requirements.txt /tmp/requirements.txt

# Install all remaining Python dependencies
RUN python -m pip install --no-cache-dir \
    -r /tmp/requirements.txt

# Copy backend application
COPY backend /app/backend

# Copy ML artifacts required at runtime
COPY ml /app/ml

# Copy RAG data and embeddings required at runtime
COPY rag /app/rag

# Make backend package importable
ENV PYTHONPATH=/app/backend

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]