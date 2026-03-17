import numpy as np
from datetime import datetime, timedelta

def calculate_inventory_plan(
    forecasted_daily_demand,
    current_inventory,
    sustain_until_date,
    delay_probability,
    political_risk,
    weather_risk
):
    """
    Core inventory optimization logic.
    """

    today = datetime.today()
    sustain_date = datetime.strptime(sustain_until_date, "%Y-%m-%d")

    days_to_cover = (sustain_date - today).days

    if days_to_cover <= 0:
        return {
            "error": "Sustain date must be in the future."
        }

    # Total expected demand
    total_forecasted_demand = forecasted_daily_demand * days_to_cover

    # More realistic volatility model
    volatility_factor = 0.3 + (delay_probability * 0.2)
    demand_std = forecasted_daily_demand * volatility_factor
    
    # Risk multiplier
    risk_multiplier = 1 + (
        delay_probability * 0.5 +
        political_risk * 0.3 +
        weather_risk * 0.2
    )

    # Safety stock
    safety_stock = demand_std * np.sqrt(days_to_cover) * risk_multiplier

    # Required stock
    required_stock = total_forecasted_demand + safety_stock

    # Recommended order quantity
    recommended_order = required_stock - current_inventory

    if recommended_order < 0:
        recommended_order = 0

    return {
    "days_to_cover": int(days_to_cover),
    "forecasted_total_demand": float(round(total_forecasted_demand, 2)),
    "safety_stock": float(round(safety_stock, 2)),
    "required_stock": float(round(required_stock, 2)),
    "recommended_order_quantity": float(round(recommended_order, 2))
}