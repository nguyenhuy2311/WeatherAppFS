import React from "react";
import "./CurrentWeather.css";
import "bootstrap/dist/css/bootstrap.min.css";
const CurrentWeather = ({ weather }) => {
  return (
    <div className="current-weather">
      <div className="details">
        <h1>
          {weather.cityName} ({weather.date})
        </h1>
        <h4>Temperature: {weather.temperature}°C</h4>
        <h4>Wind: {weather.wind} M/S</h4>
        <h4>Humidity: {weather.humidity}%</h4>
      </div>
      <div className="icon">
        <img src={weather.iconUrl} alt="weather-icon" />
        <h4>{weather.description}</h4>
      </div>
    </div>
  );
};

export default CurrentWeather;
