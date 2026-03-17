import random

def get_weather_risk(country):
    base_weather_risk = {
        "India": 0.50,
        "Australia": 0.30,
        "United States": 0.35,
        "Indonesia": 0.60,
        "Puerto Rico": 0.55
    }

    base = base_weather_risk.get(country, 0.4)

    seasonal_variation = random.uniform(-0.1, 0.1)

    risk = base + seasonal_variation
    return max(0, min(1, risk))