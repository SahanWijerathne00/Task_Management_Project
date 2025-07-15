import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaHome } from "react-icons/fa"; // Home icon

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("userId", res.data.userId);

      toast.success(`🎉 Login Successfully........!`, {
        position: "top-center",
        autoClose: 3000,
        style: {
          background: "#4ade80",
          color: "#000",
          fontWeight: "bold",
        },
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } catch (err) {
      toast.error(err.response?.data?.message || "❌ Login failed", {
        position: "top-center",
        autoClose: 3000,
        style: {
          background: "#f87171",
          color: "#fff",
          fontWeight: "bold",
        },
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          🔐 Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-purple-600 hover:underline font-medium"
          >
            Register here
          </Link>
        </p>

        {/* ✅ Stylish Home Button */}
        <div className="flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:scale-105 transform transition-all duration-300"
          >
            <FaHome className="text-white" />
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
