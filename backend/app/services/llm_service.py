import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)


def generate_copilot_response(context: str):

    try:

        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    """
                    You are an AI Supply Chain Operations Copilot.

                    Give concise operational intelligence.

                    Always respond in this format:

                    1. Risk Summary
                    2. Main Cause
                    3. Immediate Action Recommendation

                    Keep under 120 words.

                    Be direct, clear, and operational.
                    Avoid long explanations.
                    """
                },
                {
                    "role": "user",
                    "content": context
                }
            ]
        )

        return completion.choices[
            0
        ].message.content

    except Exception:

        return """
        AI Copilot temporarily unavailable due to API quota limits.

        Operational Summary:
        • Disruption risk remains elevated across monitored ports
        • Congestion patterns indicate unstable shipment flow
        • Recommended action: prioritize rerouting and reduce backlog pressure
        """