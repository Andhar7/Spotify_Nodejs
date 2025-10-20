import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api",
  withCredentials: true, // Send cookies with requests
});

// Response interceptor for handling errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401) {
      // Could redirect to login or handle refresh token here
      console.log("Unauthorized - redirecting to login");
    }
    return Promise.reject(error);
  }
);
