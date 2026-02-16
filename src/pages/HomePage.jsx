import React from "react";
import { Link } from "react-router-dom";
import lobbyImg from "../assets/Lobby.jpg";
import roomImg from "../assets/standard-3.jfif";
import diningImg from "../assets/delux1.jfif";
import spaImg from "../assets/suite2.jfif";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "../assets/hotel-logo.jpg";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-lg flex justify-between items-center px-10 py-4 z-50">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img
            src={Logo}
            alt="Nexa Hotel Logo"
            className="h-10 w-10 object-contain"
          />
          <h1 className="text-3xl font-extrabold text-blue-600 tracking-wide hover:text-blue-700 transition-colors">
            Nexa Hotel
          </h1>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600 transition-colors duration-300">Home</Link>
          <Link to="/rooms" className="hover:text-blue-600 transition-colors duration-300">Rooms</Link>
          <Link to="/dining" className="hover:text-blue-600 transition-colors duration-300">Dining</Link>
          <Link to="/contact" className="hover:text-blue-600 transition-colors duration-300">Contact</Link>
        </div>

        {/* CTA Button */}
        <Link
          to="/admin-dashboard"
          className="hidden md:inline-block bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-2 rounded-full shadow-md hover:from-green-600 hover:to-green-800 transition-transform transform hover:scale-105"
        >
          Book Now
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-6 py-6 md:hidden">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/rooms" onClick={() => setMenuOpen(false)}>Rooms</Link>
          <Link to="/dining" onClick={() => setMenuOpen(false)}>Dining</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link
            to="/admin-dashboard"
            onClick={() => setMenuOpen(false)}
            className="bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-2 rounded-full shadow-md hover:from-green-600 hover:to-green-800"
          >
            Book Now
          </Link>
        </div>
      )}
      {/* Hero Section */}
      <div className="relative h-screen">
        <img
          src={lobbyImg}
          alt="Hotel Lobby"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fadeIn">
            🏨 Welcome to Nexa Hotel
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-6">
            Experience luxury and comfort. Book your stay, manage reservations,
            and explore amenities with ease.
          </p>
          <Link
            to="/admin-dashboard"
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-lg transition"
          >
            Book Now
          </Link>
        </div>
      </div>

      {/* Featured Rooms */}
      <section className="py-16 px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Our Rooms</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition">
            <img src={roomImg} alt="Deluxe Room" className="w-full h-56 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Normal Room</h3>
              <p className="text-gray-600 mb-4">From 2000/each per day</p>
              <Link to="/admin-dashboard" className="text-green-600 font-semibold hover:underline">
                Book Now →
              </Link>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition">
            <img src={spaImg} alt="Suite" className="w-full h-56 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Deluxe Room</h3>
              <p className="text-gray-600 mb-4">From 4500/each per day</p>
              <Link to="/admin-dashboard" className="text-green-600 font-semibold hover:underline">
                Book Now →
              </Link>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition">
            <img src={diningImg} alt="Presidential Suite" className="w-full h-56 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Suite Room</h3>
              <p className="text-gray-600 mb-4">From 6500/each per day</p>
              <Link to="/admin-dashboard" className="text-green-600 font-semibold hover:underline">
                Book Now →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="bg-gray-100 py-16 px-8">
        <h2 className="text-3xl font-bold text-center mb-10">Amenities</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl mb-3">🏊</div>
            <p className="font-semibold">Swimming Pool</p>
          </div>
          <div>
            <div className="text-4xl mb-3">💆</div>
            <p className="font-semibold">Spa & Wellness</p>
          </div>
          <div>
            <div className="text-4xl mb-3">🍽️</div>
            <p className="font-semibold">Fine Dining</p>
          </div>
          <div>
            <div className="text-4xl mb-3">📶</div>
            <p className="font-semibold">Free Wi-Fi</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">What Our Guests Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <p className="italic">"The best hotel experience I've ever had. The staff was amazing!"</p>
            <p className="mt-4 font-semibold">- Sarah L.</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <p className="italic">"Beautiful rooms and excellent dining. Highly recommend Nexa Hotel."</p>
            <p className="mt-4 font-semibold">- James K.</p>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-blue-600 text-white py-16 px-8 text-center">
        <h2 className="text-3xl font-bold mb-6">Subscribe for Exclusive Offers</h2>
        <form className="flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-l-lg w-64 text-black"
          />
          <button className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-r-lg">
            Subscribe
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center py-6 mt-auto">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="hover:text-gray-300">Facebook</a>
          <a href="#" className="hover:text-gray-300">Instagram</a>
          <a href="#" className="hover:text-gray-300">Twitter</a>
        </div>
        <p>&copy; {new Date().getFullYear()} Nexa Hotel. All rights reserved.</p>
      </footer>
    </div>
  );
}
