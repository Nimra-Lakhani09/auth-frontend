import axios from "axios";

// This is the link between frontend and backend.
// Local:  http://localhost:5000/api      Vercel: https://your-backend.vercel.app/api
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Attach the JWT token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// If the token is expired/invalid, log the user out
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const url = err.config?.url || "";
    const isAuthForm = url.includes("/auth/login") || url.includes("/auth/register");
    if (err.response?.status === 401 && !isAuthForm && localStorage.getItem("token")) {
      // only force logout when the *token* is bad, not when a password check fails
      const msg = err.response?.data?.message || "";
      if (msg.toLowerCase().includes("token") || msg.toLowerCase().includes("user no longer")) {
        localStorage.removeItem("token");
        if (window.location.pathname !== "/login") window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);

// Turns any error into a readable message
export const getError = (err) =>
  err.response?.data?.message || (err.request ? "Cannot reach the server. Is the backend running?" : err.message);

export default api;
