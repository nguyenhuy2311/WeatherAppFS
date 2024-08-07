import React, { createContext, useState, useContext } from "react";
import Cookies from "js-cookie";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
    Cookies.set("token", userData.token); // Save token to cookies
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("token");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
