import redis.asyncio as redis
from ..config import REDIS_HOST, REDIS_PORT
import json


redis_client = redis.Redis(
    host=REDIS_HOST,
    port=REDIS_PORT,
    db=0,
    decode_responses=True
)

async def get_cache(key: str):
    data = await  redis_client.get(key)
    if data:
        return json.loads(data)
    return None

async def set_cache(key: str, data: dict, ttl: int = 300):
    await redis_client.set(key, json.dumps(data), ex=ttl)