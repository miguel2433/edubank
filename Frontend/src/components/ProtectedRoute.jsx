import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { authService } from "../services/authService";

export default function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await authService.me();
      setIsAuth(!!user);
    };
    checkAuth();
  }, []);

  if (isAuth === null) {
    return <p className="text-center mt-10">Verificando sesión...</p>;
  }

  return isAuth ? children : <Navigate to="/login" />;
}
