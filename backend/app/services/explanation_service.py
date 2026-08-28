def generate_explanation(
    query,
    prediction_risk,
    congestion,
    delay,
    weather
):

    reasons = []

    if congestion > 0.8:

        reasons.append(
            "Port congestion levels increased significantly."
        )

    if delay > 40:

        reasons.append(
            "Average shipment delays are critically high."
        )

    if weather > 0.7:

        reasons.append(
            "Weather conditions are negatively impacting operations."
        )

    if prediction_risk > 0.7:

        risk_level = "HIGH"

    elif prediction_risk > 0.4:

        risk_level = "MODERATE"

    else:

        risk_level = "LOW"

    explanation = " ".join(reasons)

    return {

        "query": query,

        "risk_level": risk_level,

        "prediction_risk": prediction_risk,

        "explanation": explanation
    }