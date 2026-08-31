import logging

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from .routes.weather_routes import router
from .logging_config import setup_logging

setup_logging()
logger = logging.getLogger(__name__)

app = FastAPI(title="Weather Analytics API")

logger.info("Weather Analytics API started")

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/weather")