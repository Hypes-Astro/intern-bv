import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div key={product.id} className="bg-white p-4 rounded-lg shadow-lg">
      <Link to={`/products/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover mb-4"
        />
        <h2 className="text-lg font-bold mb-2">{product.title}</h2>
        <p className="text-gray-600 mb-2">${product.price}</p>
        <p className="text-gray-600">
          {product.rating.rate} stars ({product.rating.count} reviews)
        </p>
      </Link>
    </div>
  );
};

export default ProductCard;
