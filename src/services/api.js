import axios from "axios";

import dotenv from "dotenv";

dotenv.config();

const logout = () => {
  localStorage.removeItem("accessToken");
};

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: process.env.REACT_APP_API_TIMEOUT || 5000,
});

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem("accessToken");
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const statusCode = error && error.response && error.response.status;

    if (
      statusCode === 401 ||
      (statusCode === 500 && error.response.data.message.includes("expired"))
    ) {
      logout();
    }

    return Promise.reject(error);
  }
);

export default api;
