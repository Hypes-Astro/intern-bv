import React, { createContext, useReducer } from "react";

const ProductDetailContext = createContext();

const productDetailReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCT_DETAIL":
      return {
        ...state,
        productDetail: action.payload,
      };
    case "CLEAR_PRODUCT_DETAIL":
      return {
        ...state,
        productDetail: null,
      };
    default:
      return state;
  }
};

const initialState = {
  productDetail: null,
};

export const ProductDetailProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productDetailReducer, initialState);

  return (
    <ProductDetailContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductDetailContext.Provider>
  );
};

export default ProductDetailContext;
