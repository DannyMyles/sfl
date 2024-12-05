import React, { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(useAuthContext);
  const location = useLocation();

  const adminRoutes = ["/users"];

  const customerRoutes = ["/customer-home"];

  useEffect(() => {
    if (user) {
      const { role } = user.data.role;

      if (role === "ADMIN" && customerRoutes.includes(location.pathname)) {
        return <Navigate to="/" replace />;
      }

      if (role === "CUSTOMER" && adminRoutes.includes(location.pathname)) {
        return <Navigate to="/customer-home" replace />;
      }
    }
  }, [location.pathname, user]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
