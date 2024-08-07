import React from "react";
import "./WeatherCard.css";
import "bootstrap/dist/css/bootstrap.min.css";

const WeatherCard = ({ forecast, onClick }) => {
  return (
    <li className="card" onClick={onClick}>
      <h3>({forecast.date})</h3>
      <img src={forecast.iconUrl} alt="weather-icon" />
      <h5>Temp: {forecast.temperature}°C</h5>
      <h5>Wind: {forecast.wind} M/S</h5>
      <h5>Humidity: {forecast.humidity}%</h5>
    </li>
  );
};

export default WeatherCard;
