import axios from "axios";

const API_URL = import.meta.env.REACT_APP_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: `${API_URL}/api`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const signup = (data) => api.post("/auth/signup", data);
export const login = (data) => api.post("/auth/login", data);

export const createSoftware = (data) => api.post("/software", data);

export const createRequest = (data) => api.post("/requests", data);

export const updateRequest = (id, data) => api.patch(`/requests/${id}`, data);

export default api;
