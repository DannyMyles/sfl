import React, { createContext, useState, useEffect } from "react";

export const useAuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate an async login process, e.g., API request
      // Replace the next line with actual login logic (e.g., API call)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (err) {
      setError("Failed to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <useAuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </useAuthContext.Provider>
  );
};
