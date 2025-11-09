import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { authService } from "../services/authService.js";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const verificarSesion = async () => {
      try {
        const user = await authService.me();
        setAuth(!!user);
      } catch {
        setAuth(false);
      } finally {
        setLoading(false);
      }
    };
    verificarSesion();
  }, []);

  if (loading) return <p className="text-center">Verificando sesión...</p>;

  return auth ? children : <Navigate to="/login" replace />;
}
