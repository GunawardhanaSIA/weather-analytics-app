import httpx
from ..config import OPENWEATHER_API_KEY, OPENWEATHER_BASE_URL
from ..cache.cache_manager import get_cache, set_cache


async def fetch_weather_from_openweather(city_code):
    url = f"{OPENWEATHER_BASE_URL}/weather"

    params = {
        "id": city_code,
        "units": "metric",
        "appid": OPENWEATHER_API_KEY
    }

    raw_cache_key = f"weather:raw:{city_code}"
    cached_weather = await get_cache(raw_cache_key)

    if cached_weather:
        print(f"[RAW CACHE HIT] City: {city_code}")
        return cached_weather

    print(f"[RAW CACHE MISS] City: {city_code}. Calling API...")

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=params)
            response.raise_for_status()
            weather_data = response.json()
            await set_cache(raw_cache_key, weather_data, ttl=300)
            return weather_data
    except httpx.HTTPStatusError as status_error:
        print(f"API error for city {city_code}: {status_error}")
        return None
    except httpx.RequestError as request_error:
        print(f"Network error for city {city_code}: {request_error}")
        return None