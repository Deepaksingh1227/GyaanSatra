import { createContext, useContext, useState } from "react";
import axios from "../api/axios"; // ✅ custom axios instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    const res = await axios.post("/api/auth/login", credentials);
    const { token, user } = res.data;
    localStorage.setItem("token", token);
    setUser(user);
  };

  const signup = async (data) => {
    const res = await axios.post("/api/auth/signup", data);
    const { token, user } = res.data;
    localStorage.setItem("token", token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
