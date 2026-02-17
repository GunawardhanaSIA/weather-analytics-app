# WeatherComfort - Comfort Index Weather Analytics App

This project is a secure weather analytics application that calculates a custom Comfort Index for cities and displays it on a responsive frontend. The app uses **FastAPI** for the backend, **React** for the frontend, and **Redis** for caching.

---

## 1. Project Setup Instructions

### Prerequisites
- Docker installed
- Docker Compose installed

### i. Clone the repository
Clone the repository with the below code.

```bash
git clone https://github.com/GunawardhanaSIA/weather-analytics-app.git
```

### ii. Environment Variables
For convenience, .env files for both the frontend and backend have been included in the repository, even though committing environment files with secrets is not recommended.

### iii. Build and Run the Application
From the project root, run:

```bash
docker-compose up --build
```
To stop all containers, run:
```bash
docker-compose down
```

### iv. Access the Application
To view and interact with the Comfort Index, open your browser and go to **http://localhost:5173**.

### v. Test Users (Auth0)
Test account:
- **Email:** careers@fidenz.com  
- **Password:** Pass#fidenz

MFA is enabled using the **Authenticator App** as the primary factor, because Auth0 **does not allow email** to be used as the only MFA method.


## 2. Comfort Index Formula

The Comfort Index is calculated using three main weather variables:

- **Temperature** (Ideal: 22°C)
- **Humidity** (Ideal: 50%)
- **Wind Speed** (Ideal: 8 m/s)

These were chosen because they have the **most significant effect on human comfort**.

The formula assigns weights to each variable based on its perceived importance:
- Temperature: 50%  
- Humidity: 30%  
- Wind Speed: 20%

Each variable is converted into a score from 0 to 100, and the weighted sum gives the final Comfort Index.  

**Trade-offs considered:**

- Only the three variables above were used for simplicity and relevance.  
- Other factors like cloudiness, visibility, or pressure were ignored to keep the metric straightforward and easy to interpret.  
- The weights are subjective, reflecting general human comfort preferences, but can be adjusted in future iterations.


## 3. Cache Design

To improve performance and reduce repeated API calls, a caching system using **Redis** has been implemented.

- **Redis Setup:**  
  - Redis runs as a **Docker container** defined in `docker-compose.yml`.  
  - The backend connects to Redis using the host and port defined in `.env`.

- **Caching Logic:**  
  - **`get_cache(key)`**: Retrieves cached weather data for a city if it exists.  
  - **`set_cache(key, data, ttl)`**: Stores weather data in Redis with a key (e.g., cityCode).  
  - When a city’s weather is requested:
    1. The backend first checks Redis using `get_cache`.  
    2. If the data exists, it is returned immediately (faster response).  
    3. If the data does not exist, the backend calls the OpenWeather API, then stores the result in Redis using `set_cache`.  

- **Benefits:**  
  - Reduces repeated API calls to OpenWeather.  
  - Improves response time.  

This design ensures that weather data is **quickly available** while still being **up-to-date**.


## 4. Known Limitations
The following are the current limitations of the project, planned for improvement in future updates:

- The current implementation uses the OpenWeather `weather` endpoint to fetch only the current weather for each city.
- To display data for charts, such as a 7-day temperature forecast, the API call should be switched to the `onecall` endpoint.
- As a result, chart data is currently a placeholder, and historical or future forecasts are not available until this change is made.
