import random

country_base_risk = {
    "India": 0.45,
    "Australia": 0.20,
    "United States": 0.25,
    "Indonesia": 0.50,
    "Puerto Rico": 0.35
}

def get_geopolitical_risk(country):
    base = country_base_risk.get(country, 0.4)

    # Simulate dynamic fluctuations
    fluctuation = random.uniform(-0.05, 0.05)

    risk = base + fluctuation
    return max(0, min(1, risk))