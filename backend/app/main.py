from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from .routes.weather_routes import router

app = FastAPI(title="Weather Analytics API")

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/weather")