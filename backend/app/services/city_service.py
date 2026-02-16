import json
import os.path


def get_city_codes():
    current_folder = os.path.dirname(__file__)
    path_of_city_file = os.path.join(current_folder, "..", "..", "cities.json")

    with open(path_of_city_file, "r") as f:
        city_list = json.load(f)
        city_codes = [city["CityCode"] for city in city_list["List"]]
        return city_codes