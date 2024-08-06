// axiosConfig.ts
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

// Create an instance of axios with default configuration
const axiosRequest = axios.create({
  baseURL: "http://localhost:8086",
});

// Add a request interceptor to include the token in the headers
axiosRequest.interceptors.request.use(
  (config) => {
    const token = useAuth.getState().token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosRequest;
