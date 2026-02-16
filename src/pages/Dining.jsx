import React from "react";
import DinningImg from "../assets/DinningBg.jpg";
import BistroBarImg from "../assets/Bistro-Bar.jpg";
import LemonBarImg from "../assets/Lemon-Bar-counter.jpg";
import BlancRestaurantImg from "../assets/Blanc-restaurant.jpg";
import { useNavigate } from "react-router-dom";

export default function Dining() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative h-[400px]">
        <img src={DinningImg} alt="Dining" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Dining</h1>
        </div>
      </div>

      {/* Dining Options */}
      <section className="py-16 px-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img src={BlancRestaurantImg} alt="Restaurant" className="w-full h-56 object-cover" />
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">Main Restaurant</h2>
            <p className="text-gray-600 mb-4">International cuisine with buffet options.</p>
          <button onClick={() => navigate("/admin-dashboard")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Book now
        </button>
          </div>
        </div>
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img src={LemonBarImg} alt="Restaurant" className="w-full h-56 object-cover" />
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">Buffet Restaurant</h2>
            <p className="text-gray-600 mb-4">International cuisine with buffet options.</p>
           <button onClick={() => navigate("/admin-dashboard")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Book now
        </button>
           </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img src={BistroBarImg} alt="Restaurant" className="w-full h-56 object-cover" />
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">Bar Restaurant</h2>
            <p className="text-gray-600 mb-4">International cuisine with buffet options.</p>
          <button onClick={() => navigate("/admin-dashboard")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Book now
        </button>
          </div>
        </div>
      </section>
    </div>
  );
}
