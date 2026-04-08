from fastapi import FastAPI
from fastapi import Depends
from pydantic import BaseModel

from fastapi.middleware.cors import CORSMiddleware
from app.middleware.auth_middleware import verify_token
from app.services.prediction_service import predict_inventory_decision
from app.services.mongo_service import (
    get_recent_predictions,
    get_resilience_trend,
    get_route_risk_summary
)
from app.routes import users, predictions

app = FastAPI(title="Supply Chain Resilience System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://supply-chain-resilience-frontend.vercel.app"],  # for development (later restrict)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(predictions.router)


class InventoryRequest(BaseModel):
    product_id: int
    current_inventory: int
    origin_country: str
    destination_country: str
    shipping_mode: str
    sustain_until_date: str


@app.get("/")
def root():
    return {"message": "Resilience AI Backend Running"}


@app.post("/predict")
def predict_inventory(request: InventoryRequest, user=Depends(verify_token)):
    result = predict_inventory_decision(
        user_email=user["email"],
        product_id=request.product_id,
        current_inventory=request.current_inventory,
        origin_country=request.origin_country,
        destination_country=request.destination_country,
        shipping_mode=request.shipping_mode,
        sustain_until_date=request.sustain_until_date
    )

    return result

@app.get("/history")
def history(limit: int = 20):
    return get_recent_predictions(limit)


@app.get("/analytics/resilience-trend")
def resilience_trend():
    return get_resilience_trend()


@app.get("/analytics/route-summary")
def route_summary():
    return get_route_risk_summary()