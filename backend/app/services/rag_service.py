import pandas as pd

import numpy as np

from pathlib import Path

from sentence_transformers import (
    SentenceTransformer
)

from sklearn.metrics.pairwise import (
    cosine_similarity
)


BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent


INCIDENTS_PATH = (
    BASE_DIR / "rag/data/incidents.csv"
)

EMBEDDINGS_PATH = (
    BASE_DIR /
    "rag/embeddings/incident_embeddings.npy"
)


print("Loading incidents...")
print(INCIDENTS_PATH)

print("Loading embeddings...")
print(EMBEDDINGS_PATH)


df = pd.read_csv(
    INCIDENTS_PATH
)

incident_embeddings = np.load(
    EMBEDDINGS_PATH
)

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)


def retrieve_context(
    query,
    top_k=2
):

    query_embedding = model.encode(
        [query]
    )

    similarities = cosine_similarity(

        query_embedding,

        incident_embeddings
    )

    top_indices = similarities[0]\
        .argsort()[-top_k:][::-1]

    incidents = df.iloc[top_indices][
        "incident_description"
    ].tolist()

    return incidents


def generate_rag_explanation(
    query,
    prediction_risk
):

    incidents = retrieve_context(
        query
    )

    retrieved_context = " ".join(
        incidents
    )

    explanation = f"""
Predicted disruption risk is {prediction_risk:.2f}.

Relevant historical operational patterns indicate:

{retrieved_context}
"""

    return explanation