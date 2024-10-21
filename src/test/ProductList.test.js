import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProductProvider } from "../context/ProductContext";
import { BrowserRouter as Router } from "react-router-dom";
import ProductList from "../pages/productList";

describe("ProductList Pagination", () => {
  it("renders product list and handles pagination", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            { id: 1, title: "Product 1", price: 100, image: "url1" },
            { id: 2, title: "Product 2", price: 200, image: "url2" },
          ]),
      })
    );

    render(
      <ProductProvider>
        <Router>
          <ProductList />
        </Router>
      </ProductProvider>
    );

    expect(await screen.findByText("Product 1")).toBeInTheDocument();
    expect(await screen.findByText("Product 2")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Next"));
  });
});
