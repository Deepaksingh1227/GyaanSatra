import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    const res = await axios.post("http://localhost:5000/api/auth/login", credentials);
    const { token, user } = res.data;
    localStorage.setItem("token", token);
    setUser(user);
  };

  const signup = async (data) => {
    const res = await axios.post("http://localhost:5000/api/auth/signup", data);
    const { token, user } = res.data;
    localStorage.setItem("token", token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const value = { user, login, logout, signup };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
