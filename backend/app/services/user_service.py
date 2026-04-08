

from app.services.mongo_service import db
from datetime import datetime

users = db["users"]

def create_executive(data):
    user = {
        "name": data["name"],
        "email": data["email"],
        "role": "executive",
        "company_name": data["company_name"],
        "created_at": datetime.utcnow()
    }
    users.insert_one(user)
    return {
        "message": "Executive created successfully"
    }


def create_analyst(data):
    user = {
        "name": data["name"],
        "email": data["email"],
        "role": "analyst",
        "company_name": data["company_name"],
        "executive_email": data["executive_email"],
        "created_at": datetime.utcnow()
    }
    users.insert_one(user)
    return {
        "message": "Analyst created successfully"
    }


def get_executives():
    return list(users.find({"role": "executive"}, {"_id": 0}))


def get_analysts_by_executive(email):
    return list(users.find(
        {"executive_email": email},
        {"_id": 0}
    ))


def get_user_profile(email):
    return users.find_one({"email": email}, {"_id": 0})