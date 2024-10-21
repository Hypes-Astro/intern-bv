import React, { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { login } from "../../middleware/authMiddleware";
import InputField from "../ui/inputField";

const LoginForm = () => {
  const { dispatch } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Deklarasi useNavigate untuk redirect

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(dispatch, { username, password });
    navigate("/products");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Masuk</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputField
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <button
          onClick={() => navigate("/products")}
          className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded mt-4 hover:bg-green-700"
        >
          Lihat Produk
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
