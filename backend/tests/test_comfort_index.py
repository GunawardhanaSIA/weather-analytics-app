import pytest
from app.services.comfort_index_service import calculate_comfort_index


def test_perfect_comfort_conditions():
    """Ideal weather"""
    weather_data = {
        "main": {"temp": 22, "humidity": 50},
        "wind": {"speed": 3}
    }
    assert calculate_comfort_index(weather_data) == 100


def test_high_temperature():
    """Very hot weather"""
    weather_data = {
        "main": {"temp": 35, "humidity": 50},
        "wind": {"speed": 3}
    }
    assert calculate_comfort_index(weather_data) < 100


def test_low_temperature():
    """Cold weather"""
    weather_data = {
        "main": {"temp": 5, "humidity": 50},
        "wind": {"speed": 3}
    }
    assert calculate_comfort_index(weather_data) < 100


def test_high_humidity():
    """High humidity"""
    weather_data = {
        "main": {"temp": 22, "humidity": 90},
        "wind": {"speed": 3}
    }
    assert calculate_comfort_index(weather_data) < 100


def test_high_wind_speed():
    """Strong wind"""
    weather_data = {
        "main": {"temp": 22, "humidity": 50},
        "wind": {"speed": 15}
    }
    assert calculate_comfort_index(weather_data) < 100


def test_missing_data_defaults():
    """Missing weather fields should not crash"""
    weather_data = {}
    score = calculate_comfort_index(weather_data)

    assert isinstance(score, float)
    assert 0 <= score <= 100


def test_extreme_conditions_clamped():
    """Extreme values should should never return a value below 0 or above 100"""
    weather_data = {
        "main": {"temp": 100, "humidity": 0},
        "wind": {"speed": 50}
    }
    score = calculate_comfort_index(weather_data)

    assert 0 <= score <= 100
