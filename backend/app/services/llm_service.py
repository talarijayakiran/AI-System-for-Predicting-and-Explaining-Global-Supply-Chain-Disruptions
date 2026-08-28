
import os

from dotenv import load_dotenv
from google import genai


load_dotenv()


# ---------------------------------------------------------
# Gemini Client
# ---------------------------------------------------------

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise RuntimeError(
        "GEMINI_API_KEY is not set. "
        "Add GEMINI_API_KEY to your .env file."
    )


client = genai.Client(
    api_key=GEMINI_API_KEY
)


# ---------------------------------------------------------
# Model Configuration
# ---------------------------------------------------------

GEMINI_MODEL = "gemini-3.5-flash-lite"


# ---------------------------------------------------------
# Supply Chain Operations Copilot
# ---------------------------------------------------------

def generate_copilot_response(context: str) -> str:

    system_instruction = """
You are an AI Supply Chain Operations Copilot.

Your job is to analyze the supplied operational and historical
supply-chain context and provide concise operational intelligence.

Always respond using exactly this structure:

1. Risk Summary:
<brief summary of the current risk>

2. Main Cause:
<primary cause of the disruption risk>

3. Immediate Action Recommendation:
<clear operational action>

Rules:
- Keep the response under 120 words.
- Be direct, clear, and operational.
- Base your answer only on the supplied context.
- Do not invent metrics, events, or causes that are not supported
  by the context.
- Prioritize actionable operational recommendations.
"""

    prompt = f"""
{system_instruction}

Supply Chain Operational Context:
{context}
"""

    try:

        response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=prompt,
        )

        if not response or not response.text:
            raise RuntimeError(
                "Gemini returned an empty response."
            )

        return response.text.strip()

    except Exception as e:

        print(f"Gemini API ERROR: {str(e)}")

        # Do NOT return a fake successful AI response.
        # Let the API layer handle the failure properly.
        raise RuntimeError(
            "Gemini Copilot generation failed."
        ) from e

