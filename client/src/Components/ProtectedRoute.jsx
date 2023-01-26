import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../Contexts/AuthContext";

export default function ProtectedRoute() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return <Navigate to="/login" state={{ from: location }} />;

  return <Outlet />;
}
