import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useUser } from "./UserContext"; // Adjust the import path accordingly

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useUser();

  const handleLogout = () => {
    Cookies.remove("token"); // Remove the token cookie
    logout(); // Update the context state
    alert("Logout successful");
    navigate("/login"); // Redirect to the login page
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
