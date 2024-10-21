import React, { useState } from "react";
import CategoryFilter from "../components/fragments/categoryFilter";
import ProductGrid from "../components/fragments/productGrid";

const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Product List</h1>
      <CategoryFilter onCategoryChange={setSelectedCategory} />
      <ProductGrid category={selectedCategory} />
    </div>
  );
};

export default ProductList;
