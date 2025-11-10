import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import {Dashboard} from "./pages/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import {MisCuentas} from "./pages/MisCuentas.jsx";
import {Transacciones} from "./pages/Transacciones.jsx";
import {Layout} from "./components/Layout.jsx";
import { useState } from "react";

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

// ============================================
// COMPONENTE PRINCIPAL - DEMO
// ============================================
export default function App() {
  const [vistaActual, setVistaActual] = useState('dashboard');

  const renderVista = () => {
    switch (vistaActual) {
      case 'dashboard':
        return <Dashboard />;
      case 'cuentas':
        return <MisCuentas />;
      case 'transacciones':
        return <Transacciones />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navegación de prueba */}
      <div className="bg-gray-900 text-white p-4 flex gap-4 justify-center">
        <button onClick={() => setVistaActual('dashboard')} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">Dashboard</button>
        <button onClick={() => setVistaActual('cuentas')} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">Mis Cuentas</button>
        <button onClick={() => setVistaActual('transacciones')} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">Transacciones</button>
      </div>
      
      <Layout>
        {renderVista()}
      </Layout>
    </div>
  );
}
