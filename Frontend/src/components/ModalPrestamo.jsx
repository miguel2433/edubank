import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { prestamoService } from "../services/prestamoService";

export const ModalPrestamo = ({
  isOpen,
  onClose,
  montoSolicitado,
  setMontoSolicitado,
  plazo,
  setPlazo,
  cuotaEstimada,
  onPrestamoCreado
}) => {
  const { usuario } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSolicitarPrestamo = async () => {
    if (!usuario) return;

    setIsSubmitting(true);
    try {
      // Datos del préstamo a crear
      const prestamoData = {
        IdUsuario: usuario.IdUsuario,
        Monto: montoSolicitado,
        TasaInteres: 10.5, // fija por ahora
        PlazoMeses: plazo,
        Estado: "pendiente",
        CuotaMensual: cuotaEstimada,
        FechaFin: new Date(new Date().setMonth(new Date().getMonth() + plazo)),
        Pagado:0
      };

      // Crear el préstamo
      await prestamoService.crearPrestamo(prestamoData);

      // 🔹 Notificar al padre que se creó un préstamo
      onPrestamoCreado();

      // Cerrar modal
      onClose();
    } catch (error) {
      console.error("Error al crear el préstamo:", error);
      alert(error.message || "No se pudo crear el préstamo");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/15 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">
            Solicitar Préstamo
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        <div className="space-y-4">
          {/* Monto */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monto a solicitar
            </label>
            <input
              type="number"
              min="10000"
              max="500000"
              step="1000"
              value={montoSolicitado}
              onChange={(e) => setMontoSolicitado(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Plazo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Plazo en meses
            </label>
            <select
              value={plazo}
              onChange={(e) => setPlazo(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              {[6, 12, 24, 36, 48, 60].map((mes) => (
                <option key={mes} value={mes}>
                  {mes} meses
                </option>
              ))}
            </select>
          </div>

          {/* Cuota estimada */}
          <div className="bg-blue-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Cuota mensual estimada</span>
              <span className="font-bold text-gray-900">
                ${cuotaEstimada.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Tasa de interés</span>
              <span className="font-semibold text-gray-900">10.5% anual</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total a pagar</span>
              <span className="font-bold text-blue-600">
                ${(cuotaEstimada * plazo).toLocaleString()}
              </span>
            </div>
          </div>

          <button
            onClick={handleSolicitarPrestamo}
            disabled={isSubmitting}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
          >
            {isSubmitting ? "Solicitando..." : "Solicitar préstamo"}
          </button>
        </div>
      </div>
    </div>
  );
};
