import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Home,
  CreditCard,
  ArrowUpDown,
  DollarSign,
  User,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";

export const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { setUsuario } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: CreditCard, label: "Mis Cuentas", path: "/cuentas" },
    { icon: ArrowUpDown, label: "Transacciones", path: "/transacciones" },
    { icon: CreditCard, label: "Tarjetas", path: "/tarjetas" },
    { icon: DollarSign, label: "Préstamos", path: "/prestamos" },
    { icon: User, label: "Perfil", path: "/perfil" },
  ];

  const cerrarSesion = () => {
    authService.logout();
    setUsuario(null);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3 h-15">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-xl font-bold text-blue-600">EduBank</h1>
          </div>

          {/* cerra secion */}
          <button
            className="text-gray-600 hover:text-gray-800 cursor-pointer mr-5"
            onClick={() => cerrarSesion()}
          >
            <LogOut className="w-6 h-6" />
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static bottom-0 top-15 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <nav className="p-4 space-y-2 mt-4">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Overlay móvil */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/15 z-30 lg:hidden"
          />
        )}

        {/* Contenido principal */}
        <main className="flex-1 p-4 lg:p-6 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};
