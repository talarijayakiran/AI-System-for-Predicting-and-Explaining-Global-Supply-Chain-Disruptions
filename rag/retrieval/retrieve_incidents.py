import pandas as pd

df = pd.read_csv(
    "rag/data/incidents.csv"
)

print(df.head())


def retrieve_similar_incidents(
    keyword
):

    results = df[
        df["incident_description"]
        .str.contains(
            keyword,
            case=False
        )
    ]

    return results


results = retrieve_similar_incidents(
    "congestion"
)

print(results)