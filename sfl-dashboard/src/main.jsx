import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "../src/assets/global.scss"
import { createBrowserRouter, RouterProvider } from "react-router-dom";


import Login from './pages/auth/Login.jsx'
import Registration from './pages/auth/registration.jsx'
import ProtectedRoute from "./context/protectedRoutes.jsx";
import App from "./App.jsx";
import Users from "./pages/users.jsx";
import Dashboard from "./pages/dashboard.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Members from "./pages/members.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Registration />,
  },
  {
    path: "/sfl",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "users", element: <Users /> },
      { path: "members", element: <Members /> },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
