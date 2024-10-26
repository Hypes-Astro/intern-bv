import React, { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link dan useNavigate untuk navigasi
import ProductContext from "../../context/ProductContext";
import AuthContext from "../../context/AuthContext"; // Import AuthContext untuk logout
import ProductCard from "../ui/ProductCard";

const ProductGrid = ({ category }) => {
  const { state, dispatch } = useContext(ProductContext);
  const { dispatch: authDispatch } = useContext(AuthContext); // Dapatkan dispatch dari AuthContext
  const { products, allProducts, limit, sort, page, totalPages } = state;
  const navigate = useNavigate();

  const handleLogout = () => {
    authDispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      let url = `https://fakestoreapi.com/products?sort=${sort}`;
      if (category) {
        url = `https://fakestoreapi.com/products/category/${category}?sort=${sort}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      dispatch({
        type: "SET_PRODUCTS",
        payload: {
          allProducts: data,
          products: data.slice(0, limit),
        },
      });
    };
    fetchProducts();
  }, [sort, category, dispatch, limit]);

  useEffect(() => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    dispatch({
      type: "SET_PRODUCTS",
      payload: {
        allProducts,
        products: allProducts.slice(startIndex, endIndex),
      },
    });
  }, [page, limit, allProducts, dispatch]);

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <div>
          <label>Limit: </label>
          <select
            value={limit}
            onChange={(e) =>
              dispatch({ type: "SET_LIMIT", payload: parseInt(e.target.value) })
            }
            className="px-4 py-2 border rounded-md"
          >
            <option value={9}>9</option>
            <option value={18}>18</option>
            <option value={27}>27</option>
          </select>
        </div>
        <div>
          <label>Sort: </label>
          <select
            value={sort}
            onChange={(e) =>
              dispatch({ type: "SET_SORT", payload: e.target.value })
            }
            className="px-4 py-2 border rounded-md"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <button
          onClick={handleLogout} // Logout ketika tombol diklik
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Grid Produk */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() =>
            dispatch({ type: "SET_PAGE", payload: Math.max(page - 1, 1) })
          }
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => dispatch({ type: "SET_PAGE", payload: index + 1 })}
            className={`px-4 py-2 rounded-md ${
              page === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() =>
            dispatch({
              type: "SET_PAGE",
              payload: Math.min(page + 1, totalPages),
            })
          }
          disabled={page === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductGrid;
