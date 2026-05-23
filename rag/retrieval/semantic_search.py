import pandas as pd

import numpy as np

from sentence_transformers import (
    SentenceTransformer
)

from sklearn.metrics.pairwise import (
    cosine_similarity
)

df = pd.read_csv(
    "rag/data/incidents.csv"
)

incident_embeddings = np.load(
    "rag/embeddings/incident_embeddings.npy"
)

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)


def semantic_search(
    query,
    top_k=3
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

    return df.iloc[top_indices]


results = semantic_search(
    "shipment congestion delays"
)

print(results)