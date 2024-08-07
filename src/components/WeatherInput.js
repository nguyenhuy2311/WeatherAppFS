import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./WeatherInput.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useUser } from "./UserContext"; // Adjust the import path accordingly

const WeatherInput = ({
  city,
  setCity,
  fetchWeatherByCity,
  fetchWeatherByLocation,
}) => {
  const navigate = useNavigate();
  const { logout } = useUser();

  const handleLogout = () => {
    Cookies.remove("token"); // Remove the token cookie
    logout(); // Update the context state
    alert("Logout successful");
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div className="weather-input container">
      <h1>Weather Forecast</h1>
      <div className="input-group mb-3 justify-content-center">
        <input
          type="text"
          className="form-control city-input"
          placeholder="Enter the city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          className="btn btn-primary search-btn"
          onClick={fetchWeatherByCity}
        >
          Search
        </button>
      </div>
      <div className="separator"></div>
      <div className="button-group">
        <button
          className="btn btn-primary location-btn"
          onClick={fetchWeatherByLocation}
        >
          Use Current Location
        </button>
        <button className="btn btn-secondary logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default WeatherInput;
