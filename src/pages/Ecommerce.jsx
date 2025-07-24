// pages/Ecommerce.js
import React from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import ProductList from "../components/ProductList"; // We'll create this
import ProductDetail from "../components/ProductDet"; // We'll create this

const Ecommerce = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  );
};

export default Ecommerce;