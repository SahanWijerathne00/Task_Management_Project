import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);

      // ✅ Show success toast
      toast.success("🎉 Registration successful.......!", {
        position: "top-center",
        autoClose: 3000,
        style: {
          background: "#4ade80",
          color: "#000",
          fontWeight: "bold",
        },
      });

      // ⏳ Wait 3 seconds before redirecting to login
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      toast.error(err.response?.data?.message || "❌ Registration failed", {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-500 via-blue-500 to-cyan-500 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          📝 Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
