import axios from "axios";
import APP_CONFIG from './../config/AppConfig.js';

const appURL = `${APP_CONFIG.backendURL}/api/`
// const appURL = `/api/`;
const api = axios.create({
    baseURL: appURL,
});

// Attach token to every request if available
        // axios.get(`${APP_CONFIG.backendURL}/api/exchangedocustodaydashboard`)

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
