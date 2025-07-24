import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // For animations and exit animations

// Placeholder product data (updated to drone products)
const products = [
  {
    id: 1,
    name: "Drone Frame 450mm",
    category: "Frames",
    description: "Lightweight and durable frame suitable for quadcopters.",
    price: 1299,
    imageUrl: "https://source.unsplash.com/600x400/?drone-frame",
    stock: 24,
    rating: 4.5
  },
  {
    id: 2,
    name: "Brushless Motor 1000KV",
    category: "Motors",
    description: "High-performance 1000KV motor for smooth lift.",
    price: 699,
    imageUrl: "https://source.unsplash.com/600x400/?brushless-motor",
    stock: 40,
    rating: 4.7
  },
  {
    id: 3,
    name: "ESC 30A BLHeli",
    category: "ESC",
    description: "30A Electronic Speed Controller compatible with BLDC motors.",
    price: 499,
    imageUrl: "https://source.unsplash.com/600x400/?esc",
    stock: 50,
    rating: 4.4
  },
  {
    id: 4,
    name: "LiPo Battery 3S 2200mAh",
    category: "Batteries",
    description: "High-capacity battery for longer drone flights.",
    price: 1099,
    imageUrl: "https://source.unsplash.com/600x400/?lipo-battery",
    stock: 35,
    rating: 4.6
  },
  {
    id: 5,
    name: "Flight Controller - KK2.1.5",
    category: "Controllers",
    description: "Popular flight controller for beginner drone makers.",
    price: 999,
    imageUrl: "https://source.unsplash.com/600x400/?flight-controller",
    stock: 20,
    rating: 4.3
  },
  {
    id: 6,
    name: "APM 2.8 Flight Controller",
    category: "Controllers",
    description: "Advanced flight controller with GPS support.",
    price: 1999,
    imageUrl: "https://source.unsplash.com/600x400/?apm-drone",
    stock: 15,
    rating: 4.6
  },
  {
    id: 7,
    name: "GPS Module Ublox NEO-6M",
    category: "Modules",
    description: "Accurate GPS for navigation and waypoint control.",
    price: 849,
    imageUrl: "https://source.unsplash.com/600x400/?gps-module",
    stock: 18,
    rating: 4.5
  },
  {
    id: 8,
    name: "Drone Propeller Set 1045",
    category: "Propellers",
    description: "Balanced propellers for stable flight.",
    price: 199,
    imageUrl: "https://source.unsplash.com/600x400/?drone-propeller",
    stock: 70,
    rating: 4.4
  },
  {
    id: 9,
    name: "Radio Transmitter & Receiver 6CH",
    category: "Transmitters",
    description: "2.4GHz 6-Channel remote control system.",
    price: 2599,
    imageUrl: "https://source.unsplash.com/600x400/?drone-controller",
    stock: 10,
    rating: 4.7
  },
  {
    id: 10,
    name: "Battery Charger B3",
    category: "Chargers",
    description: "LiPo charger compatible with 2S and 3S batteries.",
    price: 599,
    imageUrl: "https://source.unsplash.com/600x400/?battery-charger",
    stock: 30,
    rating: 4.2
  },
  {
    id: 11,
    name: "Power Distribution Board (PDB)",
    category: "Power Systems",
    description: "Distributes power from battery to ESCs and FC.",
    price: 249,
    imageUrl: "https://source.unsplash.com/600x400/?pdb-drone",
    stock: 45,
    rating: 4.4
  },
  {
    id: 12,
    name: "Drone Landing Gear",
    category: "Accessories",
    description: "Shock-absorbing landing gear for soft landings.",
    price: 299,
    imageUrl: "https://source.unsplash.com/600x400/?drone-landing-gear",
    stock: 60,
    rating: 4.3
  },
  {
    id: 13,
    name: "XT60 Connectors (Pair)",
    category: "Connectors",
    description: "Standard power connectors for drones.",
    price: 99,
    imageUrl: "https://source.unsplash.com/600x400/?xt60-connector",
    stock: 100,
    rating: 4.5
  },
  {
    id: 14,
    name: "Drone Vibration Dampening Mount",
    category: "Accessories",
    description: "Reduces vibrations for smoother camera footage.",
    price: 349,
    imageUrl: "https://source.unsplash.com/600x400/?vibration-damping",
    stock: 25,
    rating: 4.1
  },
  {
    id: 15,
    name: "Telemetry Module 915MHz",
    category: "Communication",
    description: "Real-time flight data transmission to ground station.",
    price: 1299,
    imageUrl: "https://source.unsplash.com/600x400/?telemetry-module",
    stock: 12,
    rating: 4.5
  },
  {
    id: 16,
    name: "FPV Camera 700TVL",
    category: "Cameras",
    description: "Lightweight analog camera for real-time video feed.",
    price: 799,
    imageUrl: "https://source.unsplash.com/600x400/?fpv-camera",
    stock: 22,
    rating: 4.3
  },
  {
    id: 17,
    name: "5.8GHz FPV Transmitter",
    category: "Transmitters",
    description: "Video transmitter for FPV setups.",
    price: 899,
    imageUrl: "https://source.unsplash.com/600x400/?fpv-transmitter",
    stock: 18,
    rating: 4.4
  },
  {
    id: 18,
    name: "5.8GHz FPV Goggles",
    category: "Goggles",
    description: "Immersive flying experience with built-in receiver.",
    price: 3799,
    imageUrl: "https://source.unsplash.com/600x400/?fpv-goggles",
    stock: 8,
    rating: 4.6
  },
  {
    id: 19,
    name: "Drone Arm Replacement Set",
    category: "Frames",
    description: "Spare arms for 450mm quadcopter frame.",
    price: 349,
    imageUrl: "https://source.unsplash.com/600x400/?drone-arm",
    stock: 38,
    rating: 4.2
  },
  {
    id: 20,
    name: "Drone Propeller Guards",
    category: "Safety",
    description: "Protects propellers and surroundings during flight.",
    price: 249,
    imageUrl: "https://source.unsplash.com/600x400/?propeller-guard",
    stock: 32,
    rating: 4.4
  },
  {
    id: 21,
    name: "Drone Build Kit (Starter Pack)",
    category: "Kits",
    description: "All-in-one kit to start building your own drone.",
    price: 5999,
    imageUrl: "https://source.unsplash.com/600x400/?drone-kit",
    stock: 10,
    rating: 4.8
  }
];

