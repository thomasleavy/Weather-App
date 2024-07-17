import React, { useState } from 'react';
import axios from 'axios';
import backgroundImage from '../assets/background-image.jpg';

const WeatherForecast = () => {
  const [city, setCity] = useState('');
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);

  const getWeather = async (city) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
        params: {
          q: city,
          units: 'metric',
          appid: 'fd5d38e5ea288e3e291e2f2238c97b45'
        }
      });

      const processedForecast = processForecastData(response.data);
      setForecast(processedForecast);
      setError(null);
    } catch (error) {
      setError('City was not found, try again!');
      setForecast(null);
    }
  };

  const processForecastData = (data) => {
    if (!data || !data.list) return null;

    const processedForecasts = [];
    const dailyForecasts = {};

    // Group forecasts by day
    data.list.forEach((weather) => {
      const date = weather.dt_txt.split(' ')[0];
      if (!dailyForecasts[date]) {
        dailyForecasts[date] = [];
      }
      dailyForecasts[date].push(weather);
    });

    // Select one forecast per day, e.g., the one around noon
    Object.keys(dailyForecasts).forEach((date) => {
      const forecastsForDate = dailyForecasts[date];
      const middayForecast = forecastsForDate.find((f) => f.dt_txt.includes('12:00:00')) || forecastsForDate[0];
      processedForecasts.push(middayForecast);
    });

    // Ensure we have exactly 7 days of forecast
    while (processedForecasts.length > 7) {
      processedForecasts.pop();
    }

    while (processedForecasts.length < 7) {
      const lastForecast = processedForecasts[processedForecasts.length - 1];
      const newDate = new Date(lastForecast.dt_txt);
      newDate.setDate(newDate.getDate() + 1);
      const newForecast = { ...lastForecast, dt_txt: newDate.toISOString().split('T')[0] + ' 12:00:00' };
      processedForecasts.push(newForecast);
    }

    return processedForecasts;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather(city);
  };

  return (
    <div
      className="container mx-auto p-4 text-gray-300"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
    >
      <form onSubmit={handleSubmit} className="mb-4 flex justify-center">
        <input
          type="text"
          className="p-2 mr-2 text-black"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button type="submit" className="text-gray-300 p-2 hover:bg-red-600 hover:text-white border border-gray-300 rounded-md">
          Get Forecast
        </button>
      </form>

      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{city}</h1>
      </div>

      {error && <p className="text-center font-bold text-red-100 ">{error}</p>}

      {forecast && (
        <div>
          {forecast.map((weather, index) => (
            <div key={index} className="mb-4 max-w-md mx-auto">
              <h2 className="text-xl mb-2 text-center font-bold">{new Date(weather.dt_txt).toLocaleDateString(undefined, { weekday: 'long' })}</h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="text-center bg-[#267491] p-4 rounded-md">
                  <p className="text-gray-300 font-bold text-2xl">{weather.weather[0].description}</p>
                  <p className="text-gray-300 font-bold text-2xl">{Math.round(weather.main.temp)}°C</p>
                  <img
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                    alt={weather.weather[0].description}
                    className='w-24 h-24'
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherForecast;
