import React, { useEffect, useState } from 'react'
import { IoMdArrowBack } from "react-icons/io";
import Tooltip from '../../components/Tooltip';
import SearchFilter from '../../components/SearchFilter';
import CityCard from '../../components/CityCard';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Dashboard = () => {
  const { getAccessTokenSilently, isAuthenticated, getIdTokenClaims } = useAuth0();
  const [weatherData, setWeatherData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();


  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };


  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const claims = await getIdTokenClaims();
        const idToken = claims.__raw;
        
        console.log("ID Token obtained:", idToken);
        console.log(idToken.split('.').length);

        const payload = JSON.parse(atob(idToken.split('.')[1]));
        console.log(payload);

        // const token = await getAccessTokenSilently({
        //   audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        // });
        // console.log("Access token obtained:", token);
        // console.log(token.split('.').length); 

        const response = await fetch("http://127.0.0.1:8000/weather/", {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });

        const data = await response.json();
        console.log("Fetched weather data:", data);
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    if (isAuthenticated) {
      fetchWeather();
    }
  }, [getIdTokenClaims, isAuthenticated]);


  if (!weatherData) {
    return <div className="p-6">Loading weather data...</div>;
  }


  const filteredData = weatherData
  ? weatherData.filter(city =>
      city.name && city.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : [];


  return (
    <div>
      <div className='mx-auto px-4 py-4 bg-base-200'>
        <button className="btn btn-ghost text-gray-600" onClick={() => navigate("/")}>
          <IoMdArrowBack className='text-xl mr-2' />
          Back to Home
        </button>

        <div className="card bg-base-100 w-full shadow-sm mt-4">
          <div className="card-body flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4  rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2">
              <h2 className="text-lg lg:text-2xl font-semibold text-base-content">
                City Comfort Rankings
              </h2>
              <Tooltip />
            </div>
            <SearchFilter
                value={searchQuery}
                onChange={setSearchQuery}
                resultsCount={filteredData.length}
                totalCount={weatherData.length}
            />
          </div>
        </div>

        <div className='mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center'>
          {filteredData.map((city, index) => (
            <CityCard key={index} weather={city} rank={index+1} />
          ))}
        </div>
      </div>
      
    </div>
  )
}

export default Dashboard