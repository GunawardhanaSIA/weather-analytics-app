import json
from pathlib import Path

def get_city_codes():
    city_file = Path(__file__).resolve().parents[2] / "cities.json"

    with open(city_file, "r", encoding="utf-8") as file:
        city_data = json.load(file)
        return [city["CityCode"] for city in city_data["List"]]