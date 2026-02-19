import React, { useState } from "react";
import api from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
       const res = await api.post("/api/auth/admin-login", { email, password });

      const token = res.data.token || res.data.accessToken;
      const role = res.data.user?.role || res.data.role;

      if (!token || !role) {
        toast.error("Invalid login response from server");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      if (role === "admin") {
        toast.success("Admin login successful!");
        navigate("/admin-dashboard");
      } else {
        toast.error("Access denied: not an admin");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-2xl w-96 transform transition hover:scale-105"
      >
        {/* Header */}
        <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-600">
          Admin Login
        </h2>

        {/* Email field */}
        <div className="flex items-center border rounded-lg mb-4 px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
          <FaUser className="text-gray-400" />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 ml-2 outline-none text-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password field */}
        <div className="flex items-center border rounded-lg mb-6 px-3 py-2 relative focus-within:ring-2 focus-within:ring-blue-400">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-2 outline-none text-gray-700 pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 text-gray-400 hover:text-blue-500 transition-colors"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Login button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-lg font-semibold shadow-md hover:from-blue-600 hover:to-blue-800 transition-transform transform hover:scale-105"
        >
          Login
        </button>
      </form>
    </div>
  );
}
