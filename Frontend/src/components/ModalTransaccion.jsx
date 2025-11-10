import React, { useState, useEffect } from "react";
import { X, Check, Loader2, ArrowUpDown, ArrowUp, ArrowDown, CreditCard } from "lucide-react";
import { transaccionService } from "../services/transacciones";
import { cuentasService } from "../services/cuentasService";
import { useAuth } from "../context/AuthContext";

export const ModalTransaccion = ({ cerrar, onTransaccionCreada }) => {
  const { usuario } = useAuth();
  const [paso, setPaso] = useState(1);
  const [cuentasUsuario, setCuentasUsuario] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transaccionExitosa, setTransaccionExitosa] = useState(null);

  const [formData, setFormData] = useState({
    Tipo: "deposito",
    IdCuentaOrigen: null,
    IdCuentaDestino: null,
    Monto: "",
    Descripcion: "",
    Estado: "completado",
  });

  // Cargar cuentas del usuario al montar el componente
  useEffect(() => {
    const fetchCuentas = async () => {
      if (!usuario?.IdUsuario) return;
      try {
        const cuentas = await cuentasService.getCuentasDelUsuario(usuario.IdUsuario);
        setCuentasUsuario(cuentas);
      } catch (error) {
        console.error("Error al cargar cuentas:", error);
      }
    };
    fetchCuentas();
  }, [usuario]);

  const tiposTransaccion = [
    {
      tipo: "deposito",
      nombre: "Depósito",
      descripcion: "Agregar dinero a una cuenta",
      icon: ArrowDown,
      color: "bg-green-500",
    },
    {
      tipo: "retiro",
      nombre: "Retiro",
      descripcion: "Extraer dinero de una cuenta",
      icon: ArrowUp,
      color: "bg-red-500",
    },
    {
      tipo: "transferencia",
      nombre: "Transferencia",
      descripcion: "Transferir entre cuentas",
      icon: ArrowUpDown,
      color: "bg-blue-500",
    },
    {
      tipo: "pago",
      nombre: "Pago",
      descripcion: "Realizar un pago",
      icon: CreditCard,
      color: "bg-purple-500",
    },
  ];

  const handleTipoChange = (tipo) => {
    setFormData({
      ...formData,
      Tipo: tipo,
      IdCuentaOrigen: null,
      IdCuentaDestino: null,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name.includes("IdCuenta") ? (value ? parseInt(value) : null) : value,
    });
  };

  const validarPaso1 = () => {
    const { Tipo, IdCuentaOrigen, IdCuentaDestino } = formData;

    // Validaciones según tipo de transacción
    if (Tipo === "deposito" && !IdCuentaDestino) {
      alert("Debe seleccionar una cuenta destino para el depósito");
      return false;
    }

    if (Tipo === "retiro" && !IdCuentaOrigen) {
      alert("Debe seleccionar una cuenta origen para el retiro");
      return false;
    }

    if (Tipo === "transferencia" && (!IdCuentaOrigen || !IdCuentaDestino)) {
      alert("Debe seleccionar cuenta origen y destino para la transferencia");
      return false;
    }

    if (Tipo === "transferencia" && IdCuentaOrigen === IdCuentaDestino) {
      alert("La cuenta origen y destino no pueden ser la misma");
      return false;
    }

    if (Tipo === "pago" && !IdCuentaOrigen) {
      alert("Debe seleccionar una cuenta origen para el pago");
      return false;
    }

    setPaso(2);
  };

  const validarYEnviar = async () => {
    const { Monto } = formData;

    if (!Monto || parseFloat(Monto) <= 0) {
      alert("El monto debe ser mayor a 0");
      return;
    }

    // Validar saldo en cuenta origen
    if (formData.IdCuentaOrigen) {
      const cuentaOrigen = cuentasUsuario.find(
        (c) => c.IdCuenta === formData.IdCuentaOrigen
      );
      if (cuentaOrigen && parseFloat(Monto) > cuentaOrigen.Saldo) {
        alert("Saldo insuficiente en la cuenta origen");
        return;
      }
    }

    setIsSubmitting(true);
    try {
      // Preparar datos para enviar
      const transaccionData = {
        Tipo: formData.Tipo,
        Monto: parseFloat(formData.Monto),
        Descripcion: formData.Descripcion || null,
        Estado: formData.Estado,
      };

      // Agregar cuentas según el tipo
      if (formData.Tipo === "deposito") {
        transaccionData.IdCuentaDestino = formData.IdCuentaDestino;
      } else if (formData.Tipo === "retiro") {
        transaccionData.IdCuentaOrigen = formData.IdCuentaOrigen;
      } else if (formData.Tipo === "transferencia") {
        transaccionData.IdCuentaOrigen = formData.IdCuentaOrigen;
        transaccionData.IdCuentaDestino = formData.IdCuentaDestino;
      } else if (formData.Tipo === "pago") {
        transaccionData.IdCuentaOrigen = formData.IdCuentaOrigen;
      }

      const resultado = await transaccionService.crear(transaccionData);
      setTransaccionExitosa(resultado);
      setPaso(3);

      // Notificar al componente padre si existe
      if (onTransaccionCreada) {
        onTransaccionCreada(resultado);
      }
    } catch (error) {
      console.error("Error al crear transacción:", error);
      alert(error.message || "Error al crear la transacción");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCuentaInfo = (idCuenta) => {
    return cuentasUsuario.find((c) => c.IdCuenta === idCuenta);
  };

  const tipoActual = tiposTransaccion.find((t) => t.tipo === formData.Tipo);

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
          <h3 className="text-xl font-bold text-gray-900">Nueva Transacción</h3>
          <button onClick={cerrar} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Indicador de pasos */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((num) => (
              <React.Fragment key={num}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      paso >= num
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {paso > num ? <Check className="w-5 h-5" /> : num}
                  </div>
                  <span className="text-xs mt-2 text-gray-600">
                    {num === 1 ? "Tipo y Cuentas" : num === 2 ? "Monto" : "Confirmar"}
                  </span>
                </div>
                {num < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      paso > num ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6">
          {/* Paso 1: Seleccionar tipo y cuentas */}
          {paso === 1 && (
            <div className="space-y-6">
              {/* Selector de tipo de transacción */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Tipo de Transacción
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {tiposTransaccion.map((tipo) => {
                    const Icon = tipo.icon;
                    return (
                      <button
                        key={tipo.tipo}
                        onClick={() => handleTipoChange(tipo.tipo)}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          formData.Tipo === tipo.tipo
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-10 h-10 rounded-lg ${tipo.color} flex items-center justify-center`}
                          >
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{tipo.nombre}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {tipo.descripcion}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selección de cuentas según el tipo */}
              <div className="space-y-4">
                {/* Cuenta Origen (para retiro, transferencia y pago) */}
                {(formData.Tipo === "retiro" ||
                  formData.Tipo === "transferencia" ||
                  formData.Tipo === "pago") && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cuenta Origen
                    </label>
                    <select
                      name="IdCuentaOrigen"
                      value={formData.IdCuentaOrigen || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Seleccione una cuenta</option>
                      {cuentasUsuario.map((cuenta) => (
                        <option key={cuenta.IdCuenta} value={cuenta.IdCuenta}>
                          {cuenta.Alias} - ${cuenta.Saldo.toLocaleString()} -{" "}
                          {cuenta.tipoCuenta?.Nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Cuenta Destino (para depósito y transferencia) */}
                {(formData.Tipo === "deposito" ||
                  formData.Tipo === "transferencia") && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cuenta Destino
                    </label>
                    <select
                      name="IdCuentaDestino"
                      value={formData.IdCuentaDestino || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Seleccione una cuenta</option>
                      {cuentasUsuario
                        .filter(
                          (cuenta) => cuenta.IdCuenta !== formData.IdCuentaOrigen
                        )
                        .map((cuenta) => (
                          <option key={cuenta.IdCuenta} value={cuenta.IdCuenta}>
                            {cuenta.Alias} - ${cuenta.Saldo.toLocaleString()} -{" "}
                            {cuenta.tipoCuenta?.Nombre}
                          </option>
                        ))}
                    </select>
                  </div>
                )}
              </div>

              <button
                onClick={validarPaso1}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Continuar
              </button>
            </div>
          )}

          {/* Paso 2: Ingresar monto y descripción */}
          {paso === 2 && (
            <div className="space-y-4">
              {/* Resumen de cuentas seleccionadas */}
              <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  {tipoActual && (
                    <>
                      <div
                        className={`w-8 h-8 rounded-lg ${tipoActual.color} flex items-center justify-center`}
                      >
                        <tipoActual.icon className="w-4 h-4 text-white" />
                      </div>
                      <p className="font-semibold text-gray-900">
                        {tipoActual.nombre}
                      </p>
                    </>
                  )}
                </div>

                {formData.IdCuentaOrigen && (
                  <div>
                    <p className="text-xs text-gray-600">Cuenta Origen:</p>
                    <p className="font-medium text-gray-900">
                      {getCuentaInfo(formData.IdCuentaOrigen)?.Alias}
                    </p>
                    <p className="text-sm text-gray-500">
                      Saldo: $
                      {getCuentaInfo(formData.IdCuentaOrigen)?.Saldo.toLocaleString()}
                    </p>
                  </div>
                )}

                {formData.IdCuentaDestino && (
                  <div>
                    <p className="text-xs text-gray-600">Cuenta Destino:</p>
                    <p className="font-medium text-gray-900">
                      {getCuentaInfo(formData.IdCuentaDestino)?.Alias}
                    </p>
                  </div>
                )}
              </div>

              {/* Monto */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monto
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-600">
                    $
                  </span>
                  <input
                    type="number"
                    name="Monto"
                    value={formData.Monto}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                    step="0.01"
                    className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-lg text-2xl font-bold focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción (opcional)
                </label>
                <textarea
                  name="Descripcion"
                  value={formData.Descripcion}
                  onChange={handleInputChange}
                  placeholder="Ej: Pago de servicios"
                  rows={3}
                  maxLength={255}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
              </div>

              {/* Estado */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado
                </label>
                <select
                  name="Estado"
                  value={formData.Estado}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="completado">Completado</option>
                  <option value="pendiente">Pendiente</option>
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setPaso(1)}
                  className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Atrás
                </button>
                <button
                  onClick={validarYEnviar}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    "Confirmar Transacción"
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Paso 3: Confirmación exitosa */}
          {paso === 3 && transaccionExitosa && (
            <div className="space-y-4">
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  ¡Transacción Exitosa!
                </h4>
                <p className="text-gray-600">
                  Tu {tipoActual?.nombre.toLowerCase()} fue procesada correctamente
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Tipo</span>
                  <span className="font-medium text-gray-900 capitalize">
                    {transaccionExitosa.Tipo}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Monto</span>
                  <span className="font-bold text-green-600">
                    ${transaccionExitosa.Monto.toLocaleString()}
                  </span>
                </div>
                {transaccionExitosa.cuentaOrigen && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Cuenta Origen</span>
                    <span className="font-medium text-gray-900">
                      {transaccionExitosa.cuentaOrigen.Alias}
                    </span>
                  </div>
                )}
                {transaccionExitosa.cuentaDestino && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Cuenta Destino</span>
                    <span className="font-medium text-gray-900">
                      {transaccionExitosa.cuentaDestino.Alias}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Fecha</span>
                  <span className="font-medium text-gray-900">
                    {new Date(transaccionExitosa.Fecha).toLocaleDateString()}
                  </span>
                </div>
                {transaccionExitosa.Descripcion && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Concepto</span>
                    <span className="font-medium text-gray-900">
                      {transaccionExitosa.Descripcion}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Estado</span>
                  <span
                    className={`font-medium capitalize ${
                      transaccionExitosa.Estado === "completado"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {transaccionExitosa.Estado}
                  </span>
                </div>
              </div>

              <button
                onClick={cerrar}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Finalizar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