// Animation variants for product cards
const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  hover: { scale: 1.03, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)" },
};

// ProductDetail component definition (no longer needed for direct routing, but kept as a placeholder)
const ProductDetail = ({ product, onBackToList }) => {
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-gray-600">
          <h2 className="text-2xl font-bold mb-4">Product Details</h2>
          <p>Please select a product from the list.</p>
          <button
            onClick={onBackToList}
            className="text-indigo-600 hover:underline mt-4 block"
          >
            Go back to product list
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-64 w-full object-cover md:w-64"
            src={product.imageUrl}
            alt={product.name}
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x300/E0F2F7/000000?text=Image+Error"; }}
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold">
            {product.category}
          </div>
          <h1 className="block mt-1 text-3xl leading-tight font-extrabold text-gray-900">
            {product.name}
          </h1>
          <p className="mt-2 text-gray-600">{product.description}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-3xl font-extrabold text-indigo-700">
              {product.price.toFixed(2)}
            </span>
            <span className="text-gray-500 text-sm">
              Stock: {product.stock}
            </span>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-yellow-500 mr-1">★</span>
            <span className="text-gray-700 font-medium">{product.rating} / 5</span>
          </div>
          <div className="mt-6">
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-full text-lg font-semibold
                               hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105">
              Add to Cart
            </button>
          </div>
          <div className="mt-8">
            <button
              onClick={onBackToList}
              className="text-indigo-600 hover:underline text-sm"
            >
              ← Back to all products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


const ProductListPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showDropdown, setShowDropdown] = useState(false); // State for dropdown visibility
  const [selectedProduct, setSelectedProduct] = useState(null); // State for detail view

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowDropdown(false); // Close dropdown after selection
    setSelectedProduct(null); // Clear selected product when category changes
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleBackToList = () => {
    setSelectedProduct(null); // Clear selected product to go back to list view
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-sm py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-gray-900">Our Products</h1>
          {/* Filter Dropdown Button */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="bg-indigo-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md
                         transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
              </svg>
              <span>{selectedCategory === "All" ? "Filter by Category" : selectedCategory}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ml-2 transition-transform duration-200 ${showDropdown ? 'rotate-180' : 'rotate-0'}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 overflow-auto max-h-60" // Added overflow-auto and max-height
                >
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategorySelect(category)}
                      className={`block w-full text-left px-4 py-2 text-sm leading-5 text-gray-700
                        ${selectedCategory === category ? "bg-indigo-50 text-indigo-700" : "hover:bg-gray-100"}
                        focus:outline-none focus:bg-gray-100 transition-colors duration-150`}
                    >
                      {category}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Main Content - Product Grid or Detail View */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {selectedProduct ? (
          <ProductDetail product={selectedProduct} onBackToList={handleBackToList} />
        ) : filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-10 text-gray-500"
          >
            <p className="text-lg">No products found in this category.</p>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1, // Stagger animation for each child card
                },
              },
            }}
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={cardVariants}
                whileHover="hover"
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 ease-in-out
                           hover:shadow-xl hover:scale-[1.01] border border-transparent hover:border-indigo-200 cursor-pointer"
                onClick={() => handleProductClick(product)} // Handle click for detail view
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover object-center rounded-t-xl"
                  onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x300/E0F2F7/000000?text=Image+Error"; }}
                />
                <div className="p-6">
                  <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-2 block">
                    {product.category}
                  </span>
                  <h2 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                    {product.name}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-2xl font-extrabold text-indigo-700">
                      {product.price.toFixed(2)}
                    </span>
                    <button className="bg-indigo-500 text-white px-4 py-2 rounded-full text-sm font-semibold
                                       hover:bg-indigo-600 transition-colors duration-300 transform hover:scale-105">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto text-center text-sm">
          &copy; {new Date().getFullYear()} ProductList. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

// Main App component that renders ProductListPage directly
const App = () => {
  return <ProductListPage />;
};

export default App;
