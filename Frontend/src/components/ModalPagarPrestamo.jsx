import React, { useState, useEffect } from "react";
import { DollarSign, CreditCard } from "lucide-react";
import { prestamoService } from "../services/prestamoService";
import { cuentasService } from "../services/cuentasService";
import { useAuth } from "../context/AuthContext";

export const ModalPagarPrestamo = ({ isOpen, onClose, prestamo, onPagoExitoso }) => {
  const { usuario } = useAuth();
  const [cuotasAPagar, setCuotasAPagar] = useState(1);
  const [cuentaSeleccionada, setCuentaSeleccionada] = useState("");
  const [cuentas, setCuentas] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCuentas = async () => {
      if (!usuario) return;
      try {
        const data = await cuentasService.getCuentasDelUsuario(usuario.IdUsuario);
        setCuentas(data || []);
        if (data && data.length > 0) {
          setCuentaSeleccionada(data[0].Alias);
        }
      } catch (err) {
        console.error("Error al cargar cuentas:", err);
      }
    };

    if (isOpen) {
      fetchCuentas();
    }
  }, [isOpen, usuario]);

  if (!isOpen || !prestamo) return null;

  const cuotasRestantes = prestamo.PlazoMeses - (prestamo.Pagado || 0);
  const montoPorCuota = prestamo.CuotaMensual;
  const montoTotal = cuotasAPagar * montoPorCuota;

  const handlePagar = async () => {
    if (!cuentaSeleccionada) {
      setError("Selecciona una cuenta");
      return;
    }

    if (cuotasAPagar < 1 || cuotasAPagar > cuotasRestantes) {
      setError(`Debes pagar entre 1 y ${cuotasRestantes} cuotas`);
      return;
    }

    const cuentaActual = cuentas.find(c => c.Alias === cuentaSeleccionada);
    if (cuentaActual && cuentaActual.Saldo < montoTotal) {
      setError("Saldo insuficiente en la cuenta seleccionada");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const data = {
        cuotasPagadas: cuotasAPagar,
        alias: cuentaSeleccionada
      };

      await prestamoService.PagarPrestamo(data, prestamo.IdPrestamo);
      
      // Notificar éxito
      if (onPagoExitoso) {
        onPagoExitoso();
      }

      // Cerrar modal
      onClose();
    } catch (err) {
      console.error("Error al pagar préstamo:", err);
      setError(err.message || "Error al procesar el pago");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/15 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">
            Pagar Préstamo
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        <div className="space-y-4">
          {/* Información del préstamo */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Cuotas restantes</span>
              <span className="font-bold text-gray-900">{cuotasRestantes}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Valor de cuota</span>
              <span className="font-bold text-gray-900">
                ${montoPorCuota.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Cantidad de cuotas a pagar */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cantidad de cuotas a pagar
            </label>
            <input
              type="number"
              min="1"
              max={cuotasRestantes}
              value={cuotasAPagar}
              onChange={(e) => setCuotasAPagar(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Máximo: {cuotasRestantes} cuotas
            </p>
          </div>

          {/* Seleccionar cuenta */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pagar desde
            </label>
            <select
              value={cuentaSeleccionada}
              onChange={(e) => setCuentaSeleccionada(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {cuentas.length === 0 ? (
                <option value="">No tienes cuentas</option>
              ) : (
                cuentas.map((cuenta) => (
                  <option key={cuenta.IdCuenta} value={cuenta.Alias}>
                    {cuenta.Alias} - ${cuenta.Saldo.toLocaleString()}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Total a pagar */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-600">Total a pagar</span>
              </div>
              <span className="text-2xl font-bold text-blue-600">
                ${montoTotal.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Mensaje de error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Botón de pago */}
          <button
            onClick={handlePagar}
            disabled={isSubmitting || cuentas.length === 0}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <CreditCard className="w-5 h-5" />
            {isSubmitting ? "Procesando pago..." : "Pagar ahora"}
          </button>
        </div>
      </div>
    </div>
  );
};
