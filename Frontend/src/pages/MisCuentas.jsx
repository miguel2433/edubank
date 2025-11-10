import React, { useEffect, useState } from "react";
import { Plus, CreditCard, X, Loader2 } from "lucide-react";
import { cuentasService } from "../services/cuentasService";
import { useAuth } from "../context/AuthContext";
import { ModalNuevaCuenta } from "../components/ModalNuevaCuenta";

export const MisCuentas = () => {
  const { usuario, cargando } = useAuth();
  const [cuentas, setCuentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  console.log("mis cuentas usuario",usuario)

  useEffect(() => {
    const fetchCuentas = async () => {
      if (!usuario) return; // 🔹 Esperar al usuario
      console.log(usuario);
      try {
        const data = await cuentasService.getCuentasDelUsuario(
          usuario.IdUsuario
        );

        setCuentas(data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar las cuentas");
      } finally {
        setLoading(false);
      }
    };

    fetchCuentas();
  }, [usuario]);

  if (cargando || loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h2a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">Iniciá sesión para ver tus cuentas.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Mis Cuentas</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Nueva Cuenta
        </button>
      </div>
      {cuentas.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
            <CreditCard className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No tenés cuentas registradas</h3>
          <p className="mt-1 text-sm text-gray-500">Comenzá creando tu primera cuenta para disfrutar de todos los beneficios.</p>
          <div className="mt-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="-ml-1 mr-2 h-5 w-5" />
              Crear cuenta
            </button>
          </div>
        </div>
      ) : 
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cuentas.map((cuenta) => (
          <div
            key={cuenta.IdCuenta}
            className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-blue-100 text-sm mb-1">Saldo disponible</p>
                  <p className="text-3xl font-bold">
                    ${cuenta.Saldo.toLocaleString()}
                  </p>
                </div>
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <p className="text-blue-100 text-xs">Tipo de cuenta</p>
                  <p className="font-semibold">
                    {cuenta.tipoCuenta?.Nombre || "Sin tipo"}
                  </p>
                </div>
                <div>
                  <p className="text-blue-100 text-xs">CBU</p>
                  <p className="font-mono text-sm">{cuenta.CBU}</p>
                </div>
                <div>
                  <p className="text-blue-100 text-xs">Alias</p>
                  <p className="font-semibold">{cuenta.Alias}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white border-opacity-20 flex gap-3">
                <button className="flex-1 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Ver detalles
                </button>
                <button className="flex-1 bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Transferir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>}
      {isModalOpen && <ModalNuevaCuenta setIsModalOpen={setIsModalOpen} setCuentas={setCuentas} />}
    </div>
    
  );
};
