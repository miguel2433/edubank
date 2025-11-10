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
  

  console.log("isModalOpen", isModalOpen);

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

  if (cargando || loading)
    return <p className="text-gray-600">Cargando cuentas...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!usuario)
    return <p className="text-gray-600">Iniciá sesión para ver tus cuentas.</p>;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };



  if (cuentas.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Mis Cuentas</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 hover:cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            Nueva Cuenta sdad
          </button>
        </div>
        <p className="text-gray-600">No tenés cuentas registradas.</p>
        {/* Modal para nueva cuenta */}
        {isModalOpen && <ModalNuevaCuenta setIsModalOpen={setIsModalOpen} />}
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
        
      </div>
    </div>
  );
};
