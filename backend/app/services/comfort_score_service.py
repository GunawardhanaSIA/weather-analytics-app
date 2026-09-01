IDEAL_TEMPERATURE = 22
IDEAL_HUMIDITY = 50
IDEAL_WIND_SPEED = 3

TEMPERATURE_PENALTY = 5
HUMIDITY_PENALTY = 2
WIND_PENALTY = 8

TEMPERATURE_WEIGHT = 0.5
HUMIDITY_WEIGHT = 0.3
WIND_WEIGHT = 0.2

def calculate_comfort_score(weather_data):
    temperature = weather_data.get("main", {}).get("temp", 0)
    humidity = weather_data.get("main", {}).get("humidity", 0)
    wind = weather_data.get("wind", {}).get("speed", 0)

    temperature_score = max(0, 100 - abs(IDEAL_TEMPERATURE - temperature) * TEMPERATURE_PENALTY)
    humidity_score = max(0, 100 - abs(IDEAL_HUMIDITY - humidity) * HUMIDITY_PENALTY)
    wind_score = max(0, 100 - abs(IDEAL_WIND_SPEED - wind) * WIND_PENALTY)

    comfort_score = (temperature_score * TEMPERATURE_WEIGHT) + (humidity_score * HUMIDITY_WEIGHT) + (wind_score * WIND_WEIGHT)
    return round(min(100, max(0, comfort_score)), 2)
