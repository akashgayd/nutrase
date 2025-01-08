// ProtectedRoutes.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ isAuthorized, children }) => {
  return isAuthorized ? children : <Navigate to="/signup" />;
};

export default ProtectedRoutes;
