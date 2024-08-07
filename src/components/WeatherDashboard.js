import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WeatherInput from "./WeatherInput";
import CurrentWeather from "./CurrentWeather";
import WeatherCard from "./WeatherCard";
import "./WeatherDashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useUser } from "./UserContext"; // Adjust the import path accordingly

const WeatherDashboard = () => {
  const [city, setCity] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirect to login if user is not authenticated
    }
  }, [user, navigate]);

  const API_KEY = "6557810176c36fac5f0db536711a6c52";

  const createWeatherCard = (cityName, weatherItem) => {
    return {
      cityName,
      date: weatherItem.dt_txt.split(" ")[0],
      temperature: (weatherItem.main.temp - 273.15).toFixed(2),
      wind: weatherItem.wind.speed,
      humidity: weatherItem.main.humidity,
      iconUrl: `https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png`,
      description: weatherItem.weather[0].description,
    };
  };

  const fetchWeatherDetails = async (cityName) => {
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=${API_KEY}`;
    try {
      const response = await fetch(WEATHER_API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();

      const uniqueForecastDays = [];
      const fiveDaysForecast = data.list.filter((forecast) => {
        const forecastDate = new Date(forecast.dt_txt).getDate();
        if (!uniqueForecastDays.includes(forecastDate)) {
          uniqueForecastDays.push(forecastDate);
          return true;
        }
        return false;
      });

      setCurrentWeather(createWeatherCard(cityName, fiveDaysForecast[0]));
      setForecast(
        fiveDaysForecast
          .slice(1)
          .map((item) => createWeatherCard(cityName, item))
      );
    } catch (error) {
      alert(
        `An error occurred while fetching the weather forecast: ${error.message}`
      );
    }
  };

  const fetchCityWeather = () => {
    const cityName = city.trim();
    if (cityName === "") return;
    fetchWeatherDetails(cityName);
  };

  const fetchUserLocationWeather = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`;
        try {
          const response = await fetch(WEATHER_API_URL);
          if (!response.ok) {
            throw new Error("Failed to fetch weather data");
          }
          const data = await response.json();
          const cityName = data.city.name;
          fetchWeatherDetails(cityName);
        } catch (error) {
          alert(
            `An error occurred while fetching the weather forecast: ${error.message}`
          );
        }
      },
      (error) => {
        let errorMessage = "An error occurred while fetching the location.";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Geolocation request denied. Please reset location permission to grant access again.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "The request to get user location timed out.";
            break;
          case error.UNKNOWN_ERROR:
            errorMessage = "An unknown error occurred.";
            break;
          default:
        }
        alert(errorMessage);
      }
    );
  };

  return (
    <div
      className={`container ${
        !currentWeather && forecast.length === 0 ? "initial-state" : ""
      }`}
    >
      <WeatherInput
        city={city}
        setCity={setCity}
        fetchWeatherByCity={fetchCityWeather}
        fetchWeatherByLocation={fetchUserLocationWeather}
      />

      {currentWeather && <CurrentWeather weather={currentWeather} />}
      <div className="days-forecast">
        <ul className="weather-cards">
          {forecast.map((weatherItem, index) => (
            <WeatherCard
              key={index}
              forecast={weatherItem}
              onClick={() => setCurrentWeather(weatherItem)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WeatherDashboard;
