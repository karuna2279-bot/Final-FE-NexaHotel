import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";

export default function CustomerLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const params = new URLSearchParams(location.search);
  const redirectTarget = params.get("redirect") || "/admin-dashboard";

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role === "customer") {
      toast.info("You are already logged in");
      navigate(redirectTarget, { replace: true });
    }
  }, [navigate, redirectTarget]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/customer/login", { email, password });

      if (!res.data?.token) throw new Error("No token received from server");

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "customer");
      localStorage.setItem("customerName", res.data?.user?.name || "Guest");

      toast.success("Customer login successful!");
      navigate(redirectTarget, { replace: true });
    } catch (err) {
      setPassword("");
      toast.error(err.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-2xl w-96 transform transition hover:scale-105"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-600">
          Customer Login
        </h2>

        {/* Email field */}
        <div className="relative mb-5">
          <FaUser className="absolute left-3 top-3 text-gray-400" />
          <input
            type="email"
            placeholder="Email"
            aria-label="Email"
            className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password field */}
        <div className="relative mb-5">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            aria-label="Password"
            className="w-full p-3 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-blue-500"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Login button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 shadow-md"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Signup link */}
        <p className="mt-6 text-sm text-gray-600 text-center">
          Don’t have an account?{" "}
          <Link
            to="/customer/signup"
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign up here
          </Link>
        </p>
      </form>
    </div>
  );
}
