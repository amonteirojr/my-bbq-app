import axios from "axios";

import dotenv from "dotenv";

dotenv.config();

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: process.env.REACT_APP_API_TIMEOUT || 5000,
});

export default api;
