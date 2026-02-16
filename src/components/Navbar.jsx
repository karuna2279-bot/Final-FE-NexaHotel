import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    if (role === "admin") {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      toast.info("Admin logged out successfully");
      navigate("/admin/login");
    } else if (role === "customer") {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      toast.info("Customer logged out successfully");
      navigate("/customer/login");
    } else {
      localStorage.clear();
      toast.info("Logged out successfully");
      navigate("/");
    }
  };

  // Close dropdown when clicking outside or on another NavLink
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        event.target.tagName === "A"
      ) {
        setIsLoginOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 shadow-md fixed w-full top-0 z-50">
      <div className="flex justify-between items-center">
        <NavLink
          to="/"
          className="text-2xl font-bold tracking-wide hover:text-yellow-300 transition"
        >
          NexaHotel
        </NavLink>

        {/* Mobile menu toggle */}
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </button>

        {/* Desktop menu */}
        <div className="hidden lg:flex gap-6 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-yellow-300 font-semibold" : "hover:text-yellow-300 transition"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              isActive ? "text-yellow-300 font-semibold" : "hover:text-yellow-300 transition"
            }
          >
            Book Room
          </NavLink>

          {/* Login dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsLoginOpen(!isLoginOpen)}
              className="hover:text-yellow-300 transition"
            >
              Login
            </button>
            {isLoginOpen && (
              <div className="absolute right-0 bg-white text-black mt-2 rounded shadow-lg z-50">
                <NavLink
                  to="/customer/login"
                  className="block px-4 py-2 hover:bg-gray-300"
                  onClick={() => setIsLoginOpen(false)}
                >
                  Customer Login
                </NavLink>
                <NavLink
                  to="/admin/login"
                  className="block px-4 py-2 hover:bg-gray-300"
                  onClick={() => setIsLoginOpen(false)}
                >
                  Admin Login
                </NavLink>
              </div>
            )}
          </div>

          {/* Only show Manage Bookings for admin */}
          {role === "admin" && (
            <NavLink
              to="/admin/bookings"
              className={({ isActive }) =>
                isActive ? "text-yellow-300 font-semibold" : "hover:text-yellow-300 transition"
              }
            >
              Manage Bookings
            </NavLink>
          )}

          {token && (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-3 bg-blue-700 rounded shadow-md p-4 space-y-3">
          <NavLink
            to="/"
            className="block hover:text-yellow-300 transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/admin-dashboard"
            className="block hover:text-yellow-300 transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Book Room
          </NavLink>
          <div>
            <button
              onClick={() => setIsLoginOpen(!isLoginOpen)}
              className="block w-full text-left hover:text-yellow-300 transition"
            >
              Login
            </button>
            {isLoginOpen && (
              <div className="bg-white text-black mt-2 rounded shadow-lg">
                <NavLink
                  to="/customer/login"
                  className="block px-4 py-2 hover:bg-gray-300"
                  onClick={() => {
                    setIsLoginOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Customer Login
                </NavLink>
                <NavLink
                  to="/admin/login"
                  className="block px-4 py-2 hover:bg-gray-300"
                  onClick={() => {
                    setIsLoginOpen(false);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Admin Login
                </NavLink>
              </div>
            )}
          </div>
          {role === "admin" && (
            <NavLink
              to="/admin/bookings"
              className="block hover:text-yellow-300 transition"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Manage Bookings
            </NavLink>
          )}
          {token && (
            <button
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 w-full"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
