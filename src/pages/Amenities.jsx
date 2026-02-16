import React from "react";
import lobbyImg from "../assets/Lobby.jpg";

export default function Amenities() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative h-[400px]">
        <img src={lobbyImg} alt="Amenities" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Amenities</h1>
        </div>
      </div>

      {/* Amenities Grid */}
      <section className="py-16 px-8 max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <div className="text-5xl mb-3">🏊</div>
          <p className="font-semibold">Swimming Pool</p>
          <p className="text-gray-600">Outdoor infinity pool with lounge area.</p>
        </div>
        <div>
          <div className="text-5xl mb-3">💆</div>
          <p className="font-semibold">Spa & Wellness</p>
          <p className="text-gray-600">Massage, sauna, and relaxation therapies.</p>
        </div>
        {/* Add more amenities */}
      </section>
    </div>
  );
}
