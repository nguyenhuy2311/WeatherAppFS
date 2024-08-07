import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./Layout.css"; // Import the CSS file
import Logout from "./Logout";
const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Logout />
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
