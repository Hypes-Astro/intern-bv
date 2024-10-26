import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { state } = useContext(AuthContext);
  const { token } = state; // apakah udah login?

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
