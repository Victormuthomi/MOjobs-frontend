// src/lib/axios.js

import axios from "axios";

// Use only the production Render backend for testing
export const BASE_URL = "https://ajirinow-backend.onrender.com/api/";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Optional: for cookies/session auth
});

export default api;
