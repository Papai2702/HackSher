import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Import motion and AnimatePresence

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleAuth = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // This is a UI simulation. In a real app, you'd integrate with Clerk.js here.
    if (isLogin) {
      console.log('Attempting to log in with:', { email, password });
      setSuccessMessage('Login simulated successfully!');
      // Simulate API call delay
      setTimeout(() => {
        // In a real app, you'd handle successful login (e.g., redirect)
        // console.log("Login successful, redirecting...");
      }, 1500);
    } else {
      console.log('Attempting to sign up with:', { email, password });
      setSuccessMessage('Signup simulated successfully! Please log in.');
      // Simulate API call delay
      setTimeout(() => {
        setIsLogin(true); // After signup, switch to login form
      }, 1500);
    }
  };

  // Animation variants for form elements
  const containerVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15, staggerChildren: 0.1 } },
    exit: { opacity: 0, y: -50, scale: 0.95, transition: { duration: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0E1D21] p-4 font-inter overflow-hidden">
      {/* Tailwind CSS Script */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Google Fonts - Poppins and Inter */}
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Custom CSS for animations and styling */}
      <style>
        {`
        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        .text-shadow-sm {
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }
        .text-shadow-md {
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
        }
        .animate-pulse-glow {
          animation: pulseGlow 2s infinite alternate;
        }
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 5px rgba(103, 126, 138, 0.4); }
          100% { box-shadow: 0 0 15px rgba(103, 126, 138, 0.8); }
        }
        /* Custom Scrollbar Styles */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #122E34; /* Darker track for dark theme */
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
          background: #677E8A; /* Accent color for scrollbar */
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #5A6F7B; /* Darker accent for scrollbar hover */
        }
        `}
      </style>

      {/* Background Grid/Pattern SVG */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.5" fill="#1C3B43" />
            <path d="M0 20 L40 20 M20 0 L20 40" stroke="#1C3B43" strokeWidth="0.5" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={isLogin ? "login" : "signup"} // Key for AnimatePresence to detect component change
          className="relative z-10 bg-[#122E34] rounded-xl shadow-2xl shadow-[#0E1D21]/70 p-8 sm:p-10 w-full max-w-md border border-[#2E4A56]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.h2
            className="font-poppins text-3xl font-bold text-[#677E8A] text-center mb-6 text-shadow-md"
            variants={itemVariants}
          >
            {isLogin ? 'Welcome Back' : 'Join RoboMart'}
          </motion.h2>

          <AnimatePresence>
            {error && (
              <motion.div
                className="bg-red-600 bg-opacity-80 text-white text-sm p-3 rounded-md mb-4 flex justify-between items-center text-shadow-sm"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <span>{error}</span>
                <button onClick={() => setError('')} className="text-white ml-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                  </svg>
                </button>
              </motion.div>
            )}
            {successMessage && (
              <motion.div
                className="bg-green-600 bg-opacity-80 text-white text-sm p-3 rounded-md mb-4 flex justify-between items-center text-shadow-sm"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <span>{successMessage}</span>
                <button onClick={() => setSuccessMessage('')} className="text-white ml-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                  </svg>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleAuth} className="space-y-6">
            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="block text-sm font-medium text-[#ABAFB5] mb-2">Email Address</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 rounded-lg bg-[#0E1D21] border border-[#2E4A56] text-[#ABAFB5] placeholder-[#677E8A] focus:outline-none focus:ring-2 focus:ring-[#677E8A] transition-all duration-200"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </motion.div>
            <motion.div variants={itemVariants} className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-[#ABAFB5] mb-2">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full px-4 py-3 rounded-lg bg-[#0E1D21] border border-[#2E4A56] text-[#ABAFB5] placeholder-[#677E8A] focus:outline-none focus:ring-2 focus:ring-[#677E8A] transition-all duration-200 pr-10"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#677E8A] hover:text-[#5A6F7B] transition-colors duration-200"
                style={{ top: '50%', transform: 'translateY(-50%)' }} // Adjust button position
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>
                  </svg>
                )}
              </button>
            </motion.div>
            {!isLogin && (
              <motion.div variants={itemVariants} className="relative">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#ABAFB5] mb-2">Confirm Password</label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  className="w-full px-4 py-3 rounded-lg bg-[#0E1D21] border border-[#2E4A56] text-[#ABAFB5] placeholder-[#677E8A] focus:outline-none focus:ring-2 focus:ring-[#677E8A] transition-all duration-200 pr-10"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#677E8A] hover:text-[#5A6F7B] transition-colors duration-200"
                  style={{ top: '50%', transform: 'translateY(-50%)' }}
                >
                  {showConfirmPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>
                    </svg>
                  )}
                </button>
              </motion.div>
            )}

            <motion.button
              type="submit"
              className="w-full bg-[#677E8A] text-white font-bold py-3 rounded-lg shadow-md shadow-[#677E8A]/30 hover:bg-[#5A6F7B] transition-all duration-300 transform hover:scale-105 animate-pulse-glow"
              whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(103, 126, 138, 0.9)' }}
              whileTap={{ scale: 0.98 }}
              variants={itemVariants}
            >
              {isLogin ? 'Log In' : 'Sign Up'}
            </motion.button>
          </form>

          <motion.div className="mt-6 text-center text-sm text-[#ABAFB5]" variants={itemVariants}>
            {isLogin ? (
              <>
                Don't have an account?{' '}
                <motion.button
                  onClick={() => setIsLogin(false)}
                  className="text-[#677E8A] font-semibold hover:underline transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign Up
                </motion.button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <motion.button
                  onClick={() => setIsLogin(true)}
                  className="text-[#677E8A] font-semibold hover:underline transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Log In
                </motion.button>
              </>
            )}
          </motion.div>

          <motion.div className="mt-8 text-center" variants={itemVariants}>
            <p className="text-sm text-[#ABAFB5] mb-4">Or continue with</p>
            <div className="flex justify-center space-x-4">
              <motion.button
                className="p-3 rounded-full bg-[#1C3B43] hover:bg-[#2E4A56] transition-colors duration-200 shadow-md"
                whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(103, 126, 138, 0.5)' }}
                whileTap={{ scale: 0.9 }}
              >
                {/* Google Icon SVG */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.0003 4.75C14.0503 4.75 15.8303 5.44 17.2403 6.72L19.9903 3.97C17.8403 1.95 15.0303 0.75 12.0003 0.75C7.57031 0.75 3.73031 3.44 1.99031 7.15L5.60031 9.92C6.46031 7.24 9.00031 4.75 12.0003 4.75Z" fill="#ABAFB5"/>
                  <path d="M22.25 12.0003C22.25 11.3803 22.19 10.7803 22.09 10.1903H12.25V13.8103H18.11C17.89 14.9903 17.29 15.9903 16.42 16.6603L20.03 19.4203C21.36 18.2103 22.25 16.2003 22.25 12.0003Z" fill="#ABAFB5"/>
                  <path d="M5.60031 14.0803C5.35031 13.4603 5.21031 12.7403 5.21031 12.0003C5.21031 11.2603 5.35031 10.5403 5.60031 9.92031L1.99031 7.15031C1.35031 8.44031 1.00031 10.1103 1.00031 12.0003C1.00031 13.8903 1.35031 15.5603 1.99031 16.8503L5.60031 14.0803Z" fill="#ABAFB5"/>
                  <path d="M12.0003 19.25C8.94031 19.25 6.39031 17.29 5.60031 14.61L1.99031 17.38C3.73031 21.09 7.57031 23.75 12.0003 23.75C15.0303 23.75 17.8403 22.55 19.9903 20.53L17.2403 17.78C15.8303 19.06 14.0503 19.75 12.0003 19.75V19.25Z" fill="#ABAFB5"/>
                </svg>
              </motion.button>
              <motion.button
                className="p-3 rounded-full bg-[#1C3B43] hover:bg-[#2E4A56] transition-colors duration-200 shadow-md"
                whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(103, 126, 138, 0.5)' }}
                whileTap={{ scale: 0.9 }}
              >
                {/* GitHub Icon SVG */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0.75C5.75 0.75 0.75 5.75 0.75 12C0.75 17.06 4.09 21.31 8.25 22.75C8.81 22.84 9 22.5 9 22.25C9 22.06 9 21.56 9 20.75C6.5 21.25 5.81 20.25 5.56 19.75C5.44 19.44 4.94 18.5 4.5 18.25C4.06 17.94 3.5 17.69 4.5 17.62C5.31 17.56 5.81 18.25 6.06 18.69C6.94 20.12 8.31 20.56 9.19 20.31C9.25 19.69 9.5 19.25 9.75 19C7.75 18.75 5.62 18 5.62 14.5C5.62 13.5 6 12.69 6.62 12C6.5 11.75 6.19 10.94 6.69 9.75C6.69 9.75 7.44 9.5 9 10.5C9.69 10.31 10.5 10.19 11.25 10.19C12 10.19 12.81 10.31 13.5 10.5C15.06 9.5 15.81 9.75 15.81 9.75C16.31 10.94 16 11.75 15.88 12C16.5 12.69 16.88 13.5 16.88 14.5C16.88 18 14.75 18.75 12.75 19C12.94 19.19 13.12 19.5 13.12 20C13.12 21.5 13.12 22.19 13.12 22.25C13.12 22.5 13.31 22.84 13.88 22.75C17.94 21.31 21.25 17.06 21.25 12C21.25 5.75 16.25 0.75 12 0.75Z" fill="#ABAFB5"/>
                </svg>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AuthPage;
