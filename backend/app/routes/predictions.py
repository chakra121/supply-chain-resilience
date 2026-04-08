from fastapi import APIRouter, Depends
from datetime import datetime

from app.services.prediction_service import predict_inventory_decision
from app.services.mongo_service import predictions_collection
from app.middleware.auth_middleware import verify_token

from app.services.mongo_service import users_collection

router = APIRouter(prefix="/predictions", tags=["Predictions"])

def clean_result(obj):
    if isinstance(obj, dict):
        return {k: clean_result(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [clean_result(i) for i in obj]
    elif str(type(obj)) == "<class 'bson.objectid.ObjectId'>":
        return str(obj)
    else:
        return obj

@router.post("/create")
def create_prediction(request: dict, user=Depends(verify_token)):
    # Extract extra fields
    title = request.get("title")
    description = request.get("description")

    # Remove non-model fields
    data = {k: v for k, v in request.items() if k not in ["title", "description"]}
    email = user["email"]

    db_user = users_collection.find_one({"email": email})
    company_name = db_user.get("company_name", "N/A")
    # 🔥 Run prediction
    result = predict_inventory_decision(**data)

    # 🔥 SAVE SINGLE CLEAN DOCUMENT
    prediction_doc = {
        "title": title,
        "description": description,
        "email": user.get("email"),
        "company_name": company_name,
        "created_at": datetime.utcnow(),
        "input": data,
        "output": result
    }

    predictions_collection.insert_one(prediction_doc)

    return {
        "message": "Prediction created successfully",
        "data": result
    }


@router.get("/my")
def my_predictions(user=Depends(verify_token)):
    return get_predictions_by_analyst(user["email"])


@router.get("/by-analyst")
def get_predictions_by_analyst(email: str):
    predictions = list(
        predictions_collection.find(
            {"email": email},  # 🔥 analyst email
        )
    )
    for p in predictions:
        p["_id"] = str(p["_id"])

    return {
        "data": predictions
    }