import React, { useState } from "react";
import { tarjetaService } from "../services/tarjetaService";

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : name === "IdCuenta" || name === "LimiteCredito" || name === "SaldoDisponible" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload = {
        ...form,
        LimiteCredito: form.Tipo === "credito" ? Number(form.LimiteCredito || 0) : 0,
        SaldoDisponible: form.Tipo === "credito" ? Number(form.SaldoDisponible || 0) : 0,
      };
      await tarjetaService.crearTarjeta(payload);
      if (onCreated) onCreated();
      onClose();
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
      setError(err.message || "Error al crear la tarjeta");
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

        {error && (
          <div className="mb-3 text-sm text-red-600">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">IdCuenta</label>
              <input
                type="number"
                name="IdCuenta"
                value={form.IdCuenta}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
                required
                min={1}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Tipo</label>
              <select
                name="Tipo"
                value={form.Tipo}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="debito">debito</option>
                <option value="credito">credito</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm text-gray-700 mb-1">Número de tarjeta</label>
              <input
                type="number"
                name="NumeroTarjeta"
                value={form.NumeroTarjeta}
                onChange={handleChange}
                placeholder="0000003200012345678906"
                className="w-full border rounded-lg px-3 py-2"
                required
                pattern="^[0-9]{16}$"
              />
            </div>

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
