from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def generate_executive_summary(data):

    prompt = f"""
You are a senior supply chain strategy advisor preparing a board-level summary.

Generate a structured Markdown report (max 350 words).

Round all numbers to 2 decimal places.

Follow EXACT structure:

# Inventory Decision Summary

## Key Metrics
- Delay Probability: {round(data['delay_probability'],2)}
- Forecasted Demand: {round(data['forecasted_total_demand'],2)}
- Recommended Order: {round(data['recommended_order_quantity'],2)}
- Safety Stock: {round(data['safety_stock'],2)}
- Required Stock: {round(data['required_stock'],2)}
- Days to Cover: {data['days_to_cover']}
- Resilience Score: {round(data['resilience_score'],2)}

## Executive Interpretation
Provide a balanced executive interpretation highlighting both strengths and vulnerabilities.

## Key Risks
List exactly 3 concise bullet points describing operational or financial risks.

## Strategic Actions
List exactly 3 practical, business-focused recommendations.

Rules:
- Maximum 350 words.
- Analytical, confident tone.
- Avoid repeating raw numbers unnecessarily.
- Focus on business impact.
- Markdown only.
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return response.text