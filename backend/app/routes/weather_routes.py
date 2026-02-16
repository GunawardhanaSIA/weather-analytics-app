from fastapi import APIRouter, Depends
from ..services.weather_service import get_weather_data
from ..auth import verify_jwt

router = APIRouter()

@router.get("/")
async def get_weather(payload: dict = Depends(verify_jwt)):
    print("inside weather route")
    return await get_weather_data()