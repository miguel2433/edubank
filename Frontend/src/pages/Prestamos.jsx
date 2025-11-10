import React from "react";
import { useState } from "react";
import { CheckCircle, Plus } from "lucide-react";

export const Prestamos = () => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [montoSolicitado, setMontoSolicitado] = useState(50000);
  const [plazo, setPlazo] = useState(12);

  const prestamos = [
    {
      id: 1,
      monto: 200000,
      tasaInteres: 10.5,
      plazoMeses: 24,
      cuotaMensual: 9458,
      fechaInicio: "2024-12-01",
      estado: "aprobado",
      cuotasPagadas: 2,
      cuotasPendientes: 22,
    },
  ];

  const calcularCuota = (monto, tasa, meses) => {
    const tasaMensual = tasa / 100 / 12;
    const cuota =
      (monto * (tasaMensual * Math.pow(1 + tasaMensual, meses))) /
      (Math.pow(1 + tasaMensual, meses) - 1);
    return cuota.toFixed(2);
  };

  const cuotaEstimada = calcularCuota(montoSolicitado, 10.5, plazo);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Préstamos</h2>
        <button
          onClick={() => setModalAbierto(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Solicitar Préstamo
        </button>
      </div>

      {/* Préstamos activos */}
      <div className="space-y-4">
        {prestamos.map((prestamo) => (
          <div
            key={prestamo.id}
            className="bg-white rounded-xl p-6 border border-gray-200"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Préstamo Personal
                </h3>
                <p className="text-sm text-gray-500">
                  Solicitado el {prestamo.fechaInicio}
                </p>
              </div>
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium w-fit">
                <CheckCircle className="w-4 h-4" />
                {prestamo.estado}
              </span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Monto prestado</p>
                <p className="text-xl font-bold text-gray-900">
                  ${prestamo.monto.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Tasa de interés</p>
                <p className="text-xl font-bold text-gray-900">
                  {prestamo.tasaInteres}%
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Cuota mensual</p>
                <p className="text-xl font-bold text-gray-900">
                  ${prestamo.cuotaMensual.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Plazo total</p>
                <p className="text-xl font-bold text-gray-900">
                  {prestamo.plazoMeses} meses
                </p>
              </div>
            </div>

            {/* Progreso */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Progreso de pago</span>
                <span className="font-medium text-gray-900">
                  {prestamo.cuotasPagadas} de {prestamo.plazoMeses} cuotas
                  pagadas
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{
                    width: `${
                      (prestamo.cuotasPagadas / prestamo.plazoMeses) * 100
                    }%`,
                  }}
                />
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 flex gap-3">
              <button className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium">
                Ver cronograma
              </button>
              <button className="flex-1 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors font-medium">
                Pagar cuota
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Ofertas de préstamos */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Ofertas disponibles</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { nombre: "Personal", tasa: 10.5, plazoMax: 60 },
            { nombre: "Hipotecario", tasa: 8.5, plazoMax: 360 },
            { nombre: "Prendario", tasa: 12.0, plazoMax: 72 },
          ].map((oferta, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
            >
              <h4 className="font-semibold text-gray-900 mb-2">
                {oferta.nombre}
              </h4>
              <p className="text-2xl font-bold text-blue-600 mb-1">
                {oferta.tasa}%
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Hasta {oferta.plazoMax} meses
              </p>
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                Simular
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de solicitud */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                Solicitar Préstamo
              </h3>
              <button
                onClick={() => setModalAbierto(false)}
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

              <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Solicitar préstamo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
