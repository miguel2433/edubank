import React, { useState, useEffect } from "react";
import { CheckCircle, Plus, DollarSign } from "lucide-react";
import { ModalPrestamo } from "../components/ModalPrestamo";
import { ModalPagarPrestamo } from "../components/ModalPagarPrestamo";
import { useAuth } from "../context/AuthContext";
import { prestamoService } from "../services/prestamoService";

export const Prestamos = () => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalPagarAbierto, setModalPagarAbierto] = useState(false);
  const [prestamoSeleccionado, setPrestamoSeleccionado] = useState(null);
  const [montoSolicitado, setMontoSolicitado] = useState(50000);
  const [plazo, setPlazo] = useState(12);
  const [prestamos, setPrestamos] = useState([]);
  const { usuario, cargando } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const calcularCuota = (monto, tasa, meses) => {
    const tasaMensual = tasa / 100 / 12;
    const cuota =
      (monto * (tasaMensual * Math.pow(1 + tasaMensual, meses))) /
      (Math.pow(1 + tasaMensual, meses) - 1);
    return parseFloat(cuota.toFixed(2));
  };

  const cuotaEstimada = calcularCuota(montoSolicitado, 10.5, plazo);

  const fetchPrestamos = async () => {
    if (!usuario) return;

    setLoading(true);
    setError("");
    try {
      const data = await prestamoService.getPrestamosDelUsuario(usuario.IdUsuario);
      setPrestamos(data || []);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los préstamos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrestamos();
  }, [usuario]);

  const handlePrestamoCreado = () => {
    fetchPrestamos();
  };

  const handleAbrirModalPago = (prestamo) => {
    setPrestamoSeleccionado(prestamo);
    setModalPagarAbierto(true);
  };

  const handlePagoExitoso = () => {
    fetchPrestamos();
    setModalPagarAbierto(false);
    setPrestamoSeleccionado(null);
  };

  if (cargando || loading) return <p className="text-gray-600">Cargando préstamos...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!usuario) return <p className="text-gray-600">Iniciá sesión para ver tus préstamos.</p>;

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

      <div className="space-y-4">
        {prestamos.length === 0 && <p className="text-gray-600">No tenés préstamos actualmente.</p>}

        {prestamos.map((prestamo) => {
          const cuotasPagadas = prestamo.Pagado || 0;


          const progreso = (prestamo.Pagado || 0) / prestamo.PlazoMeses * 100;


          return (
            <div key={prestamo.IdPrestamo} className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Préstamo Personal</h3>
                  <p className="text-sm text-gray-500">
                    Solicitado el {prestamo.FechaInicio?.slice(0, 10) || "N/A"}
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium w-fit">
                  <CheckCircle className="w-4 h-4" />
                  {prestamo.Estado}
                </span>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Monto prestado", value: `$${prestamo.Monto.toLocaleString()}` },
                  { label: "Tasa de interés", value: `${prestamo.TasaInteres}%` },
                  { label: "Cuota mensual", value: `$${prestamo.CuotaMensual.toLocaleString()}` },
                  { label: "Plazo total", value: `${prestamo.PlazoMeses} meses` },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-sm text-gray-600 mb-1">{item.label}</p>
                    <p className="text-xl font-bold text-gray-900">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Progreso de pago animado */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progreso de pago</span>
                  <span className="font-medium text-gray-900">
                    {cuotasPagadas} de {prestamo.PlazoMeses} cuotas pagadas
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${progreso}%` }}
                  />
                </div>
              </div>

              {/* Botón de pagar */}
              {prestamo.Estado !== "pagado" && cuotasPagadas < prestamo.PlazoMeses && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleAbrirModalPago(prestamo)}
                    className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
                  >
                    <DollarSign className="w-5 h-5" />
                    Pagar cuotas
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <ModalPrestamo
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
        montoSolicitado={montoSolicitado}
        setMontoSolicitado={setMontoSolicitado}
        plazo={plazo}
        setPlazo={setPlazo}
        cuotaEstimada={cuotaEstimada}
        onPrestamoCreado={handlePrestamoCreado}
      />

      <ModalPagarPrestamo
        isOpen={modalPagarAbierto}
        onClose={() => {
          setModalPagarAbierto(false);
          setPrestamoSeleccionado(null);
        }}
        prestamo={prestamoSeleccionado}
        onPagoExitoso={handlePagoExitoso}
      />
    </div>
  );
};
