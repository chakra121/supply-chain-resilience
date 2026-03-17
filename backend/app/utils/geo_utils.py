import math
from app.utils.geo_data import country_coordinates

def haversine_distance(origin, destination):
    if origin not in country_coordinates or destination not in country_coordinates:
        return 5000

    lat1, lon1 = country_coordinates[origin]
    lat2, lon2 = country_coordinates[destination]

    R = 6371
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)

    a = (
        math.sin(dlat/2)**2
        + math.cos(math.radians(lat1))
        * math.cos(math.radians(lat2))
        * math.sin(dlon/2)**2
    )
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    return R * c