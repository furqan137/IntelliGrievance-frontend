import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";

export default function UserRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ❌ admin trying to access user pages
  if (user.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  // ✅ normal user allowed
  return children;
}
