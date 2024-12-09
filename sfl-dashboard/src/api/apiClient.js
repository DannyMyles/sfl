import axios from "axios";

// Function to retrieve the auth token from local storage
export function getAuthToken() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? user.token : null;
}

// Define all Axios clients with different base URLs
const baseAxiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to dynamically set the Authorization header
baseAxiosClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export { baseAxiosClient };
