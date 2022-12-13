import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function PrivateRoute({ children }) {
  const { auth } = useAuth();
  const location = useLocation();

  if (!auth.username) {
    return;
  }
  return !auth.username ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : (
    children
  );
}

export default PrivateRoute;
