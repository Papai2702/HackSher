import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProfilePage = () => {
  // Dummy user data
  const [user, setUser] = useState({
    name: 'Robo Enthusiast',
    email: 'robo.enthusiast@example.com',
    memberSince: 'January 2023',
    avatar: 'https://placehold.co/100x100/677E8A/FFFFFF?text=RE', // Placeholder for user avatar
    orders: [
      { id: 'ORD001', date: '2024-07-10', total: 899.99, status: 'Delivered', items: 'Autonomous Drone X1' },
      { id: 'ORD002', date: '2024-06-25', total: 120.50, status: 'Shipped', items: 'Precision Force Sensor Pack' },
      { id: 'ORD003', date: '2024-05-15', total: 35.00, status: 'Delivered', items: 'Microcontroller Dev Board' },
    ],
    savedItems: [
      { id: 'SAV001', name: 'Industrial Robotic Arm 7-Axis', price: 2500.00, imageUrl: 'https://images.unsplash.com/photo-1526738593504-2b724f114674?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      { id: 'SAV002', name: 'AI Vision Kit Pro', price: 499.00, imageUrl: 'https://images.unsplash.com/photo-1610563166150-b34df4f3db50?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    ],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);
  const [message, setMessage] = useState(''); // For success/error messages

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setMessage(''); // Clear any previous messages
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!editName.trim() || !editEmail.trim()) {
      setMessage({ type: 'error', text: 'Name and email cannot be empty.' });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editEmail)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

    setUser(prev => ({ ...prev, name: editName, email: editEmail }));
    setIsEditing(false);
    setMessage({ type: 'success', text: 'Profile updated successfully!' });
    setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
  };

  const handleLogout = () => {
    // Simulate logout
    setMessage({ type: 'success', text: 'Logged out successfully!' });
    console.log('User logged out.');
    // In a real app, you'd clear auth tokens and redirect to login page
  };

  // Framer Motion Variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
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

      <div className="max-w-4xl mx-auto bg-[#122E34] rounded-xl shadow-2xl shadow-[#0E1D21]/70 p-6 sm:p-10 border border-[#2E4A56]">
        <h1 className="font-poppins text-3xl font-bold text-[#677E8A] text-center mb-8 text-shadow-md">
          My Profile
        </h1>

        <AnimatePresence>
          {message.text && (
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
              <button onClick={() => setMessage('')} className="text-white ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Profile Header Section */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10 pb-8 border-b border-[#2E4A56]"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <motion.img 
            src={user.avatar} 
            alt="User Avatar" 
            className="w-24 h-24 rounded-full object-cover border-4 border-[#677E8A] shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          />
          <div className="text-center sm:text-left flex-grow">
            <h2 className="font-poppins text-2xl font-semibold text-[#ABAFB5] mb-1">{user.name}</h2>
            <p className="text-[#677E8A] text-md mb-1">{user.email}</p>
            <p className="text-[#2E4A56] text-sm">Member since: {user.memberSince}</p>
            <motion.button
              onClick={handleEditToggle}
              className="mt-4 bg-[#677E8A] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#5A6F7B] transition-colors duration-200 shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isEditing ? 'Cancel Edit' : 'Edit Profile'}
            </motion.button>
          </div>
        </motion.div>

        {/* Edit Profile Form */}
        <AnimatePresence>
          {isEditing && (
            <motion.div
              className="mb-10 p-6 bg-[#1C3B43] rounded-lg shadow-inner border border-[#2E4A56]"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <h3 className="font-poppins text-xl font-semibold text-[#ABAFB5] mb-4">Edit Details</h3>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label htmlFor="editName" className="block text-sm font-medium text-[#ABAFB5] mb-2">Name</label>
                  <input
                    type="text"
                    id="editName"
                    className="w-full px-4 py-2 rounded-lg bg-[#0E1D21] border border-[#2E4A56] text-[#ABAFB5] focus:outline-none focus:ring-2 focus:ring-[#677E8A]"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="editEmail" className="block text-sm font-medium text-[#ABAFB5] mb-2">Email</label>
                  <input
                    type="email"
                    id="editEmail"
                    className="w-full px-4 py-2 rounded-lg bg-[#0E1D21] border border-[#2E4A56] text-[#ABAFB5] focus:outline-none focus:ring-2 focus:ring-[#677E8A]"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                  />
                </div>
                <motion.button
                  type="submit"
                  className="bg-[#677E8A] text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#5A6F7B] transition-colors duration-200 shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Save Changes
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Order History Section */}
        <motion.div 
          className="mb-10"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={{ delay: 0.2, ...sectionVariants.transition }}
        >
          <h3 className="font-poppins text-2xl font-semibold text-[#ABAFB5] mb-6 relative inline-block after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-16 after:h-1 after:bg-[#677E8A] after:rounded-full">
            Order History
          </h3>
          {user.orders.length > 0 ? (
            <div className="space-y-4">
              {user.orders.map((order) => (
                <motion.div 
                  key={order.id} 
                  className="bg-[#1C3B43] p-5 rounded-lg border border-[#2E4A56] flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-sm"
                  variants={itemVariants}
                >
                  <div>
                    <p className="font-semibold text-[#ABAFB5] text-lg">Order ID: {order.id}</p>
                    <p className="text-sm text-[#677E8A]">Date: {order.date}</p>
                    <p className="text-sm text-[#ABAFB5] mt-1">Items: {order.items}</p>
                  </div>
                  <div className="mt-3 sm:mt-0 text-left sm:text-right">
                    <p className="font-bold text-[#ABAFB5] text-xl">${order.total.toFixed(2)}</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1 ${
                      order.status === 'Delivered' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-gray-900'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-[#2E4A56]">No orders found.</p>
          )}
        </motion.div>

        {/* Saved Items Section */}
        <motion.div 
          className="mb-10"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={{ delay: 0.4, ...sectionVariants.transition }}
        >
          <h3 className="font-poppins text-2xl font-semibold text-[#ABAFB5] mb-6 relative inline-block after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-16 after:h-1 after:bg-[#677E8A] after:rounded-full">
            Saved Items
          </h3>
          {user.savedItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.savedItems.map((item) => (
                <motion.div 
                  key={item.id} 
                  className="bg-[#1C3B43] p-4 rounded-lg border border-[#2E4A56] flex items-center gap-4 shadow-sm"
                  variants={itemVariants}
                >
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-16 h-16 object-cover rounded-md" 
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/64x64/333333/9CA3AF?text=Item`; }}
                  />
                  <div>
                    <p className="font-semibold text-[#ABAFB5]">{item.name}</p>
                    <p className="text-[#677E8A]">${item.price.toFixed(2)}</p>
                  </div>
                  <motion.button 
                    className="ml-auto text-red-400 hover:text-red-500 transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                    </svg>
                  </motion.button>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-[#2E4A56]">No saved items.</p>
          )}
        </motion.div>

        {/* Settings and Logout */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-[#2E4A56]"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={{ delay: 0.6, ...sectionVariants.transition }}
        >
          <motion.button
            className="bg-[#1C3B43] text-[#ABAFB5] px-6 py-3 rounded-lg shadow-md hover:bg-[#2E4A56] transition-colors duration-200 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2.73l-.15.1a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1 0-2.73l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>
            </svg>
            Settings
          </motion.button>
          <motion.button
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition-colors duration-200 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="17 16 22 12 17 8"/><line x1="22" x2="10" y1="12" y2="12"/>
            </svg>
            Logout
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
