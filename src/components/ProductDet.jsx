import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products";
import { FaStar, FaArrowLeft } from "react-icons/fa";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
        <div className="text-center text-gray-600">
          <h2 className="text-3xl font-bold mb-4">Product Not Found</h2>
          <button
            onClick={() => navigate("/e-com")}
            className="text-indigo-600 hover:underline mt-4 block text-lg"
          >
            ← Go back to product list
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-50 to-slate-200 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto glass border border-gray-200 rounded-3xl shadow-2xl overflow-hidden md:flex backdrop-blur-xl bg-white/30">
        
        {/* Product Image */}
        <div className="md:flex-shrink-0 w-full md:w-1/2 overflow-hidden">
          <img
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            src={product.imageUrl}
            alt={product.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/400x300/E0F2F7/000000?text=Image+Error";
            }}
          />
        </div>

        {/* Product Info */}
        <div className="p-8 w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <div className="uppercase tracking-widest text-sm text-indigo-700 font-bold">
              {product.category}
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 mt-2">{product.name}</h1>
            <p className="mt-4 text-gray-700 leading-relaxed text-md">{product.description}</p>

            <div className="mt-4 flex items-center space-x-3">
              <span className="text-xl font-bold text-indigo-700">₹{product.price.toFixed(2)}</span>
              <span className="text-sm text-gray-500">Stock: {product.stock}</span>
            </div>

            {/* Rating */}
            <div className="mt-3 flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  className={`mr-1 text-xl ${
                    i < product.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-gray-700 font-medium">{product.rating} / 5</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-8">
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-md transform hover:scale-105 transition duration-300">
              🛒 Add to Cart
            </button>

            <button
              onClick={() => navigate("/e-com")}
              className="mt-4 flex items-center justify-center text-indigo-600 hover:underline text-sm"
            >
              <FaArrowLeft className="mr-2" /> Back to all products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
