import React, { useState, useEffect } from "react";
import { tarjetaService } from "../services/tarjetaService";
import { cuentasService } from "../services/cuentasService";
import { useAuth } from "../context/AuthContext";

const ModalCrearTarjeta = ({ open, onClose, onCreated }) => {
  const [form, setForm] = useState({
    IdCuenta: "",
    NumeroTarjeta: "",
    FechaVencimiento: "",
    CVV: "",
    Tipo: "debito",
    
    LimiteCredito: 0,
    SaldoDisponible: 0,
    Activa: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cuentas, setCuentas] = useState([]);
  const { usuario } = useAuth();

  // Traer cuentas del usuario
  useEffect(() => {
    const fetchCuentas = async () => {
      if (!usuario) return;
      setLoading(true);
      try {
        const data = await cuentasService.getCuentasDelUsuario(usuario.IdUsuario);
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "IdCuenta"
          ? Number(value)
          : value, // NumeroTarjeta se queda como string
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // Preparamos payload
      const payload = {
        ...form,
        LimiteCredito: form.Tipo === "credito" ? Number(form.LimiteCredito || 0) : 0,
        SaldoDisponible: form.Tipo === "credito" ? Number(form.SaldoDisponible || 0) : 0,
      };

      console.log("Payload a enviar:", payload); // debug
      await tarjetaService.crearTarjeta(payload);

      if (onCreated) onCreated();
      onClose();

      // Reset form
      setForm({
        IdCuenta: "",
        NumeroTarjeta: "",
        FechaVencimiento: "",
        CVV: "",
        Tipo: "debito",
        LimiteCredito: 0,
        SaldoDisponible: 0,
        Activa: true,
      });
    } catch (err) {
      console.error("Error crear tarjeta:", err.response?.data || err.message);
      setError(err.response?.data?.message || err.message || "Error al crear la tarjeta");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg rounded-xl shadow-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Crear tarjeta</h3>

        {error && <div className="mb-3 text-sm text-red-600">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Selección de cuenta */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cuenta
              </label>
              <select
                name="IdCuenta"
                value={form.IdCuenta}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Selecciona una cuenta</option>
                {cuentas.map((cuenta) => (
                  <option key={cuenta.IdCuenta} value={cuenta.IdCuenta}>
                    {cuenta.Alias || `CBU: ${cuenta.CBU}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Tipo de tarjeta */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">Tipo</label>
              <select
                name="Tipo"
                value={form.Tipo}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="debito">Débito</option>
                <option value="credito">Crédito</option>
              </select>
            </div>

            {/* Número de tarjeta */}
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-700 mb-1">Número de tarjeta</label>
              <input
                type="text"
                name="NumeroTarjeta"
                value={form.NumeroTarjeta}
                onChange={handleChange}
                placeholder="16 dígitos"
                className="w-full border rounded-lg px-3 py-2"
                required
                pattern="^[0-9]{16}$"
              />
            </div>

            {/* Fecha de vencimiento */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">Fecha de vencimiento</label>
              <input
                type="date"
                name="FechaVencimiento"
                value={form.FechaVencimiento}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
                required
              />
            </div>

            {/* CVV */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">CVV</label>
              <input
                type="password"
                name="CVV"
                value={form.CVV}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
                required
                pattern="^[0-9]{3,4}$"
              />
            </div>

            {/* Límites para crédito */}
            {form.Tipo === "credito" && (
              <>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Límite de crédito</label>
                  <input
                    type="number"
                    name="LimiteCredito"
                    value={form.LimiteCredito}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                    min={0}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Saldo disponible</label>
                  <input
                    type="number"
                    name="SaldoDisponible"
                    value={form.SaldoDisponible}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                    min={0}
                  />
                </div>
              </>
            )}

            {/* Activa */}
            <div className="md:col-span-2 flex items-center gap-2">
              <input
                id="activa"
                type="checkbox"
                name="Activa"
                checked={form.Activa}
                onChange={handleChange}
                className="h-4 w-4"
              />
              <label htmlFor="activa" className="text-sm text-gray-700">Activa</label>
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Creando..." : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalCrearTarjeta;
