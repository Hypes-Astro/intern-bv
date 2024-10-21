import React, { createContext, useReducer } from "react";

const ProductContext = createContext();

const productReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        allProducts: action.payload.allProducts,
        products: action.payload.products,
        totalPages: Math.ceil(action.payload.allProducts.length / state.limit),
      };
    case "SET_LIMIT":
      return {
        ...state,
        limit: action.payload,
        totalPages: Math.ceil(state.allProducts.length / action.payload),
      };
    case "SET_SORT":
      return {
        ...state,
        sort: action.payload,
      };
    case "SET_PAGE":
      return {
        ...state,
        page: action.payload,
      };
    default:
      return state;
  }
};

const initialState = {
  products: [],
  allProducts: [],
  limit: 9,
  sort: "asc",
  page: 1,
  totalPages: 1,
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
