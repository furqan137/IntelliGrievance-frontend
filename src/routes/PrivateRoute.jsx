import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null; // or loader

  return user ? children : <Navigate to="/login" replace />;
}
