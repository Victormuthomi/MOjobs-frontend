import axios from "axios";

const isLocalhost = window.location.hostname === "localhost";

const api = axios.create({
  baseURL: isLocalhost
    ? "http://127.0.0.1:8000/api/"
    : "https://ajirinow-backend.onrender.com/api/",
  withCredentials: true, // Optional if using cookies or session auth
});

export default api;
