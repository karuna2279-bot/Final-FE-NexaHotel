import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function BookingConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state; // booking object passed directly

  const handlePrint = () => {
    window.print();
  };

  if (!bookingData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-100 to-green-300">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg text-center">
          <h2 className="text-3xl font-bold mb-6 text-green-700">
            No booking details found
          </h2>
          <button
            onClick={() => navigate("/admin-dashboard")}
            className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-100 to-green-300 print:bg-white">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg print:shadow-none print:border print:border-gray-300">
        {/* Header */}
        <div className="text-center mb-6 border-b pb-4">
          <h1 className="text-3xl font-bold text-green-700">NexaHotel Booking Receipt</h1>
          <p className="text-gray-600">Thank you for choosing our hotel!</p>
        </div>

        {/* Booking Details */}
        <div className="space-y-2 text-gray-700">
          <p><strong>Booking ID:</strong> {bookingData._id}</p>
          <p><strong>Customer:</strong> {bookingData.customer_name}</p>
          <p><strong>Room No:</strong> {bookingData.room_id}</p>
          <p><strong>Category:</strong> {bookingData.category}</p>
          <p><strong>Adults:</strong> {bookingData.adults}</p>
          <p><strong>Children:</strong> {bookingData.children}</p>
          <p><strong>Total Days:</strong> {bookingData.totalDays}</p>
          <p><strong>Amount Paid:</strong> ₹{bookingData.amount?.toLocaleString("en-IN")}</p>
          <p><strong>Check-in:</strong> {new Date(bookingData.check_in_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
          <p><strong>Check-out:</strong> {new Date(bookingData.check_out_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
          <p><strong>Status:</strong> {bookingData.status}</p>
        </div>

        {/* Footer */}
        <div className="mt-6 border-t pt-4 text-center text-gray-600">
          <p>We look forward to hosting you. Have a pleasant stay!</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6 no-print">
          <button
            onClick={handlePrint}
            className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Print Receipt
          </button>
          <button
            onClick={() => navigate("/admin-dashboard")}
            className="flex-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
          >
            Go to Dashboard
          </button>
          <button
            onClick={() => navigate("/admin-dashboard", { state: { refresh: Date.now() } })}
            className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
