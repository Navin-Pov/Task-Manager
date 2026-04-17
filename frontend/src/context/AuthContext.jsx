import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Configuration for Axios
  const api = axios.create({
    baseURL: "http://localhost:5000/api",
  });

  // Set token dynamically on requests
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await api.get("/auth/me");
          setUser(res.data);
        } catch (error) {
          console.error("Token invalid", error);
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    setUser(res.data);
  };

  const register = async (username, email, password) => {
    const res = await api.post("/auth/register", { username, email, password });
    localStorage.setItem("token", res.data.token);
    setUser(res.data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, api }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
