import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { ProductDetailProvider } from "../context/ProductDetailContext";
import ProductDetail from "../pages/productDetail";

// Mock useParams to simulate dynamic routing
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: "1" }),
}));

// Mock fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        id: 1,
        title: "Test Product",
        price: 100,
        description: "This is a test product.",
        image: "test-image-url",
        rating: {
          rate: 4.5,
          count: 100,
        },
      }),
  })
);

describe("ProductDetail", () => {
  it("renders product detail correctly", async () => {
    render(
      <ProductDetailProvider>
        <Router>
          <ProductDetail />
        </Router>
      </ProductDetailProvider>
    );

    // Ensure product details are displayed correctly
    expect(await screen.findByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
    expect(screen.getByText("This is a test product.")).toBeInTheDocument();
    expect(screen.getByText("4.5 stars (100 reviews)")).toBeInTheDocument();
  });
});
