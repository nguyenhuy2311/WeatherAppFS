import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "./UserContext"; // Adjust the import path accordingly
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Add error state
  const navigate = useNavigate();
  const { login } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Replace this with your actual login logic
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      const data = await response.json();
      login(data); // Assuming `data` contains user data including token
      navigate("/dashboard"); // Redirect to the dashboard
    } catch (error) {
      setError(error.message); // Set error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p className="error">{error}</p>} {/* Display error message */}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <span>
        Have not account yet? Register <Link to="/register">here</Link>
      </span>
      <br />
      <button className="btn btn-primary" type="submit">
        Login
      </button>
    </form>
  );
};

export default Login;
