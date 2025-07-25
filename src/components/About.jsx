import React, { useEffect } from "react";
import { X, Github, Linkedin, Settings, User } from "lucide-react";
import { motion } from "framer-motion";

// Removed direct imports for video and image assets to resolve resolution errors.
// Assets will be referenced directly via public paths.

const App = () => {
  // Smooth scrolling setup
  useEffect(() => {
    document.body.style.scrollBehavior = "smooth";
    return () => {
      document.body.style.scrollBehavior = "auto";
    };
  }, []);

  // Function to handle navigation to the home page
  const navigateToHome = (e) => {
    e.preventDefault(); // Prevent default link behavior
    window.location.href = "/"; // Redirect to the home page
  };

  return (
    // Main container with full background image and a dark overlay for content readability
    // Assumes about-bg.jpg is in the public/assets directory or directly accessible from root
    <div className="min-h-screen relative bg-[url('/assets/about-bg.jpg')] bg-cover bg-center font-satoshi antialiased">
      {/* Dark overlay for the entire background image */}
      <div className="absolute inset-0 bg-[url('https://i.pinimg.com/1200x/d9/44/ab/d944ab2d46564c0b557588629ee71c82.jpg')] bg-right-bottom bg-cover z-0"></div>

      {/* Content wrapper to ensure z-index above the background overlay */}
      <div className="relative z-10">
        {/* Navigation Bar */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between px-8 py-6 bg-[#0f0f0f]/90 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50"
        >
          <div className="flex items-center">
            <span className="text-3xl font-black text-white tracking-wider">
              About.US
            </span>
          </div>

          <div className=" flex items-center space-x-6 About-links">
            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: "#22c55e",
                boxShadow: "0 8px 16px rgba(34, 197, 94, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              className="visit-docs bg-green-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 text-base tracking-wide"
            >
              VISIT OUR DOCS
            </motion.button>

            <div className="flex items-center space-x-6">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <X
                  size={24}
                  className="text-gray-300 hover:text-white cursor-pointer transition-colors duration-300"
                />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github
                  size={24}
                  className="text-gray-300 hover:text-white cursor-pointer transition-colors duration-300"
                />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin
                  size={24}
                  className="text-gray-300 hover:text-white cursor-pointer transition-colors duration-300"
                />
              </a>
              <Settings
                size={24}
                className="text-gray-300 hover:text-white cursor-pointer transition-colors duration-300"
              />
              <User
                size={24}
                className="text-gray-300 hover:text-white cursor-pointer transition-colors duration-300"
              />
            </div>
          </div>
        </motion.nav>

        {/* Main Content */}
        <main className="about-main container mx-auto px-8 py-20 space-y-32">
          {/* Hero Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
          >
            <div className="About-heading flex flex-col space-y-8">
              <motion.h1
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.2,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-5xl md:text-6xl lg:text-7xl text-amber-100 leading-[1.1] tracking-tight"
              >
                Precision-Powered{" "}
                <span className="text-green-400">Innovation</span>
              </motion.h1>

              <motion.p
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.4,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-xl text-gray-300 leading-relaxed max-w-2xl tracking-wide"
              >
                We don’t crash — We calculate, adapt, and conquer. At 404
                Bots Not Found, we engineer intelligence into machines, transforming
                real-world problems into automated solutions. From
                self-balancing bots to military-grade gesture systems, our tech
                leads the way.
              </motion.p>

              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.6,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex space-x-6 pt-4 about-btns"
              >
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "#22c55e",
                    boxShadow: "0 8px 16px rgba(34, 197, 94, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-500 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 tracking-wide"
                >
                  Get Started
                </motion.button>
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    boxShadow: "0 8px 16px rgba(255, 255, 255, 0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent text-white font-bold py-4 px-8 rounded-full border-2 border-white/20 transition-all duration-300 tracking-wide"
                >
                  Explore Projects
                </motion.button>
              </motion.div>
            </div>

            {/* Right side box with new style (404 Bots Not Found) */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="banner relative w-full h-[32rem] bg-cover bg-center rounded-3xl flex flex-col items-center justify-center overflow-hidden shadow-2xl border border-white/10"
              style={{
                backgroundImage: `url('https://i.pinimg.com/736x/57/f9/07/57f9075487a4cef6fbfc114c67d78bc7.jpg')`,
              }} // Updated background image
              whileHover={{
                scale: 1.01,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
              }}
            >
              {/* Darker overlay to ensure text/elements on top are visible */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a]/70 to-[#0f0f0f]/70 rounded-3xl z-10"></div>

              {/* Content for the 404 box */}
              <div className="relative z-20 flex flex-col items-center justify-center h-full text-center p-8">
                <h2 className="text-8xl md:text-9xl font-black text-white opacity-20 tracking-tighter leading-none mb-4">
                  404
                </h2>
                <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent tracking-tight mb-8">
                  Bots Not Found!
                </h3>
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#f0f0f0" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-gray-900 font-bold py-4 px-10 rounded-full shadow-lg transition-all duration-300 tracking-wide"
                  onClick={navigateToHome} // Add click handler to redirect
                >
                  Back home
                </motion.button>
              </div>
            </motion.div>
          </motion.section>

          {/* Services Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start"
          >
            {/* Left side box with bg.jpg image and redirect functionality */}
            <a
              href="/"
              onClick={navigateToHome}
              className="block w-full h-full"
            >
              <motion.div
                whileHover={{
                  scale: 1.01,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
                }}
                transition={{ duration: 0.4 }}
                className="relative w-full h-[32rem] bg-cover bg-center rounded-3xl flex items-center justify-center overflow-hidden shadow-2xl border border-white/10"
                style={{ display: "none" }} // Use img directly here
              >
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10"></div>
                {/* Darker overlay for image */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a]/70 to-[#0f0f0f]/70 rounded-3xl"></div>
                {/* Abstract blurred shapes for visual interest */}
                <div className="absolute w-48 h-48 bg-green-500/20 rounded-full top-20 left-20 opacity-60 blur-3xl"></div>
                <div className="absolute w-64 h-64 bg-purple-500/20 rounded-full bottom-32 right-32 opacity-40 blur-[64px]"></div>
                <div className="absolute w-40 h-40 bg-blue-500/20 rounded-full -bottom-10 -left-10 opacity-70 blur-3xl"></div>
                <div className="absolute w-60 h-60 bg-amber-500/20 rounded-full -top-16 right-16 opacity-50 blur-3xl"></div>
              </motion.div>
            </a>

            <div className=" about-cards flex flex-col space-y-8">
              <motion.div
                initial={{ x: 40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.2,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                viewport={{ once: true }}
                className=" about1 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-3xl p-8 shadow-xl flex flex-col space-y-6 border border-white/10 hover:border-white/20 transition-all duration-500"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-3xl font-bold text-white tracking-tight">
                    Performance Analytics
                  </h3>
                  {/* Icons are removed from here as they were not in the reference image for these cards */}
                </div>
                <p className="about-txt text-lg text-gray-300 leading-relaxed tracking-wide">
                  We analyze every move with data to back decisions that matter.
                  Deep insights, real results — track, tweak, triumph.
                </p>
                <motion.button
                  whileHover={{
                    scale: 1.03,
                    backgroundColor: "rgba(34, 197, 94, 0.1)",
                    boxShadow: "0 4px 8px rgba(34, 197, 94, 0.2)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="self-start bg-transparent hover:bg-green-500/10 text-green-400 font-bold py-3 px-6 rounded-full border-2 border-green-400/30 transition-all duration-300 mt-2 tracking-wide"
                >
                  View Details
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ x: 40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.4,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-3xl p-8 shadow-xl flex flex-col space-y-6 border border-white/10 hover:border-white/20 transition-all duration-500"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-3xl font-bold text-white tracking-tight">
                    Emotional Intelligence
                  </h3>
                  {/* Icons are removed from here as they were not in the reference image for these cards */}
                </div>
                <p className="text-lg text-gray-300 leading-relaxed tracking-wide">
                  Designs and narratives that capture the attention of your
                  audience. From memes to momentum — we grow your digital
                  presence.
                </p>
                <motion.button
                  whileHover={{
                    scale: 1.03,
                    backgroundColor: "rgba(168, 85, 247, 0.1)",
                    boxShadow: "0 4px 8px rgba(168, 85, 247, 0.2)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="self-start bg-transparent hover:bg-purple-500/10 text-purple-400 font-bold py-3 px-6 rounded-full border-2 border-purple-400/30 transition-all duration-300 mt-2 tracking-wide"
                >
                  View Details
                </motion.button>
              </motion.div>
            </div>
          </motion.section>
        </main>

        {/* Footer with Social Links */}
        <footer className="border-t border-white/10 py-8">
          <div className="container mx-auto px-8 flex justify-between items-center">
            <span className="text-gray-400">
              © 2025 404-BNF. All rights reserved.
            </span>
            <div className="flex space-x-6">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <X size={20} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
