import React, { useState, useEffect } from "react";
import {
  Plus,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownLeft,
  Repeat,
  ArrowUpLeft,
} from "lucide-react";
import { transaccionService } from "../services/transacciones";
import { useAuth } from "../context/AuthContext";
import { ModalTransaccion } from "../components/ModalTransaccion";

export const Transacciones = () => {
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [transacciones, setTransacciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const { usuario } = useAuth();

  const cargarTransacciones = async () => {
    try {
      setCargando(true);
      const data = await transaccionService.conseguirTransaccionesDelUsuario(
        usuario?.IdUsuario
      );
      console.log("transacciones", data);
      setTransacciones(data);
      setError(null);
    } catch (err) {
      console.error("Error al cargar transacciones:", err);
      setError(
        "No se pudieron cargar las transacciones. Intente nuevamente."
      );
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (usuario?.IdUsuario) {
      cargarTransacciones();
    }
  }, [usuario?.IdUsuario]);

  const handleTransaccionCreada = (nuevaTransaccion) => {
    console.log("Nueva transacción creada:", nuevaTransaccion);
    // Recargar las transacciones
    cargarTransacciones();
  };

  const transaccionesFiltradas = transacciones.filter((tx) => {
    // Filtro por tipo de transacción
    return filtroTipo === "todos" || tx.Tipo === filtroTipo;
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
      return "Transferencia";
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
    if (transaccion.Tipo === "pago") {
      return <ArrowUpRight className="w-6 h-6 text-red-600" />;
    }
    if (transaccion.Tipo === "retiro") {
      return <ArrowUpRight className="w-6 h-6 text-red-600" />;
    }
    if (transaccion.Tipo === "deposito") {
      return <ArrowDownLeft className="w-6 h-6 text-green-600" />;
    }
    
  };

  const obtenerClaseMonto = (transaccion) => {
    if (transaccion.Estado === 'cancelado') return 'text-gray-400';
    return transaccion.IdCuentaOrigen === usuario?.IdUsuario
      ? "text-red-600"
      : "text-green-600";
  };

  const obtenerSimboloMonto = (transaccion) => {
    if (transaccion.Estado === 'cancelado') return '';
    return transaccion.IdCuentaOrigen === usuario?.IdUsuario ? "-" : "+";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Transacciones</h2>
        <button 
          onClick={() => setModalAbierto(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Nueva Transacción
        </button>
      </div>

      {/* Filtro por tipo de transacción */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Tipo de transacción</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFiltroTipo("todos")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filtroTipo === "todos"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Todos
          </button>
          {["deposito", "retiro", "transferencia", "pago"].map((tipo) => (
            <button
              key={tipo}
              onClick={() => setFiltroTipo(tipo)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filtroTipo === tipo
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
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
                  className={`p-4 transition-colors ${
                    tx.Estado === 'cancelado' 
                      ? 'bg-gray-50 opacity-70' 
                      : 'hover:bg-gray-50'
                  }`}
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
                        <p className={`font-semibold ${
                          tx.Estado === 'cancelado' ? 'text-gray-500' : 'text-gray-900'
                        }`}>
                          {obtenerTipoTransaccion(tx)}
                        </p>
                        <p className={`text-sm ${
                          tx.Estado === 'cancelado' ? 'text-gray-400' : 'text-gray-500'
                        }`}>
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
                            : tx.Estado === "cancelado"
                            ? "bg-gray-200 text-gray-600 line-through"
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
              {/* {filtro !== "todas" ? `con el filtro "${filtro}"` : ""} */}
            </div>
          )}
        </div>
      )}

      {/* Modal de nueva transacción */}
      {modalAbierto && (
        <ModalTransaccion
          cerrar={() => setModalAbierto(false)}
          onTransaccionCreada={handleTransaccionCreada}
        />
      )}
    </div>
  );
};
