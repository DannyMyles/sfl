import React, { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const adminRoutes = ["/admin"];

  const userRoutes = ["/users"];

  useEffect(() => {
    if (user) {
      const role = user.role
  
      if (role === "Admin" && userRoutes.includes(location.pathname)) {
        return <Navigate to="/" replace />;
      }
  
      if (role === "User" && adminRoutes.includes(location.pathname)) {
        return <Navigate to="/users" replace />;
      }
    }
  }, [location.pathname, user]);
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
