import axios from "axios";

export const axiosInstant = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:3000/api/" : "/api/",
});

axiosInstant.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
