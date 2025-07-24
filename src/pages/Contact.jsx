import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: '...' }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(null); // Clear previous messages

    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setMessage({ type: 'error', text: 'All fields are required.' });
      return;
    }

    if (!validateEmail(formData.email)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

    // Simulate form submission
    console.log('Contact form submitted:', formData);
    setMessage({ type: 'success', text: 'Your message has been sent successfully!' });
    setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
    setTimeout(() => setMessage(null), 5000); // Clear message after 5 seconds
  };

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15, staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-[#0E1D21] font-inter text-[#ABAFB5] p-4 sm:p-8">
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

      <div className="max-w-5xl mx-auto bg-[#122E34] rounded-xl shadow-2xl shadow-[#0E1D21]/70 p-6 sm:p-10 border border-[#2E4A56]">
        <motion.h1 
          className="font-poppins text-3xl font-bold text-[#677E8A] text-center mb-8 text-shadow-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Contact Us
        </motion.h1>

        <AnimatePresence>
          {message && (
            <motion.div
              className={`p-3 rounded-md mb-6 flex justify-between items-center text-shadow-sm ${
                message.type === 'error' ? 'bg-red-600 bg-opacity-80' : 'bg-green-600 bg-opacity-80'
              } text-white`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <span>{message.text}</span>
              <button onClick={() => setMessage(null)} className="text-white ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Information Section */}
          <motion.div 
            className="flex flex-col space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2 
              className="font-poppins text-2xl font-semibold text-[#ABAFB5] mb-4 relative inline-block after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-16 after:h-1 after:bg-[#677E8A] after:rounded-full"
              variants={itemVariants}
            >
              Get in Touch
            </motion.h2>
            
            <motion.div className="flex items-center gap-4" variants={itemVariants}>
              <div className="p-3 bg-[#1C3B43] rounded-full text-[#677E8A] shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.93 1.93 0 0 1-2.06 0L2 7"/>
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[#ABAFB5]">Email Us</p>
                <p className="text-[#ABAFB5]">info@robomart.com</p>
              </div>
            </motion.div>

            <motion.div className="flex items-center gap-4" variants={itemVariants}>
              <div className="p-3 bg-[#1C3B43] rounded-full text-[#677E8A] shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2.05L16 22c-7.42 0-12.45-6-13.17-13.17A2 2 0 0 1 2 4V2.18a2 2 0 0 1 2.05-2.18h3a2 2 0 0 1 2 1.73l1 4a2 2 0 0 1-1.15 2.5L7.5 11.5a11 11 0 0 0 5 5l1.5-1.5a2 2 0 0 1 2.5-1.15l4 1A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[#ABAFB5]">Call Us</p>
                <p className="text-[#ABAFB5]">+1 (800) 762-6627</p>
              </div>
            </motion.div>

            <motion.div className="flex items-center gap-4" variants={itemVariants}>
              <div className="p-3 bg-[#1C3B43] rounded-full text-[#677E8A] shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[#ABAFB5]">Our Location</p>
                <p className="text-[#ABAFB5]">456 Tech Drive, Silicon Valley, CA 94043</p>
              </div>
            </motion.div>

            {/* Map Placeholder */}
            <motion.div 
              className="w-full h-48 bg-[#0E1D21] rounded-lg shadow-inner border border-[#2E4A56] flex items-center justify-center text-[#677E8A] text-lg"
              variants={itemVariants}
            >
              <p>Map Placeholder</p>
            </motion.div>

            {/* Social Media Links */}
            <motion.div className="flex space-x-4 mt-6" variants={itemVariants}>
              <motion.button 
                className="p-3 rounded-full bg-[#1C3B43] hover:bg-[#2E4A56] transition-colors duration-200 shadow-md"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#ABAFB5]">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </motion.button>
              <motion.button 
                className="p-3 rounded-full bg-[#1C3B43] hover:bg-[#2E4A56] transition-colors duration-200 shadow-md"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#ABAFB5]">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.7 5 4.9 9 5.1 0-.4.1-.8.1-1.2C12.1 5.6 15.2 2 18 2c2.1 0 3.6.7 4 2Z"/>
                </svg>
              </motion.button>
              <motion.button 
                className="p-3 rounded-full bg-[#1C3B43] hover:bg-[#2E4A56] transition-colors duration-200 shadow-md"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#ABAFB5]">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.5" y1="6.5" y2="6.5"/>
                </svg>
              </motion.button>
            </motion.div>

          </motion.div>

          {/* Contact Form Section */}
          <motion.div 
            className="flex flex-col space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2, ...containerVariants.transition }}
          >
            <motion.h2 
              className="font-poppins text-2xl font-semibold text-[#ABAFB5] mb-4 relative inline-block after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-16 after:h-1 after:bg-[#677E8A] after:rounded-full"
              variants={itemVariants}
            >
              Send Us a Message
            </motion.h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div variants={itemVariants}>
                <label htmlFor="name" className="block text-sm font-medium text-[#ABAFB5] mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 rounded-lg bg-[#0E1D21] border border-[#2E4A56] text-[#ABAFB5] placeholder-[#677E8A] focus:outline-none focus:ring-2 focus:ring-[#677E8A] transition-all duration-200"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block text-sm font-medium text-[#ABAFB5] mb-2">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 rounded-lg bg-[#0E1D21] border border-[#2E4A56] text-[#ABAFB5] placeholder-[#677E8A] focus:outline-none focus:ring-2 focus:ring-[#677E8A] transition-all duration-200"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <label htmlFor="subject" className="block text-sm font-medium text-[#ABAFB5] mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 rounded-lg bg-[#0E1D21] border border-[#2E4A56] text-[#ABAFB5] placeholder-[#677E8A] focus:outline-none focus:ring-2 focus:ring-[#677E8A] transition-all duration-200"
                  placeholder="Inquiry about product X"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <label htmlFor="message" className="block text-sm font-medium text-[#ABAFB5] mb-2">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg bg-[#0E1D21] border border-[#2E4A56] text-[#ABAFB5] placeholder-[#677E8A] focus:outline-none focus:ring-2 focus:ring-[#677E8A] transition-all duration-200 resize-y"
                  placeholder="Type your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </motion.div>
              <motion.button
                type="submit"
                className="w-full bg-[#677E8A] text-white font-bold py-3 rounded-lg shadow-md shadow-[#677E8A]/30 hover:bg-[#5A6F7B] transition-all duration-300 transform hover:scale-105 animate-pulse-glow"
                whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(103, 126, 138, 0.9)' }}
                whileTap={{ scale: 0.98 }}
                variants={itemVariants}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
