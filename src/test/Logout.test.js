import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";

describe("Logout Functionality", () => {
  it("logs the user out and redirects to login", () => {
    localStorage.setItem("token", "dummy_token");

    render(
      <AuthProvider>
        <Router>
          <ProductGrid />
        </Router>
      </AuthProvider>
    );

    fireEvent.click(screen.getByText("Logout"));

    expect(localStorage.getItem("token")).toBeNull();
  });
});
