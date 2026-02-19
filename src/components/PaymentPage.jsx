import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [paymentMethod, setPaymentMethod] = useState(null);
  const bookingForm = location.state;

  // Adults/children
  const adults = parseInt(bookingForm.adults, 10) || 0;
  const children = parseInt(bookingForm.children, 10) || 0;

  // Pricing table (same as backend)
  const categoryPricing = {
    normal: { adult: 2000, child: 500 },
    deluxe: { adult: 4500, child: 1000 },
    suite: { adult: 6500, child: 2000 }
  };

  const pricing = categoryPricing[bookingForm.category] || categoryPricing.normal;

  // Calculate number of days
  const getDays = () => {
    if (!bookingForm.check_in_date || !bookingForm.check_out_date) return 0;
    const inDate = new Date(bookingForm.check_in_date);
    const outDate = new Date(bookingForm.check_out_date);
    const diff = (outDate - inDate) / (1000 * 60 * 60 * 24);
    return diff > 0 ? diff : 1; // at least 1 day
  };

  const totalDays = getDays();

  // Calculate total amount
  const displayAmount = ((adults * pricing.adult) + (children * pricing.child)) * totalDays;

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login");
        navigate("/customer/login");
        return;
      }

      const numericRoomId = parseInt(roomId, 10);

      // Send booking details to backend
      const response = await api.post(
        "/api/bookings",
        {
          ...bookingForm,
          room_id: numericRoomId,
          adults,
          children,
          category: bookingForm.category
        }
        // {
        //   headers: { Authorization: `Bearer ${token}` }
        // }
      );

      toast.success("Payment successful, booking confirmed!");

      // Navigate to confirmation page with booking details
      navigate("/confirmation", {
        state: {
          ...response.data.booking
        }
      });
    } catch (err) {
      console.error("Booking error:", err.response?.data);
      toast.error(err.response?.data?.message || "Payment failed");
    }
  };

  const handleCancel = () => {
    navigate("/admin-dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg text-center">
        <h2 className="text-3xl font-bold mb-6 text-blue-700">Payment Page</h2>

        {/* Booking Summary */}
        <div className="bg-gray-100 p-4 rounded-lg mb-6 text-left">
          <h3 className="text-xl font-semibold mb-2">Booking Summary</h3>
          <p><strong>Room No:</strong> {roomId} ({bookingForm.category})</p>
          <p><strong>Customer:</strong> {bookingForm.customer_name}</p>
          <p><strong>Check-in:</strong> {bookingForm.check_in_date}</p>
          <p><strong>Check-out:</strong> {bookingForm.check_out_date}</p>
          <p><strong>Adults:</strong> {adults} (₹{pricing.adult} each/day)</p>
          <p><strong>Children:</strong> {children} (₹{pricing.child} each/day)</p>
          <p><strong>Total Days:</strong> {totalDays}</p>
          <hr className="my-2" />
          <p className="text-lg font-bold text-green-600">
            Total Price: ₹{displayAmount}
          </p>
        </div>

        {/* Payment Methods */}
  <div className="mb-6">
    <h3 className="text-xl font-semibold mb-4">Select Payment Method</h3>
    <div className="flex flex-col gap-3">
  <button
    type="button"
    onClick={() => setPaymentMethod("card")}
    className={`border p-3 rounded-lg hover:bg-blue-100 ${paymentMethod === "card" ? "bg-blue-200" : ""}`}
  >
    💳 Credit/Debit Card
  </button>
  <button
    type="button"
    onClick={() => setPaymentMethod("upi")}
    className={`border p-3 rounded-lg hover:bg-blue-100 ${paymentMethod === "upi" ? "bg-blue-200" : ""}`}
  >
    📱 UPI
  </button>
  <button
    type="button"
    onClick={() => setPaymentMethod("paypal")}
    className={`border p-3 rounded-lg hover:bg-blue-100 ${paymentMethod === "paypal" ? "bg-blue-200" : ""}`}
  >
    💵 PayPal
  </button>

    {/* Payment Fields */}
        {paymentMethod === "card" && (
          <div className="mt-4 text-left">
            <label className="block mb-2">Card Number</label>
            <input type="text" className="w-full border p-2 rounded mb-3" placeholder="1234 5678 9012 3456" />
            <label className="block mb-2">Expiry Date</label>
            <input type="text" className="w-full border p-2 rounded mb-3" placeholder="MM/YY" />
            <label className="block mb-2">CVV</label>
            <input type="password" className="w-full border p-2 rounded mb-3" placeholder="***" />
          </div>
        )}

        {paymentMethod === "upi" && (
          <div className="mt-4 text-left">
            <label className="block mb-2">UPI ID</label>
            <input type="text" className="w-full border p-2 rounded mb-3" placeholder="example@upi" />
          </div>
        )}

        {paymentMethod === "paypal" && (
          <div className="mt-4 text-left">
            <label className="block mb-2">PayPal Email</label>
            <input type="email" className="w-full border p-2 rounded mb-3" placeholder="your-email@example.com" />
          </div>
        )}


    </div>
    </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={handlePayment}
            disabled={!paymentMethod}
            className={`flex-1 py-3 rounded-lg transition ${
              paymentMethod ? "bg-green-500 text-white hover:bg-green-600" : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
          >
            Pay ₹{displayAmount} & Confirm
          </button>

          <button
            onClick={handleCancel}
            className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
