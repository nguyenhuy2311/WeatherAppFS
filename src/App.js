import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import WeatherDashboard from "./components/WeatherDashboard";
import Logout from "./components/Logout";
import { UserProvider } from "./components/UserContext"; // Adjust the import path accordingly
import Register from "./components/Register";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<WeatherDashboard />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
