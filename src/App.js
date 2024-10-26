import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./components/fragments/loginForm";
import ProductList from "./pages/productList";
import ProductDetail from "./pages/productDetail";
import ProtectedRoute from "./protected/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} /> {/* Halaman login */}
        {/*
         jadi tiap children ini memiiliki proteksi agar 
        tidak dapat diakses jika tidak ada token didalam localstoragenya 
        */}
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/:id"
          element={
            <ProtectedRoute>
              <ProductDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
