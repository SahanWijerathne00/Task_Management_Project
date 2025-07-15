import axios from "axios";

const API = axios.create({
  baseURL: "https://taskmanagementproject.up.railway.app/api",
});

// Automatically attach JWT token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
