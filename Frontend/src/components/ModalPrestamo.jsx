import React from 'react';

export const ModalPrestamo = ({
  isOpen,
  onClose,
  montoSolicitado,
  setMontoSolicitado,
  plazo,
  setPlazo,
  cuotaEstimada,
  onSolicitarPrestamo
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/15 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">
            Solicitar Préstamo
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monto a solicitar
            </label>
            <input
              type="range"
              min="10000"
              max="500000"
              step="10000"
              value={montoSolicitado}
              onChange={(e) => setMontoSolicitado(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>$10.000</span>
              <span className="text-xl font-bold text-blue-600">
                ${montoSolicitado.toLocaleString()}
              </span>
              <span>$500.000</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Plazo en meses
            </label>
            <select
              value={plazo}
              onChange={(e) => setPlazo(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={6}>6 meses</option>
              <option value={12}>12 meses</option>
              <option value={24}>24 meses</option>
              <option value={36}>36 meses</option>
              <option value={48}>48 meses</option>
            </select>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">
                Cuota mensual estimada
              </span>
              <span className="font-bold text-gray-900">
                ${parseFloat(cuotaEstimada).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Tasa de interés</span>
              <span className="font-semibold text-gray-900">
                10.5% anual
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total a pagar</span>
              <span className="font-bold text-blue-600">
                ${(cuotaEstimada * plazo).toLocaleString()}
              </span>
            </div>
          </div>

          <button 
            onClick={onSolicitarPrestamo}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Solicitar préstamo
          </button>
        </div>
      </div>
    </div>
  );
};
