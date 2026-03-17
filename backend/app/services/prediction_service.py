import joblib
import numpy as np
from datetime import datetime, timedelta
import os

from app.services.inventory_engine import calculate_inventory_plan
from app.services.gemini_service import generate_executive_summary
from app.utils.geo_utils import haversine_distance
from app.services.geopolitical_service import get_geopolitical_risk
from app.services.weather_service import get_weather_risk
from app.services.mongo_service import save_prediction

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "ml", "models")

delay_model = joblib.load(os.path.join(MODEL_PATH, "delay_model.pkl"))
demand_model = joblib.load(os.path.join(MODEL_PATH, "demand_model.pkl"))


def generate_future_dates(start_date, end_date):
    current = start_date
    while current <= end_date:
        yield current
        current += timedelta(days=1)


def predict_inventory_decision(
    product_id,
    current_inventory,
    origin_country,
    destination_country,
    shipping_mode,
    sustain_until_date
):

    today = datetime.today()
    sustain_date = datetime.strptime(sustain_until_date, "%Y-%m-%d")

    future_days = list(generate_future_dates(today, sustain_date))

    total_predicted_demand = 0

    for date in future_days:
        month = date.month
        day_of_week = date.weekday()

        if month in [12,1,2]:
            season = 0
        elif month in [3,4,5]:
            season = 1
        elif month in [6,7,8]:
            season = 2
        else:
            season = 3

        
        rolling_7 = 2

        features = np.array([[product_id, month, day_of_week, season, rolling_7]])

        predicted_daily = demand_model.predict(features)[0]

        if predicted_daily < 0:
            predicted_daily = 0

        total_predicted_demand += predicted_daily

    forecasted_daily_avg = total_predicted_demand / len(future_days)

    origin_risk = get_geopolitical_risk(origin_country)
    destination_risk = get_geopolitical_risk(destination_country)

    political_risk = (origin_risk + destination_risk) / 2
    
    weather_origin = get_weather_risk(origin_country)
    weather_destination = get_weather_risk(destination_country)

    weather_risk = (weather_origin + weather_destination) / 2

    transport_risk_map = {
        "Standard Class": 0.4,
        "First Class": 0.2,
        "Second Class": 0.3,
        "Same Day": 0.1
    }

    transport_risk = transport_risk_map.get(shipping_mode, 0.35)

    is_international = int(origin_country != destination_country)

    distance_km = haversine_distance(origin_country, destination_country)

    delay_features = np.array([[
        distance_km,
        political_risk,
        weather_risk,
        transport_risk,
        today.month,
        0,  # season placeholder
        is_international
    ]])

    delay_probability = delay_model.predict_proba(delay_features)[0][1]


    inventory_plan = calculate_inventory_plan(
        forecasted_daily_demand=forecasted_daily_avg,
        current_inventory=current_inventory,
        sustain_until_date=sustain_until_date,
        delay_probability=delay_probability,
        political_risk=political_risk,
        weather_risk=weather_risk
    )

    risk_pressure = (
        delay_probability * 0.4
        + political_risk * 0.3
        + weather_risk * 0.2
    )

    inventory_buffer_strength = (
        inventory_plan["safety_stock"] /
        (inventory_plan["forecasted_total_demand"] + 1)
    )

    resilience_score = 100 * (1 - risk_pressure) + (inventory_buffer_strength * 10)
    resilience_score = max(0, min(100, resilience_score))

    summary = generate_executive_summary({
        "delay_probability": float(round(delay_probability,3)),
        "forecasted_total_demand": inventory_plan["forecasted_total_demand"],
        "recommended_order_quantity": inventory_plan["recommended_order_quantity"],
        "safety_stock": inventory_plan["safety_stock"],
        "required_stock": inventory_plan["required_stock"],
        "days_to_cover": inventory_plan["days_to_cover"],
        "resilience_score": float(round(resilience_score,2))
    })

    final_output = {
    "delay_probability": float(round(delay_probability, 2)),
    "forecasted_total_demand": float(round(inventory_plan["forecasted_total_demand"], 2)),
    "recommended_order_quantity": float(round(inventory_plan["recommended_order_quantity"], 2)),
    "safety_stock": float(round(inventory_plan["safety_stock"], 2)),
    "required_stock": float(round(inventory_plan["required_stock"], 2)),
    "days_to_cover": inventory_plan["days_to_cover"],
    "resilience_score": float(round(resilience_score, 2)),
    "executive_summary": summary
    }

    save_prediction(final_output)

    return final_output