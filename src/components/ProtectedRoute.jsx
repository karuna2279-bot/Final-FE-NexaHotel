import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem(role === "admin" ? "token" : "token");

  if (!token) {
    return <Navigate to={role === "admin" ? "/admin/login" : "/customer/login"} replace />;
  }

  return children;
}
