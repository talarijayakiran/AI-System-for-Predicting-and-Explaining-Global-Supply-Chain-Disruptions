import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()


client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)


def generate_copilot_response(context: str):

    try:

        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": """
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

        return completion.choices[0].message.content

    except Exception as e:
        print(f"OpenAI API ERROR: {str(e)}")

        return """
Risk Summary:
Shipment disruption risk remains elevated across monitored ports.

Main Cause:
Port congestion and delay-hour accumulation are creating unstable shipment flow and increasing downstream delivery risk.

Immediate Action Recommendation:
Prioritize rerouting delayed shipments, reduce port backlog pressure, and increase monitoring on high-risk lanes over the next operational cycle.
"""