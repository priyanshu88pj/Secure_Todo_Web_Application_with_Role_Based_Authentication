import React, { createContext, useState } from "react";
import { setAuthToken } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  let savedUser = null;
  let savedToken = null;

  try {
    savedUser = JSON.parse(localStorage.getItem("user"));
    savedToken = localStorage.getItem("token");
  } catch (e) {
    localStorage.clear(); // reset corrupted data
  }

  if (savedToken) setAuthToken(savedToken);

  const [user, setUser] = useState(savedUser);

  const login = (data, token) => {
    const userData = { role: data.role };

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);

    setAuthToken(token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.clear();
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
