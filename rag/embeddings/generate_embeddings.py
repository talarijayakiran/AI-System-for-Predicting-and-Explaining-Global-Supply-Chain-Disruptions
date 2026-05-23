import pandas as pd

from sentence_transformers import (
    SentenceTransformer
)

import numpy as np

df = pd.read_csv(
    "rag/data/incidents.csv"
)

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

incident_texts = df[
    "incident_description"
].tolist()

embeddings = model.encode(
    incident_texts
)

print(np.array(embeddings).shape)

np.save(
    "rag/embeddings/incident_embeddings.npy",
    embeddings
)

print(
    "Incident embeddings generated successfully!"
)