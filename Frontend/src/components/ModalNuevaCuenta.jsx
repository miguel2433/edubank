import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { X, Loader2 } from "lucide-react";

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const cuentaData = {
      ...formData,
      Saldo: parseFloat(formData.Saldo),
      IdTipoCuenta: parseInt(formData.IdTipoCuenta),
      IdSucursal: parseInt(formData.IdSucursal),
    };

    await cuentasService.crearCuenta(cuentaData);
    // Actualizar la lista de cuentas
    const data = await cuentasService.getCuentasDelUsuario(usuario.IdUsuario);
    setCuentas(data);
    setIsModalOpen(false);
    // Resetear el formulario
    setFormData({
      IdTipoCuenta: 1,
      IdSucursal: 1,
      CBU: "",
      Alias: "",
      Saldo: "",
      Activa: true,
      FechaApertura: new Date().toISOString().split("T")[0],
    });
  } catch (error) {
    console.error("Error al crear la cuenta:", error);
    alert(error.message || "Error al crear la cuenta");
  } finally {
    setIsSubmitting(false);
  }
};



export const ModalNuevaCuenta = ({ setIsModalOpen, setCuentas }) => {
  const { usuario } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    IdTipoCuenta: 1,
    IdSucursal: 1,
    CBU: "",
    Alias: "",
    Saldo: "",
    Activa: true,
    FechaApertura: new Date().toISOString().split("T")[0],
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div>
      <div className="fixed inset-0 bg-black/15 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>

          <h3 className="text-xl font-bold mb-6">Nueva Cuenta</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Cuenta
              </label>
              <select
                name="IdTipoCuenta"
                value={formData.IdTipoCuenta}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value={1}>Caja de Ahorro</option>
                <option value={2}>Cuenta Corriente</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sucursal
              </label>
              <select
                name="IdSucursal"
                value={formData.IdSucursal}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value={1}>Sucursal Central</option>
                <option value={2}>Sucursal Norte</option>
                <option value={3}>Sucursal Sur</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CBU
              </label>
              <input
                type="text"
                name="CBU"
                value={formData.CBU}
                onChange={handleInputChange}
                placeholder="Ingrese el CBU"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                maxLength={22}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alias
              </label>
              <input
                type="text"
                name="Alias"
                value={formData.Alias}
                onChange={handleInputChange}
                placeholder="Ej: mi.cuenta.ahorro"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Saldo Inicial
              </label>
              <input
                type="number"
                name="Saldo"
                value={formData.Saldo}
                onChange={handleInputChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="activa"
                name="Activa"
                checked={formData.Activa}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="activa"
                className="ml-2 block text-sm text-gray-700"
              >
                Cuenta Activa
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                disabled={isSubmitting}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creando...
                  </>
                ) : (
                  "Crear Cuenta"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
