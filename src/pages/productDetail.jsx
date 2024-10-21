import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ProductDetailContext from "../context/ProductDetailContext";

const ProductDetail = () => {
  const { id } = useParams(); // Ambil ID dari URL
  const { state, dispatch } = useContext(ProductDetailContext);
  const { productDetail } = state;

  useEffect(() => {
    const fetchProductDetail = async () => {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      dispatch({ type: "SET_PRODUCT_DETAIL", payload: data });
    };

    fetchProductDetail();

    return () => {
      dispatch({ type: "CLEAR_PRODUCT_DETAIL" });
    };
  }, [id, dispatch]);

  if (!productDetail) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <img
          src={productDetail.image}
          alt={productDetail.title}
          className="w-full h-auto mb-4"
        />
        <h2 className="text-2xl font-bold mb-4">{productDetail.title}</h2>
        <p className="text-gray-600 mb-4">${productDetail.price}</p>
        <p className="mb-4">{productDetail.description}</p>
        <p className="text-gray-600">
          {productDetail.rating.rate} stars ({productDetail.rating.count}{" "}
          reviews)
        </p>
      </div>
    </div>
  );
};

export default ProductDetail;
