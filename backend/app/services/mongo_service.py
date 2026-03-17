from pymongo import MongoClient
import os
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)

# Explicit DB name
db = client["supply_chain_resilience"]
collection = db["predictions"]

def save_prediction(data):
    document = {
        "timestamp": datetime.utcnow(),
        **data
    }
    collection.insert_one(document)

def get_recent_predictions(limit=20):
    return list(
        collection.find({}, {"_id": 0})
        .sort("timestamp", -1)
        .limit(limit)
    )


def get_resilience_trend():
    data = list(collection.find({}, {"_id": 0, "timestamp": 1, "resilience_score": 1}))
    return data


def get_route_risk_summary():
    pipeline = [
        {
            "$group": {
                "_id": None,
                "avg_delay_probability": {"$avg": "$delay_probability"},
                "avg_resilience_score": {"$avg": "$resilience_score"},
                "avg_required_stock": {"$avg": "$required_stock"}
            }
        }
    ]

    result = list(collection.aggregate(pipeline))
    return result[0] if result else {}