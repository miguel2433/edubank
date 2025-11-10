import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { MisCuentas } from "./pages/MisCuentas.jsx";
import { Transacciones } from "./pages/Transacciones.jsx";
import { Layout } from "./components/Layout.jsx";
import { useState } from "react";
import { Perfil } from "./pages/Perfil.jsx";
import { Tarjetas } from "./pages/Targetas.jsx";
import { Prestamos } from "./pages/Prestamos.jsx";

// export default function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Navigate to="/login" />} />
//       <Route path="/login" element={<Login />} />

//       {/* Rutas protegidas */}
//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <Dashboard />
//           </ProtectedRoute>
//         }
//       />
//     </Routes>
//   );
// }
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
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
    </Routes>
  );
}
