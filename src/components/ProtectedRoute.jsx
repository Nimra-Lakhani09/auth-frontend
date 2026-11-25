import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";
import Loader from "./Loader";

// Only logged-in users can see these pages
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <>
      <Navbar />
      <main className="container">{children}</main>
    </>
  );
}
