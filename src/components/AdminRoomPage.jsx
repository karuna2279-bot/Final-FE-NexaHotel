import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";
import BookingForm from "../pages/BookingForm"; // reuse customer booking form

export default function AdminRoomPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [booking, setBooking] = useState(null);
  const [isExtending, setIsExtending] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await api.get(`/api/admin/rooms/${roomId}`);
        setRoom(res.data.room);
        setBooking(res.data.booking);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load room");
      }
    };
    fetchRoom();
  }, [roomId]);

  const handleCheckout = async () => {
    try {
      // const token = localStorage.getItem("token");
      await api.put(`/api/admin/rooms/${roomId}/checkout`);
      toast.success("Room checked out successfully");
      navigate("/admin-dashboard", { state: { refresh: Date.now() } });
      setRoom({ ...room, status: "available" });
      setBooking(null);
    } catch (err) {
      toast.error("Checkout failed");
    }
  };

  const handleExtendClick = () => {
    setFormData({
      customer_name: booking.customer_name,
      customer_emailId: booking.customer_emailId,
      customer_mobileNo: booking.customer_mobileNo,
      check_in_date: booking.check_in_date?.slice(0, 10),
      check_out_date: booking.check_out_date?.slice(0, 10),
      status: booking.status,
    });
    setIsExtending(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
  try {
    const token = localStorage.getItem("token");

    //  Use the existing formData state, add status
    const payLoad = {
      ...formData,
      status: "extended"  // mark as extended
    };

    const response = await api.put(`/api/bookings/${booking._id}`, payLoad);

    toast.success("Booking updated successfully");
    setIsExtending(false);

    // Use updated booking from backend
    // setRoom({ ...room, status: "extended" });
    setBooking(response.data.booking);
    if (room) {
      setRoom({ ...room, status: response.data.booking.status });
    }
    
  } catch (err) {
    console.error("Update error:", err.response?.data);
    toast.error(err.response?.data?.message || "Update failed");
  }
};



  if (!room) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Room Management</h1>
      <p>Room ID: {room.room_id}</p>
      <p>Category: {room.category}</p>
      <p>Status: {room.status}</p>

      {/* If room is available - show booking form */}
      {room.status === "available" && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Book this Room (Admin)</h2>
          <BookingForm
            roomId={room.room_id}
            category={room.category}
            isAdmin={true} />
        </div>
      )}

      {/* If room is booked - show booking details */}
      {(room.status === "booked" || room.status === "extended") && booking && booking.status !== "checked_out" && (
        <div className="mt-4 bg-gray-100 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Customer Booking Details</h2>
          <p><strong>Name:</strong> {booking.customer_name}</p>
          <p><strong>Email:</strong> {booking.customer_emailId}</p>
          <p><strong>Mobile:</strong> {booking.customer_mobileNo}</p>
          <p><strong>Check-in:</strong> {booking.check_in_date}</p>
          <p><strong>Check-out:</strong> {booking.check_out_date}</p>
          <p><strong>Status:</strong> {booking.status}</p>

          {!isExtending ? (
            <div className="mt-4 flex gap-4">
              <button
                onClick={handleCheckout}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Checkout
              </button>
              <button
                onClick={handleExtendClick}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Extend
              </button>
            </div>
          ) : (
            <div className="mt-6 bg-white p-4 rounded shadow">
              <h3 className="text-lg font-bold mb-4">Update Booking</h3>
              <input
                type="text"
                name="customer_name"
                value={formData.customer_name}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="email"
                name="customer_emailId"
                value={formData.customer_emailId}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="text"
                name="customer_mobileNo"
                value={formData.customer_mobileNo}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2"
              />
              <label>Check-in Date</label>
              <input
                type="date"
                name="check_in_date"
                value={formData.check_in_date}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2"
              />
              <label>Check-out Date</label>
              <input
                type="date"
                name="check_out_date"
                value={formData.check_out_date}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2"
              />

              <div className="flex gap-4 mt-4">
                <button
                  onClick={handleUpdate}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Save / Update
                </button>
                <button
                  onClick={() => setIsExtending(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
