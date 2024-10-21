import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import reportWebVitals from "./reportWebVitals";
import { ProductProvider } from "./context/ProductContext";
import { ProductDetailProvider } from "./context/ProductDetailContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ProductProvider>
        <ProductDetailProvider>
          <App />
        </ProductDetailProvider>
      </ProductProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
