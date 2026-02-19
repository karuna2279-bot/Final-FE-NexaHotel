import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";

export default function UpdateBooking() {
  const { roomId } = useParams(); // use roomId not room_id
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      await api.put(`/api/admin/rooms/${roomId}/checkout`, {});
      toast.success(`Room ${roomId} checked out successfully!`);
      navigate("/admin-dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Checkout failed");
    }
  };

  const handleExtend = async () => {
    try {
      await api.put(`/api/admin/rooms/${roomId}/extend`, {});
      toast.success(`Room ${roomId} extended successfully!`);
      navigate("/admin-dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Extend failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Manage Booking for Room {roomId}</h2>
      <div className="flex gap-4">
        <button
          onClick={handleCheckout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Checkout
        </button>
        <button
          onClick={handleExtend}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Extend
        </button>
      </div>
    </div>
  );
}
