import sys
from pathlib import Path

from fastapi import APIRouter

EVALUATIONS_DIR = Path(__file__).resolve().parents[3] / "evaluations"
if str(EVALUATIONS_DIR) not in sys.path:
    sys.path.append(str(EVALUATIONS_DIR))

from model import call_gemma

router = APIRouter(prefix="/advisory", tags=["Advisory"])


@router.post("/")
def get_advisory(data: dict):
    commodity = data.get("crop") or "Tomato"
    state = data.get("state") or "Andhra Pradesh"
    district = data.get("district") or "Palamaner"
    market = data.get("market") or f"{district} APMC"
    latitude = float(data.get("latitude", 13.552040))
    longitude = float(data.get("longitude", 78.505798))
    language = data.get("language") or "English"

    try:
        recommendation = call_gemma(
            commodity=commodity,
            state=state,
            market=market,
            latitude=latitude,
            longitude=longitude,
            language=language,
        )
    except Exception as exc:
        recommendation = f"Unable to generate advisory right now: {exc}"

    return {
        "weather": {
            "temperature": "32°C",
            "humidity": "72%",
            "rainfall": "10%",
        },
        "market": {
            "market_name": market,
            "current_price": "₹2200 / Quintal",
            "trend": "Increasing",
            "modal_price": 2200,
            "max_price": 2350,
            "min_price": 2050,
        },
        "crop": {
            "harvest_tip": "Harvest within 2 days",
            "storage_tip": "Can be stored for 5 days",
            "best_selling_period": "This Week",
        },
        "recommendation": recommendation,
        "confidence": 88,
        "risk_level": "Low",
    }