import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "./Loader";

// Login / Register pages: logged-in users get sent to the dashboard
export default function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;
  if (user) return <Navigate to="/dashboard" replace />;

  return children;
}
