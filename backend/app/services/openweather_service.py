import httpx
import logging

from ..config import OPENWEATHER_API_KEY, OPENWEATHER_BASE_URL
from ..cache.cache_manager import get_cache, set_cache

logger = logging.getLogger(__name__)


async def fetch_weather_from_openweather(city_code, client):
    url = f"{OPENWEATHER_BASE_URL}/weather"

    params = {
        "id": city_code,
        "units": "metric",
        "appid": OPENWEATHER_API_KEY
    }

    raw_cache_key = f"weather:raw:{city_code}"
    cached_weather = await get_cache(raw_cache_key)

    if cached_weather:
        logger.info("[RAW CACHE HIT] City: %s", city_code)
        return cached_weather

    logger.info("[RAW CACHE MISS] City: %s. Calling API...", city_code)

    try:
        response = await client.get(url, params=params)
        response.raise_for_status()
        weather_data = response.json()
        await set_cache(raw_cache_key, weather_data, ttl=300)
        return weather_data
    except httpx.HTTPStatusError as status_error:
        logger.error("API error for city %s: %s", city_code, status_error)
        return None
    except httpx.RequestError as request_error:
        logger.error("Network error for city %s: %s", city_code, request_error)
        return None


async def fetch_forecast_from_openweather(city_code):
    forecast_cache_key = f"weather:forecast:{city_code}"

    cached_forecast = await get_cache(forecast_cache_key)

    if cached_forecast:
        logger.info("[FORECAST CACHE HIT] City: %s", city_code)
        return cached_forecast

    logger.info("[FORECAST CACHE MISS] City: %s", city_code)

    try:
        url = f"{OPENWEATHER_BASE_URL}/forecast"

        params = {
            "id": city_code,
            "appid": OPENWEATHER_API_KEY,
            "units": "metric"
        }

        logger.info("Calling OpenWeather forecast API for city %s", city_code)

        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=params)

        response.raise_for_status()
        forecast_data = response.json()
        await set_cache(forecast_cache_key, forecast_data, ttl=300)
        return forecast_data
    except httpx.HTTPStatusError as status_error:
        logger.error("Forecast API error for city %s: %s", city_code, status_error)
        return None
    except httpx.RequestError as request_error:
        logger.error("Forecast network error for city %s: %s", city_code, request_error)
        return None