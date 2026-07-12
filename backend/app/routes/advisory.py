from fastapi import APIRouter
from app.services.market_service import get_market_data

router = APIRouter(prefix="/advisory", tags=["Advisory"])


@router.post("/")
def get_advisory(data: dict):

    state = data.get("state")
    district = data.get("district")
    market = data.get("market")
    crop = data.get("crop")

    market_data = get_market_data(
        state,
        district,
        market,
        crop
    )

    return {
        "weather": {
            "temperature": "32°C",
            "humidity": "72%",
            "rainfall": "10%"
        },

        "market": {
            "market_name": market_data.get("market", market),
            "modal_price": market_data.get("modal_price"),
            "min_price": market_data.get("min_price"),
            "max_price": market_data.get("max_price"),
            "arrival_date": market_data.get("arrival_date"),
            "trend": "Increasing"
        },

        "recommendation": "Waiting for AI recommendation from Gemma"
    }