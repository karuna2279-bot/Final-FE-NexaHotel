import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function BookingList() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("/api/admin/bookings", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setBookings(res.data);
    } catch (err) {
      toast.error("Failed to fetch bookings");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async (bookingId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this booking?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/admin/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Booking deleted");
      fetchBookings(); // refresh list after deletion
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Bookings</h2>
      {bookings.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">No bookings found</p>
      ) : (
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-2 px-4">Room ID</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Age</th>
              <th className="py-2 px-4">Mobile</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Check-in</th>
              <th className="py-2 px-4">Check-out</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="border-t">
                <td className="py-2 px-4">{b.room_id}</td>
                <td className="py-2 px-4">{b.customer_name}</td>
                <td className="py-2 px-4">{b.customer_age}</td>
                <td className="py-2 px-4">{b.customer_mobileNo}</td>
                <td className="py-2 px-4">{b.customer_emailId}</td>
                <td className="py-2 px-4">{b.check_in_date}</td>
                <td className="py-2 px-4">{b.check_out_date}</td>
                <td className="py-2 px-4">{b.status}</td>
                <td className="py-2 px-4 flex gap-2">
                  <Link
                    to={`/admin/room/${b.room_id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Manage
                  </Link>
                  <button
                    onClick={() => handleDelete(b._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
