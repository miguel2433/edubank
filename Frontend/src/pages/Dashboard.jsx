import React from "react";
import { authService } from "../services/authService";

export default function Dashboard() {
  const handleLogout = async () => {
    await authService.logout();
    window.location.href = "/login";
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Panel principal</h1>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded-lg"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
