from services.inventory_engine import calculate_inventory_plan

result = calculate_inventory_plan(
    forecasted_daily_demand=2,
    current_inventory=50,
    sustain_until_date="2026-12-31",
    delay_probability=0.6,
    political_risk=0.4,
    weather_risk=0.5
)

print(result)
