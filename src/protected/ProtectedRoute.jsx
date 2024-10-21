import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
// Pastikan ini mengarah ke AuthContext yang benar

const ProtectedRoute = ({ children }) => {
  const { state } = useContext(AuthContext); // Mengambil state dari AuthContext
  const { token } = state; // Token digunakan untuk mengecek apakah sudah login

  if (!token) {
    // Jika tidak ada token, redirect ke halaman login
    return <Navigate to="/" />;
  }

  // Jika sudah login, render komponen anak (children)
  return children;
};

export default ProtectedRoute;
