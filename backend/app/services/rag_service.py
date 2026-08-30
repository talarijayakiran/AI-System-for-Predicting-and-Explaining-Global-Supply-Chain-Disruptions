import os
from pathlib import Path

import numpy as np
import pandas as pd
from dotenv import load_dotenv
from google import genai
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity


# ============================================================
# ENVIRONMENT
# ============================================================

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise RuntimeError("GEMINI_API_KEY is missing")


# ============================================================
# GEMINI CLIENT
# ============================================================

gemini_client = genai.Client(
    api_key=GEMINI_API_KEY
)


# ============================================================
# PATH CONFIGURATION
# ============================================================

BASE_DIR = Path("/app")

INCIDENTS_PATH = (
    BASE_DIR
    / "rag"
    / "data"
    / "incidents.csv"
)

EMBEDDINGS_PATH = (
    BASE_DIR
    / "rag"
    / "embeddings"
    / "incident_embeddings.npy"
)


# ============================================================
# LOAD INCIDENT DATA
# ============================================================

print("Loading incidents...")
print(INCIDENTS_PATH)

if not INCIDENTS_PATH.exists():
    raise FileNotFoundError(
        f"Incidents file not found: {INCIDENTS_PATH}"
    )

df = pd.read_csv(INCIDENTS_PATH)


# ============================================================
# LOAD EMBEDDINGS
# ============================================================

print("Loading embeddings...")
print(EMBEDDINGS_PATH)

if not EMBEDDINGS_PATH.exists():
    raise FileNotFoundError(
        f"Embeddings file not found: {EMBEDDINGS_PATH}"
    )

incident_embeddings = np.load(
    EMBEDDINGS_PATH
)


# ============================================================
# LOAD EMBEDDING MODEL
# ============================================================

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)


# ============================================================
# RETRIEVE RELEVANT INCIDENTS
# ============================================================

def retrieve_context(
    query: str,
    top_k: int = 3
) -> list[str]:

    if not query or not query.strip():
        return []

    query_embedding = model.encode(
        [query]
    )

    similarities = cosine_similarity(
        query_embedding,
        incident_embeddings
    )

    top_indices = (
        similarities[0]
        .argsort()[-top_k:][::-1]
    )

    incidents = (
        df.iloc[top_indices][
            "incident_description"
        ]
        .dropna()
        .astype(str)
        .tolist()
    )

    return incidents


# ============================================================
# GENERATE RAG EXPLANATION USING GEMINI
# ============================================================

def generate_rag_explanation(
    query: str,
    prediction_risk: float | None = None
) -> str:

    # --------------------------------------------------------
    # Retrieve historical context
    # --------------------------------------------------------

    incidents = retrieve_context(
        query=query,
        top_k=3
    )

    if incidents:

        retrieved_context = "\n".join(
            f"- {incident}"
            for incident in incidents
        )

    else:

        retrieved_context = (
            "No relevant historical incidents were found."
        )


    # --------------------------------------------------------
    # Risk information
    # --------------------------------------------------------

    if prediction_risk is None:

        risk_text = "Not provided"

    else:

        risk_text = f"{prediction_risk:.2f}"


    # --------------------------------------------------------
    # Gemini prompt
    # --------------------------------------------------------

    prompt = f"""
You are an AI Supply Chain Operations Analyst.

Your task is to answer the user's supply-chain question
using the retrieved historical operational incidents.

USER QUESTION:
{query}

CURRENT PREDICTED DISRUPTION RISK:
{risk_text}

RETRIEVED HISTORICAL INCIDENTS:
{retrieved_context}

RULES:

1. Answer the user's actual question.
2. Use the retrieved incidents as historical evidence.
3. Do not invent facts that are not present in the context.
4. Do not claim that historical incidents are current events.
5. If the retrieved evidence is insufficient, clearly say so.
6. Keep the answer concise and operational.
7. Do not mention embeddings, vector databases, prompts,
   SentenceTransformer, or internal implementation details.
8. Do not blindly repeat the same recommendation for every question.

Return exactly these three sections:

Risk Context:
<brief interpretation of the current risk, if provided>

Historical Evidence:
<relevant historical patterns from the retrieved incidents>

Operational Insight:
<direct answer to the user's question>
"""


    # --------------------------------------------------------
    # Gemini generation
    # --------------------------------------------------------

    try:

        response = gemini_client.models.generate_content(
            model="gemini-3.5-flash-lite",
            contents=prompt
        )

        if not response.text:

            raise RuntimeError(
                "Gemini returned an empty response"
            )

        return response.text.strip()


    except Exception as e:

        print(
            f"Gemini RAG ERROR: {str(e)}"
        )

        raise RuntimeError(
            "Gemini RAG generation failed"
        ) from e