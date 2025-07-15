import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  const navigate = useNavigate();

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="text-center bg-white p-10 rounded-2xl shadow-2xl max-w-md w-full"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4 drop-shadow-md">
          📚 Study Planner
        </h1>
        <p className="text-gray-600 mb-6">
          Organize your study life, one task at a time.
        </p>

        <motion.img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
          alt="Study"
          className="w-32 h-32 mx-auto mb-6 rounded-full shadow-lg"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 200 }}
        />

        <motion.button
          onClick={() => navigate("/login")}
          className="bg-indigo-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-indigo-700 transition duration-300 shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default Home;
