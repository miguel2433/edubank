import React, { useEffect, useState } from "react";
import { Lock, Plus, Eye, EyeOff, Copy } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { tarjetaService } from "../services/tarjetaService";

export const Tarjetas = () => {
  const [mostrarNumero, setMostrarNumero] = useState({});
  const { usuario, cargando } = useAuth();
  const [tarjetas, setTarjetas] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  useEffect(() => {
     const fetchCuentas = async () => {
       if (!usuario) return; // 🔹 Esperar al usuario
       console.log(usuario);
       try {
         const data = await tarjetaService.getTarjetasDelUsuario(
           usuario.IdUsuario
         );

         setTarjetas(data);
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

  const toggleMostrarNumero = (id) => {
    setMostrarNumero((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copiarNumero = (numero) => {
    navigator.clipboard.writeText(numero.replace(/\s/g, ""));
    alert("Número de tarjeta copiado");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Mis Tarjetas</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Solicitar Tarjeta
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tarjetas.map((tarjeta) => (
          <div key={tarjeta.IdTarjeta} className="relative">
            {/* Tarjeta visual */}
            <div
              className={`rounded-2xl p-6 text-white relative overflow-hidden ${
                tarjeta.Tipo === "credito"
                  ? "bg-gradient-to-br from-purple-600 to-purple-900"
                  : "bg-gradient-to-br from-gray-700 to-gray-900"
              }`}
            >
              {/* Decoración de fondo */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full -mr-20 -mt-20" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full -ml-16 -mb-16" />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <p className="text-sm opacity-80">
                      {tarjeta.Tipo === "credito"
                        ? "Tarjeta de Crédito"
                        : "Tarjeta de Débito"}
                    </p>
                    <p className="text-2xl font-bold mt-1">{tarjeta.marca}</p>
                  </div>
                  <div className="w-12 h-8 bg-white bg-opacity-20 rounded backdrop-blur-sm flex items-center justify-center">
                    <div className="w-8 h-6 bg-gradient-to-r from-yellow-400 to-yellow-200 rounded" />
                  </div>
                </div>

                {/* Número de tarjeta */}
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-xl tracking-wider">
                      {mostrarNumero[tarjeta.IdTarjeta]
                        ? tarjeta.NumeroTarjeta
                        : "•••• •••• •••• " + tarjeta.numero.slice(-4)}
                    </p>
                    <button
                      onClick={() => toggleMostrarNumero(tarjeta.IdTarjeta)}
                      className="ml-2 p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
                    >
                      {mostrarNumero[tarjeta.IdTarjeta] ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Información adicional */}
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs opacity-70 mb-1">Titular</p>
                    <p className="font-semibold">{usuario.Nombre}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs opacity-70 mb-1">Vencimiento</p>
                    <p className="font-semibold">{tarjeta.FechaVencimiento}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs opacity-70 mb-1">CVV</p>
                    <p className="font-semibold">
                      {mostrarNumero[tarjeta.IdTarjeta] ? tarjeta.CVV : "•••"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Información y acciones */}
            <div className="mt-4 bg-white rounded-xl p-4 border border-gray-200 space-y-3">
              {tarjeta.tipo === "credito" && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Límite de crédito
                    </span>
                    <span className="font-semibold">
                      ${tarjeta.LimiteCredito.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Disponible</span>
                    <span className="font-semibold text-green-600">
                      ${tarjeta.SaldoDisponible.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{
                        width: `${
                          (tarjeta.SaldoDisponible / tarjeta.LimiteCredito) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => copiarNumero(tarjeta.NumeroTarjeta)}
                  className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copiar
                </button>
                <button className="flex-1 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4" />
                  Bloquear
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Transacciones con tarjeta */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Últimas compras</h3>
        <div className="space-y-3">
          {[
            {
              comercio: "Supermercado Día",
              monto: 15000,
              fecha: "2025-01-15",
              categoria: "Alimentación",
            },
            {
              comercio: "Netflix",
              monto: 2500,
              fecha: "2025-01-14",
              categoria: "Entretenimiento",
            },
            {
              comercio: "YPF",
              monto: 8000,
              fecha: "2025-01-13",
              categoria: "Combustible",
            },
          ].map((compra, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div>
                <p className="font-medium text-gray-900">{compra.comercio}</p>
                <p className="text-sm text-gray-500">
                  {compra.categoria} • {compra.fecha}
                </p>
              </div>
              <p className="font-bold text-gray-900">
                -${compra.monto.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
