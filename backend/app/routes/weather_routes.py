import logging

from fastapi import APIRouter, Depends, Query
from ..services.weather_service import get_weather_data
from ..services.openweather_service import fetch_forecast_from_openweather
from ..auth import verify_jwt

logger = logging.getLogger(__name__)

router = APIRouter()

@router.get("/")
async def get_weather(payload: dict = Depends(verify_jwt)):
    logger.info("Inside weather route...")
    return await get_weather_data()


@router.get("/forecast")
async def get_weather_forecast(city_code: int = Query(...), payload: dict = Depends(verify_jwt)):
    logger.info("Inside weather forecast route for city %s", city_code)
    return await fetch_forecast_from_openweather(city_code)