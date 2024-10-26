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

  if (!productDetail)
    return (
      <div className="text-center h-screen flex justify-center items-center">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-xl flex gap-12 bg-white p-8 rounded-lg shadow-lg">
        <img
          src={productDetail.image}
          alt={productDetail.title}
          className="w-1/2  h-auto mb-4 object-contain mx-auto"
        />

        <div className="info w-full">
          {" "}
          <h2 className="text-2xl font-bold mb-4">{productDetail.title}</h2>
          <p className="text-gray-600 mb-4">${productDetail.price}</p>
          <p className="mb-4">{productDetail.description}</p>
          <p className="text-gray-600">
            {productDetail.rating.rate} stars ({productDetail.rating.count}{" "}
            reviews)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
