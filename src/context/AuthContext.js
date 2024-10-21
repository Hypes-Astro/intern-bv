import React, { createContext, useReducer, useEffect } from "react";

// Inisialisasi context
const AuthContext = createContext();

// Inisialisasi state awal
const initialState = {
  token: localStorage.getItem("token") || null, // Ambil token dari localStorage
};

// Reducer untuk mengelola state autentikasi
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        token: action.payload.token,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
};

// Penyedia context
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch({ type: "LOGIN_SUCCESS", payload: { token } });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
