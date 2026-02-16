import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import BookingForm from "./pages/BookingForm";
import AdminLogin from "./pages/AdminLogin";
import BookingList from "./pages/BookingList";
import UpdateBooking from "./pages/UpdateBooking";
import DeleteBooking from "./pages/DeleteBooking";
import CustomerLogin from "./pages/CustomerLogin";
import CustomerSignup from "./pages/CustomerSignup";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./components/AdminDashboard";
import PaymentPage from "./components/PaymentPage";
import AdminRoomPage from "./components/AdminRoomPage";
import BookingConfirmation from "./components/BookingConfirmation";
import Rooms from "./pages/Rooms";
import Amenities from "./pages/Amenities";
import Dining from "./pages/Dining";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-20"> {/* padding so content isnâ€™t hidden behind fixed navbar */}
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/rooms" element={<Rooms/>}/>
          <Route path="/amenities" element={<Amenities />} />
          <Route path="/dining" element={<Dining />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/customer/login" element={<CustomerLogin />} />
          <Route path="/customer/signup" element={<CustomerSignup />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />}/>
          <Route path="/admin/room/:roomId" element={<AdminRoomPage />} /> 
          <Route path="/payment/:roomId" element={<PaymentPage/>}/>
          <Route path="/confirmation" element={<BookingConfirmation/>}/>

          {/* Customer protected route */}
          <Route
            path="/booking/:roomId"
            element={
              <ProtectedRoute role="customer">
                <BookingForm />
              </ProtectedRoute>
            }
          />

          {/* Admin protected routes */}
          
          <Route
            path="/admin/bookings"
            element={
              <ProtectedRoute role="admin">
                <BookingList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/update/:roomId"
            element={
              <ProtectedRoute role="admin">
                <UpdateBooking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/delete/:roomId"
            element={
              <ProtectedRoute role="admin">
                <DeleteBooking />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
