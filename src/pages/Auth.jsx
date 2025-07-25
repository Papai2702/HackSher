import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Main App component
const App = () => {
  // State to manage whether the form is in login or signup mode
  const [isLogin, setIsLogin] = useState(true);
  // State to store form data (email, password, confirmPassword)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  // State to store validation errors
  const [errors, setErrors] = useState({});
  // State to indicate if the form is currently submitting
  const [isSubmitting, setIsSubmitting] = useState(false);
  // State to display success or error messages
  const [message, setMessage] = useState('');
  // State to control the visibility of the custom message box
  const [showMessageBox, setShowMessageBox] = useState(false);
  // State to control password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /**
   * Validates the form fields based on the current mode (login/signup).
   * @returns {boolean} True if all fields are valid, false otherwise.
   */
  const validate = () => {
    const newErrors = {};
    // Clear previous messages
    setMessage('');
    setShowMessageBox(false);

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation (only for signup mode)
    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles form submission.
   * @param {Event} e The submit event.
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (validate()) { // If validation passes
      setIsSubmitting(true); // Set submitting state to true
      // Simulate an API call with a timeout
      setTimeout(() => {
        setIsSubmitting(false); // Reset submitting state
        // Display a success message based on the mode
        const successMessage = isLogin ? 'Login successful!' : 'Account created successfully!';
        setMessage(successMessage);
        setShowMessageBox(true);
        // Clear form data after successful submission
        setFormData({
          email: '',
          password: '',
          confirmPassword: ''
        });
        setErrors({}); // Clear any lingering errors
      }, 1500); // Simulate 1.5 seconds delay
    } else {
      // If validation fails, display an error message
      setMessage('Please correct the errors in the form.');
      setShowMessageBox(true);
    }
  };

  /**
   * Handles changes in form input fields.
   * @param {Event} e The change event.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the formData state with the new value
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for the changed field as user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    // Clear message box when user starts typing
    setMessage('');
    setShowMessageBox(false);
  };

  /**
   * Toggles between login and signup modes.
   * Resets form data, errors, and messages when switching modes.
   */
  const toggleAuthMode = () => {
    setIsLogin(prev => !prev); // Toggle the isLogin state
    setFormData({ // Reset form data
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({}); // Clear errors
    setMessage(''); // Clear messages
    setShowMessageBox(false);
  };

  return (
    // Main container for the authentication page, centered with dark background
    // Added full-screen background image and cover properties
    <div
      className="min-h-screen flex items-center justify-center p-4 font-sans bg-cover bg-center"
      style={{ backgroundImage: 'url("https://i.pinimg.com/736x/23/80/9a/23809ab25057f96d89d045d7c51db92c.jpg")' }}
    >
      {/* Motion.div for entry animation - removed glassmorphism classes from here */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} // Initial animation state
        animate={{ opacity: 1, y: 0 }}   // Animation to
        transition={{ duration: 0.5 }}   // Animation duration
        className="w-full max-w-4xl flex flex-col md:flex-row rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Left side: Authentication Form - added glassmorphism classes here */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-gray-800 bg-opacity-30 backdrop-filter backdrop-blur-lg border border-gray-700 rounded-l-2xl">
          {/* Toggle buttons for Sign In / Sign Up */}
          <div className="flex border-b border-gray-700 mb-8">
            <button
              className={`flex-1 py-4 font-medium rounded-tl-lg ${isLogin ? 'text-white bg-indigo-600' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setIsLogin(true)}
            >
              Sign In
            </button>
            <button
              className={`flex-1 py-4 font-medium rounded-tr-lg ${!isLogin ? 'text-white bg-indigo-600' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          {/* Header text */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              {isLogin ? 'Welcome back' : 'Create an account'}
            </h2>
            <p className="text-gray-300">
              {isLogin ? 'Sign in to continue' : 'Get started with us today'}
            </p>
          </div>

          {/* Custom Message Box */}
          {showMessageBox && message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-4 p-3 rounded-lg text-sm ${
                message.includes('successful') || message.includes('created')
                  ? 'bg-green-600 text-white'
                  : 'bg-red-600 text-white'
              }`}
            >
              {message}
            </motion.div>
          )}

          {/* Authentication Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
                Your email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-gray-700 bg-opacity-50 border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200`}
                placeholder="charles@comet.co"
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby="email-error"
              />
              {errors.email && <p id="email-error" className="mt-1 text-sm text-red-400">{errors.email}</p>}
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                  Password
                </label>
                {isLogin && (
                  <button type="button" className="text-sm text-indigo-400 hover:text-indigo-300 focus:outline-none focus:underline">
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} // Toggle type based on showPassword state
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-700 bg-opacity-50 border ${errors.password ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200`}
                  placeholder="••••••••"
                  aria-invalid={errors.password ? "true" : "false"}
                  aria-describedby="password-error"
                />
                <span
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(prev => !prev)} // Toggle password visibility
                >
                  {/* Eye icon for password visibility toggle */}
                  {showPassword ? (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 .986-3.13 3.03-5.833 5.712-7.777M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.05 4.875A10.05 10.05 0 0112 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-1.745 0-3.415-.357-4.938-.992M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </span>
              </div>
              {errors.password && <p id="password-error" className="mt-1 text-sm text-red-400">{errors.password}</p>}
            </div>

            {/* Confirm Password Input (only for signup mode) */}
            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"} // Toggle type based on showConfirmPassword state
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-700 bg-opacity-50 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200`}
                    placeholder="••••••••"
                    aria-invalid={errors.confirmPassword ? "true" : "false"}
                    aria-describedby="confirm-password-error"
                  />
                  <span
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer"
                    onClick={() => setShowConfirmPassword(prev => !prev)} // Toggle confirm password visibility
                  >
                    {showConfirmPassword ? (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 .986-3.13 3.03-5.833 5.712-7.777M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.05 4.875A10.05 10.05 0 0112 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-1.745 0-3.415-.357-4.938-.992M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </span>
                </div>
                {errors.confirmPassword && <p id="confirm-password-error" className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>}
              </div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }} // Scale up slightly on hover
              whileTap={{ scale: 0.98 }}   // Scale down slightly on tap
              disabled={isSubmitting}       // Disable button during submission
              className={`w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-200 shadow-md ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  {/* Loading spinner SVG */}
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                isLogin ? 'Sign In' : 'Sign Up' // Button text changes based on mode
              )}
            </motion.button>
          </form>

          {/* Toggle text for Login/Signup */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-300">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button" // Use type="button" to prevent form submission
                onClick={toggleAuthMode}
                className="text-indigo-400 hover:text-indigo-300 font-medium focus:outline-none focus:underline"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>

        {/* Right side: Visual Element */}
        {/* Changed background to bg-gray-900 to ensure it's not blurred */}
        <div className="md:w-1/2 bg-gray-900 flex items-center justify-center rounded-r-2xl relative overflow-hidden">
          {/* Image from the provided URL */}
          <img
            src="https://i.pinimg.com/736x/ef/cb/cb/efcbcbf125b470db039e0132d0fa4643.jpg"
            alt="Abstract visual"
            className="w-full h-full object-cover"
            // Fallback for image loading error
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/736x736/374151/FFFFFF?text=Image+Not+Found";
            }}
          />
          {/* Removed Comet.co text overlay */}
        </div>
      </motion.div>
    </div>
  );
};

export default App;
