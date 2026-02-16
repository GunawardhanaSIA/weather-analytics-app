def calculate_comfort_index(weather_data):
    temperature = weather_data.get("main", {}).get("temp", 0)
    humidity = weather_data.get("main", {}).get("humidity", 0)
    wind = weather_data.get("wind", {}).get("speed", 0)

    temperature_score = max(0, 100 - abs(22 - temperature) * 5)
    humidity_score = max(0, 100 - abs(50 - humidity) * 2)
    wind_score = max(0, 100 - abs(3 - wind) * 8)

    comfort_index = (temperature_score * 0.5) + (humidity_score * 0.3) + (wind_score * 0.2)
    return round(min(100, max(0, comfort_index)), 2)
