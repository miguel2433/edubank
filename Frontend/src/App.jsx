import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { MisCuentas } from "./pages/MisCuentas.jsx";
import { Transacciones } from "./pages/Transacciones.jsx";
import { Layout } from "./components/Layout.jsx";
import { useState } from "react";
import { Perfil } from "./pages/Perfil.jsx";
import { Tarjetas } from "./pages/Targetas.jsx";
import { Prestamos } from "./pages/Prestamos.jsx";
import { ModalTransferencia } from "./components/ModalTransferencia.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cuentas"
        element={
          <ProtectedRoute>
            <MisCuentas />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transacciones"
        element={
          <ProtectedRoute>
            <Transacciones />
          </ProtectedRoute>
        }
      />
      <Route
        path="/perfil"
        element={
          <ProtectedRoute>
            <Perfil />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tarjetas"
        element={
          <ProtectedRoute>
            <Tarjetas />
          </ProtectedRoute>
        }
      />
      <Route
        path="/prestamos"
        element={
          <ProtectedRoute>
            <Prestamos />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transferencia"
        element={
          <ProtectedRoute>
            <ModalTransferencia />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
