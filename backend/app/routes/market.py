from fastapi import APIRouter
from app.services.market_service import get_market_data

router = APIRouter(
    prefix="/market",
    tags=["Market"]
)

@router.get("/")
def market(
    state: str,
    district: str,
    crop: str
):
    return get_market_data(
        state,
        district,
        crop
    )