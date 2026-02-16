import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import wifiImg from "../assets/wifi.jfif";
import swimmingImg from "../assets/swimming.jfif";
import restaurantImg from "../assets/restaurant.jfif";
import gymImg from "../assets/gym.jfif";

export default function BookingForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const roomCategory = location.state?.category || "normal";
  const { roomId } = useParams();

  const [form, setForm] = useState({
    room_id: "",
    customer_name: "",
    customer_age: "",
    customer_emailId: "",
    customer_mobileNo: "",
    check_in_date: "",
    check_out_date: "",
    adults: 1,
    children: 0
  });

  // Example rates (could come from backend)
  const categoryPricing = {
     normal: { adult: 2000, child: 500 },
     deluxe: { adult: 4500, child: 1000 },
     suite: { adult: 6500, child: 2000 } };

     // Pick rates based on category
 const { adult: adultRate, child: childRate } = categoryPricing[roomCategory] || { adult: 0, child: 0 };

  // Calculate number of days
  const getDays = () => {
    if (!form.check_in_date || !form.check_out_date) return 0;
    const inDate = new Date(form.check_in_date);
    const outDate = new Date(form.check_out_date);
    const diff = (outDate - inDate) / (1000 * 60 * 60 * 24);
    return diff > 0 ? diff : 0;
  };

  const totalDays = getDays();
  const totalAmount =
    (form.adults * adultRate + form.children * childRate) * totalDays;

  const amenities = [
    { name: "Free Wi-Fi", img: wifiImg },
    { name: "Swimming Pool", img: swimmingImg },
    { name: "Restaurant", img: restaurantImg },
    { name: "Fitness Center", img: gymImg }
  ];

  const [currentAmenity, setCurrentAmenity] = useState(0);

  useEffect(() => {
    if (roomId) {
      setForm((prev) => ({ ...prev, room_id: roomId }));
    }
  }, [roomId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAmenity((prev) => (prev + 1) % amenities.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [amenities.length]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if ((role !== "customer" && role !== "admin") || !token) {
      toast.error("Please login to book a room");
      navigate("/customer/login");
      return;
    }

    toast.info("Proceeding to payment...");
    navigate(`/payment/${form.room_id}`, {
      state: { ...form, category: roomCategory, totalAmount, totalDays }
    });
  };

  const handleCancel = () => {
    navigate("/admin-dashboard");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
      {/* Left side: Booking form */}
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Room Booking</h2>

        <input
          name="room_id"
          value={form.room_id}
          readOnly
          className="w-full p-3 border mb-4 bg-gray-100 cursor-not-allowed rounded"
        />

        <input
          name="customer_name"
          value={form.customer_name}
          onChange={handleChange}
          placeholder="Full Name"
          required
          className="w-full p-3 border mb-4 rounded"
        />

        <input
          type="number"
          name="customer_age"
          value={form.customer_age}
          onChange={handleChange}
          placeholder="Age"
          min="1"
          required
          className="w-full p-3 border mb-4 rounded"
        />

        <input
          type="email"
          name="customer_emailId"
          value={form.customer_emailId}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full p-3 border mb-4 rounded"
        />

        <input
          type="text"
          name="customer_mobileNo"
          value={form.customer_mobileNo}
          onChange={handleChange}
          placeholder="Mobile Number"
          required
          pattern="^[0-9]{10}$"
          title="Enter a valid 10-digit mobile number"
          className="w-full p-3 border mb-4 rounded"
        />

        <input
          type="number"
          name="adults"
          value={form.adults}
          onChange={handleChange}
          placeholder="Adults"
          required
          min="1"
          className="w-full p-3 border mb-4 rounded"
        />

        <input
          type="number"
          name="children"
          value={form.children}
          onChange={handleChange}
          placeholder="Children"
          min="0"
          className="w-full p-3 border mb-4 rounded"
        />

        <input
          type="date"
          name="check_in_date"
          value={form.check_in_date}
          onChange={handleChange}
          required
          className="w-full p-3 border mb-4 rounded"
        />

        <input
          type="date"
          name="check_out_date"
          value={form.check_out_date}
          onChange={handleChange}
          required
          className="w-full p-3 border mb-4 rounded"
        />

        {/* Show calculated amount */}
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <p><strong>Total Days:</strong> {totalDays}</p>
          <p><strong>Total Amount:</strong> ₹{totalAmount}</p>
        </div>

        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="flex-1 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
          >
            Proceed to Payment
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Right side: Amenities carousel */}
<div className="flex flex-col items-center justify-center bg-gray-50 shadow-lg rounded p-6 relative">
        <div className="relative w-full h-[450px] mb-4">
          <img
            src={amenities[currentAmenity].img}
            alt={amenities[currentAmenity].name}
            className="rounded-lg shadow-lg w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-3 rounded-b-lg">
            <h2 className="text-lg font-bold">{amenities[currentAmenity].name}</h2>
            <p className="text-sm">
              Enjoy our {amenities[currentAmenity].name.toLowerCase()} during your stay.
            </p>
          </div>
        </div>

        <div className="flex gap-2 mt-2">
          {amenities.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentAmenity(index)}
              className={`w-3 h-3 rounded-full ${
                currentAmenity === index ? "bg-blue-600" : "bg-gray-400"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}