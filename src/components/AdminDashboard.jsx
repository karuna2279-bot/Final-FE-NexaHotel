import React from "react";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import normal1 from "../assets/standard-1.jfif";
import normal2 from "../assets/standard-2.jfif";
import normal3 from "../assets/standard-3.jfif";
import deluxe1 from "../assets/delux1.jfif";
import deluxe2 from "../assets/delux2.jfif";
import deluxe3 from "../assets/delux3.jfif";
import suite1 from "../assets/suite1.jfif";
import suite2 from "../assets/suite2.jfif";
import suite3 from "../assets/suite3.jfif";

export default function AdminDashboard() {
  const [rooms, setRooms] = useState([]);
  const [username, setUsername] = useState("Guest");
  const [currentCategory, setCurrentCategory] = useState("normal");
  const [currentImage, setCurrentImage] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  // âœ… Refresh username whenever logout triggers a refresh
  useEffect(() => {
    const role = localStorage.getItem("role");
    const customerName = localStorage.getItem("customerName");

    if (role === "admin") {
      setUsername("Admin");
    } else if (role === "customer" && customerName && customerName !== "undefined") {
      setUsername(customerName);
    } else {
      setUsername("Guest");
    }
  }, [location.state?.refresh]);

  const categoryImages = {
    normal: [normal1, normal2, normal3],
    deluxe: [deluxe1, deluxe2, deluxe3],
    suite: [suite1, suite2, suite3],
  };

  const fetchRooms = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("/api/rooms", {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });

    // Defensive: handle both array and object responses
    const data = res.data;
    if (Array.isArray(data)) {
      setRooms(data);
    } else if (data && Array.isArray(data.rooms)) {
      setRooms(data.rooms);
    } else {
      console.warn("Unexpected rooms response:", data);
      setRooms([]); // fallback
    }
  } catch (err) {
    toast.error("Failed to fetch rooms");
    setRooms([]); // ensure rooms stays an array
  }
};

useEffect(() => {
    fetchRooms();
  }, [location.state?.refresh]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(
        (prev) => (prev + 1) % categoryImages[currentCategory].length
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [currentCategory]);

  const getColor = (status) => {
    switch (status) {
      case "available": return "bg-green-500";
      case "booked": return "bg-yellow-500";
      case "extended": return "bg-blue-500";
      default: return "bg-gray-300";
    }
  };

  const handleRoomClick = (room) => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");
    // const customerToken = localStorage.getItem("customerToken");

    if (role === "admin" && token) {
      navigate(`/admin/room/${room.room_id}`);
      return;
    }

    if (role === "customer" && token) {
      if (room.status !== "available") {
        toast.info(`Room ${room.room_id} is not available`);
        return;
      }
      toast.info(`Booking Room ${room.room_id} - fill in your details`);
      navigate(`/booking/${room.room_id}`, {
        state: { category: room.category, room_id: room.room_id },
      });
      return;
    }

    // Guest flow
    toast.info(`Please login to book Room ${room.room_id}`);
    navigate("/customer/login");
  };

  const categories = ["normal", "deluxe", "suite"];

  const fixedRooms = categories.flatMap((category, catIndex) =>
    Array.from({ length: 20 }, (_, i) => ({
      room_id: (catIndex + 1) * 100 + i + 1,
      category,
      status: "available",
    }))
  );

 const mergedRooms = useMemo(() =>
  fixedRooms.map((room) => {
    const backendRoom = Array.isArray(rooms)
      ? rooms.find((r) => Number(r.room_id) === Number(room.room_id))
      : null;
    return backendRoom ? { ...room, ...backendRoom } : room;
  }),
[rooms]);


  return (
    <div className="p-6">
      <div className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8 rounded-xl shadow-lg mb-8">
  <h1 className="text-4xl font-extrabold text-center text-white drop-shadow-md">
    Welcome {username}, to our Room Dashboard
  </h1>
  <p className="text-center text-gray-100 mt-2">
    Manage bookings, check availability, and explore amenities with ease
  </p>
</div>


      {/* Status Legend */}
      <div className="flex gap-6 mb-6 justify-center">
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 bg-green-500 rounded"></span> Available
        </span>
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 bg-yellow-500 rounded"></span> Booked
        </span>
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 bg-blue-500 rounded"></span> Extended
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side: Room grid */}
        <div>
          {categories.map((category) => (
            <div
              key={category}
              className="mb-6"
              onMouseEnter={() => setCurrentCategory(category)}
            >
              <h2 className="text-lg font-semibold capitalize mb-3">
                {category} Rooms
              </h2>

              <div className="grid grid-cols-5 gap-2">
                {mergedRooms
                  .filter((room) => room.category === category)
                  .map((room) => (
                    <div
                      key={room.room_id}
                      role="button"
                      aria-label={`Room ${room.room_id}, status ${room.status}`}
                      onClick={() => handleRoomClick(room)}
                      className={`p-2 h-16 rounded shadow text-center cursor-pointer text-white text-xs transition-transform transform hover:scale-105 ${getColor(
                        room.status
                      )}`}
                    >
                      <p>Room {room.room_id}</p>
                      <p>{room.status}</p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right side: Category-specific carousel */}
        <div className="flex flex-col items-center justify-center bg-gray-100 p-6 rounded shadow-md">
          <img
            src={categoryImages[currentCategory][currentImage]}
            alt={`${currentCategory} room`}
            className="rounded-lg shadow-lg mb-4 w-full object-cover h-96"
          />
          <div className="flex gap-2 mb-4">
            {categoryImages[currentCategory].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-3 h-3 rounded-full ${
                  currentImage === index ? "bg-blue-600" : "bg-gray-400"
                }`}
                aria-label={`Show image ${index + 1} of ${currentCategory}`}
              ></button>
            ))}
          </div>
          <h2 className="text-2xl font-bold mb-2 capitalize">
            {currentCategory} Rooms
          </h2>
          <p className="text-gray-700 text-center mb-4">
            Browse our {currentCategory} options. Hover over a category on the
            left to preview its style.
          </p>
          {localStorage.getItem("role") !== "admin" && (
            <button
              onClick={() => navigate("/customer/login")}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Login to Book
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
