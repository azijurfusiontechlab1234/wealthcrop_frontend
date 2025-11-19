// ProtectRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProtectRoute() {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem("token");
    setToken(t);
    setLoading(false);
  }, []);

  if (loading) return null;
  if (!token) return <Navigate to="/" replace />;

  return <Outlet />;
}
  