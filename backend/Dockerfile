FROM python:3.13-slim

WORKDIR /app

COPY backend/requirements.txt .

# Install CPU-only PyTorch first.
# This EC2 instance has no NVIDIA GPU.
RUN pip install --no-cache-dir --root-user-action=ignore \
    --index-url https://download.pytorch.org/whl/cpu \
    torch==2.7.1

# Install remaining application dependencies from PyPI.
RUN pip install --no-cache-dir --root-user-action=ignore \
    --index-url https://pypi.org/simple \
    -r requirements.txt

# Copy backend application into /app.
COPY backend/ .

# Copy RAG data and embeddings into /app/rag.
COPY rag/ /app/rag/

EXPOSE 8000

CMD ["sh", "-c", "python create_tables.py && uvicorn app.main:app --host 0.0.0.0 --port 8000"]
