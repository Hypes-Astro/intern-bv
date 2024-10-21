import React from "react";
import { render } from "@testing-library/react";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import ProductList from "../pages/productList";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(() => jest.fn()),
}));

describe("ProtectedRoute", () => {
  it("redirects to /login when not authenticated", () => {
    render(
      <AuthProvider>
        <Router>
          <Routes>
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <ProductList />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    );

    expect(global.fetch).not.toBeCalled();
  });
});
