import axios from "axios";

// Function to retrieve the auth token from local storage
export function getAuthToken() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? user.token : null;
}

// Define all Axios clients with different base URLs
const baseAxiosClient = axios.create({
  baseURL: import.meta.env.VITE_USER_MANAGEMENT_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

const registrationAxiosClient = axios.create({
  baseURL: import.meta.env.VITE_USER_MANAGEMENT_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

const authAxiosClient = axios.create({
  baseURL: import.meta.env.VITE_USER_MANAGEMENT_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

// Array of all clients to add the interceptor to
const clients = [
  baseAxiosClient,
  registrationAxiosClient,
  authAxiosClient,
];

// Add a request interceptor to each client to dynamically set the Authorization header
clients.forEach(client => {
  client.interceptors.request.use(
    config => {
      const token = getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error)
  );
});

// Export all clients for use in other parts of the application
export {
  baseAxiosClient,
  registrationAxiosClient,
  authAxiosClient,
};
