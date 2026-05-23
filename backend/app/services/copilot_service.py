from app.services.rag_service import (
    generate_rag_explanation
)


def operational_copilot(
    user_query
):

    if "delay" in user_query.lower():

        prediction_risk = 0.81

        response = generate_rag_explanation(

            user_query,

            prediction_risk
        )

        return response

    return """
Operational copilot could not
identify relevant disruption context.
"""