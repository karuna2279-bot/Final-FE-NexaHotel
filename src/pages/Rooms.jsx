import React from "react";
import { Link } from "react-router-dom";
import SuiteBg from "../assets/Suite-BG.jpeg";
import room_1 from "../assets/room-1.jpg";
import room_2 from "../assets/room-2.jpg";
import room_3 from "../assets/room-3.jpg";

export default function Rooms() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative h-[400px]">
        <img src={SuiteBg} alt="Rooms" className="w-full h-full object-cover brightness-110" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Our Rooms</h1>
        </div>
      </div>

      {/* Room Grid */}
      <section className="py-16 px-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img src={room_1} alt="Normal Room" className="w-full h-56 object-cover" />
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">Normal Room</h2>
            <p className="text-gray-600 mb-4">From 2000/night • Single Bed • City View</p>
            <Link to="/admin-dashboard" className="text-green-600 font-semibold hover:underline">Book Now →</Link>
          </div>
        </div>
        {/* Repeat for other room types */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img src={room_2} alt="Deluxe Room" className="w-full h-56 object-cover" />
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">Deluxe Room</h2>
            <p className="text-gray-600 mb-4">From 4500/night • Double Bed • City View</p>
            <Link to="/admin-dashboard" className="text-green-600 font-semibold hover:underline">Book Now →</Link>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img src={room_3} alt="Suite Room" className="w-full h-56 object-cover" />
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">Suite Room</h2>
            <p className="text-gray-600 mb-4">From 6500/night • King Bed • City View</p>
            <Link to="/admin-dashboard" className="text-green-600 font-semibold hover:underline">Book Now →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
