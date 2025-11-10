import React, { useState } from "react";
import { CheckCircle, Plus } from "lucide-react";
import { ModalPrestamo } from "../components/ModalPrestamo";

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
    return parseFloat(cuota.toFixed(2));
  };

  const cuotaEstimada = calcularCuota(montoSolicitado, 10.5, plazo);

  const handleSolicitarPrestamo = () => {
    // Aquí iría la lógica para solicitar el préstamo
    console.log('Solicitando préstamo:', { montoSolicitado, plazo, cuotaEstimada });
    setModalAbierto(false);
  };

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
      <ModalPrestamo
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
        montoSolicitado={montoSolicitado}
        setMontoSolicitado={setMontoSolicitado}
        plazo={plazo}
        setPlazo={setPlazo}
        cuotaEstimada={cuotaEstimada}
        onSolicitarPrestamo={handleSolicitarPrestamo}
      />
    </div>
  );
};
