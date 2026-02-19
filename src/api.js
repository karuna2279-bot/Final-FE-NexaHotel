import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // automatically uses your .env value
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
