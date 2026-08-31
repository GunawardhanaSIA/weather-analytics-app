import asyncio
import logging

from ..utils.city_loader import get_city_codes
from .api_call_service import fetch_weather_from_openweather
from .comfort_index_service import calculate_comfort_index
from ..cache.cache_manager import get_cache, set_cache

logger = logging.getLogger(__name__)


async def process_city_weather(city_code):
    processed_cache_key = f"weather:processed:{city_code}"

    cached_processed_weather = await get_cache(processed_cache_key)

    if cached_processed_weather:
        logger.info("[PROCESSED CACHE HIT] City: %s", city_code)
        return cached_processed_weather

    logger.info("[PROCESSED CACHE MISS] City: %s", city_code)

    weather_data = await fetch_weather_from_openweather(city_code)

    if weather_data is None:
        logger.warning("Skipping city %s because no data was returned", city_code)
        return None

    weather_data["comfort_score"] = calculate_comfort_index(weather_data)

    await set_cache(processed_cache_key, weather_data, ttl=300)
    return weather_data


async def get_weather_data():
    city_codes = get_city_codes()

    if len(city_codes) < 10:
        raise ValueError("Minimum 10 cities must be processed")

    weather_requests = [process_city_weather(city_code) for city_code in city_codes]

    all_weather = await asyncio.gather(*weather_requests)

    all_weather = sorted(
        (city for city in all_weather if city is not None),
        key=lambda city: city["comfort_score"],
        reverse=True
    )
    return all_weather