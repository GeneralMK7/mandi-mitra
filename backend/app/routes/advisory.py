from fastapi import APIRouter

router = APIRouter(prefix="/advisory", tags=["Advisory"])


@router.post("/")
def get_advisory(data: dict):

    return {

        "weather": {
            "temperature": "32°C",
            "humidity": "72%",
            "rainfall": "10%"
        },

        "market": {
            "market_name": "Hyderabad Market",
            "current_price": "₹2200 / Quintal",
            "trend": "Increasing"
        },

        "crop": {
            "harvest_tip": "Harvest within 2 days",
            "storage_tip": "Can be stored for 5 days",
            "best_selling_period": "This Week"
        },

        "recommendation":
        "Waiting for AI recommendation from Gemma"
    }