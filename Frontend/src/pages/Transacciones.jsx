import React, { useState, useEffect } from "react";
import {
  Plus,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownLeft,
  Repeat,
} from "lucide-react";
import { transaccionService } from "../services/transacciones";
import { useAuth } from "../context/AuthContext";

export const Transacciones = () => {
  const [filtro, setFiltro] = useState("todas");
  const [transacciones, setTransacciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const { usuario } = useAuth();
  console.log("usuario identificado", usuario);

  useEffect(() => {
    const cargarTransacciones = async () => {
      try {
        setCargando(true);
        const data = await transaccionService.conseguirTransaccionesDelUsuario(
          usuario.IdUsuario
        );
        console.log("transacciones", data);
        setTransacciones(data);
      } catch (err) {
        console.error("Error al cargar transacciones:", err);
        setError(
          "No se pudieron cargar las transacciones. Intente nuevamente."
        );
      } finally {
        setCargando(false);
      }
    };

    if (usuario?.IdUsuario) {
      cargarTransacciones();
    }
  }, [usuario?.IdUsuario]);

  const transaccionesFiltradas = transacciones.filter((tx) => {
    if (filtro === "todas") return true;
    if (filtro === "recibidas")
      return tx.Tipo === "transferencia" && tx.IdCuentaDestino === usuario?.IdUsuario;
    if (filtro === "enviadas")
      return tx.Tipo === "transferencia" && tx.IdCuentaOrigen === usuario?.IdUsuario;
    if (filtro === "pagos") return tx.Tipo === "pago";
    return true;
  });

  const formatearFecha = (fechaISO) => {
    const opciones = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(fechaISO).toLocaleString("es-AR", opciones);
  };

  const obtenerTipoTransaccion = (transaccion) => {
    if (transaccion.Tipo === "transferencia") {
      return transaccion.IdCuentaOrigen === usuario?.IdUsuario
        ? "Transferencia enviada"
        : "Transferencia recibida";
    }
    return transaccion.Tipo.charAt(0).toUpperCase() + transaccion.Tipo.slice(1);
  };

  const obtenerIcono = (transaccion) => {
    if (transaccion.Tipo === "transferencia") {
      return transaccion.IdCuentaOrigen === usuario?.IdUsuario ? (
        <ArrowUpRight className="w-6 h-6 text-red-600" />
      ) : (
        <ArrowDownLeft className="w-6 h-6 text-green-600" />
      );
    }
    return <Repeat className="w-6 h-6 text-blue-600" />;
  };

  const obtenerClaseMonto = (transaccion) => {
    return transaccion.IdCuentaOrigen === usuario?.IdUsuario
      ? "text-red-600"
      : "text-green-600";
  };

  const obtenerSimboloMonto = (transaccion) => {
    return transaccion.IdCuentaOrigen === usuario?.IdUsuario ? "-" : "+";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Transacciones</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Nueva Transacción
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex flex-wrap gap-2">
          {["todas", "recibidas", "enviadas", "pagos"].map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filtro === f
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Estado de carga y error */}
      {cargando && (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Lista de transacciones */}
      {!cargando && !error && (
        <div className="bg-white rounded-xl border border-gray-200">
          {transaccionesFiltradas.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {transaccionesFiltradas.map((tx) => (
                <div
                  key={tx.IdTransaccion}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          tx.IdCuentaOrigen === usuario?.id
                            ? "bg-red-50"
                            : "bg-green-50"
                        }`}
                      >
                        {obtenerIcono(tx)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {obtenerTipoTransaccion(tx)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {tx.Descripcion}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {formatearFecha(tx.Fecha)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-xl font-bold ${obtenerClaseMonto(tx)}`}
                      >
                        {obtenerSimboloMonto(tx)}$
                        {parseFloat(tx.Monto).toLocaleString("es-AR", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                      <span
                        className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${
                          tx.Estado === "completado"
                            ? "bg-green-100 text-green-700"
                            : tx.Estado === "pendiente"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {tx.Estado}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              No se encontraron transacciones{" "}
              {filtro !== "todas" ? `con el filtro "${filtro}"` : ""}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
