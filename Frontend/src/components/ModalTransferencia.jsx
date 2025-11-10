import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
export const ModalTransferencia = ({ cerrar, cuentaOrigen }) => {
  const [paso, setPaso] = useState(1);
  const [tipoDestino, setTipoDestino] = useState('cbu');
  const [datos, setDatos] = useState({
    destino: '',
    monto: '',
    descripcion: '',
    cuentaDestinoInfo: null
  });

  const contactosRecientes = [
    { nombre: 'María Gómez', cbu: '0000003300012345678903', alias: 'maria.corriente' },
    { nombre: 'Carlos López', cbu: '0000003400012345678904', alias: 'carlos.ahorro' },
    { nombre: 'Ana Martínez', cbu: '0000003500012345678905', alias: 'ana.comercial' },
  ];

  const validarDestino = () => {
    // Simular validación
    const contacto = contactosRecientes.find(c => 
      c.cbu === datos.destino || c.alias === datos.destino
    );
    if (contacto) {
      setDatos({...datos, cuentaDestinoInfo: contacto});
      setPaso(2);
    } else {
      alert('Destino no encontrado');
    }
  };

  const confirmarTransferencia = () => {
    setPaso(3);
    // Aquí iría la lógica para realizar la transferencia
    setTimeout(() => {
      cerrar();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
          <h3 className="text-xl font-bold text-gray-900">Nueva Transferencia</h3>
          <button onClick={cerrar} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Pasos */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((num) => (
              <React.Fragment key={num}>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    paso >= num ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {paso > num ? <Check className="w-5 h-5" /> : num}
                  </div>
                  <span className="text-xs mt-2 text-gray-600">
                    {num === 1 ? 'Destino' : num === 2 ? 'Monto' : 'Confirmar'}
                  </span>
                </div>
                {num < 3 && (
                  <div className={`flex-1 h-1 mx-2 ${paso > num ? 'bg-blue-600' : 'bg-gray-200'}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Paso 1: Seleccionar destino */}
          {paso === 1 && (
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <strong>Cuenta origen:</strong> {cuentaOrigen?.alias || 'juan.ahorro'}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Saldo disponible: ${cuentaOrigen?.saldo?.toLocaleString() || '150,000'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de destino
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTipoDestino('cbu')}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                      tipoDestino === 'cbu' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    CBU
                  </button>
                  <button
                    onClick={() => setTipoDestino('alias')}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                      tipoDestino === 'alias' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    Alias
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {tipoDestino === 'cbu' ? 'CBU destino' : 'Alias destino'}
                </label>
                <input
                  type="text"
                  value={datos.destino}
                  onChange={(e) => setDatos({...datos, destino: e.target.value})}
                  placeholder={tipoDestino === 'cbu' ? '0000003300012345678903' : 'maria.corriente'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Contactos recientes</p>
                <div className="space-y-2">
                  {contactosRecientes.map((contacto, index) => (
                    <button
                      key={index}
                      onClick={() => setDatos({...datos, destino: contacto.alias})}
                      className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-semibold text-gray-600">
                        {contacto.nombre.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{contacto.nombre}</p>
                        <p className="text-sm text-gray-500">{contacto.alias}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={validarDestino}
                disabled={!datos.destino}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Continuar
              </button>
            </div>
          )}

          {/* Paso 2: Ingresar monto */}
          {paso === 2 && (
            <div className="space-y-4">
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-900 mb-1">Transfiriendo a:</p>
                <p className="text-lg font-bold text-gray-900">{datos.cuentaDestinoInfo?.nombre}</p>
                <p className="text-sm text-gray-500">{datos.cuentaDestinoInfo?.alias}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monto a transferir
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-600">$</span>
                  <input
                    type="number"
                    value={datos.monto}
                    onChange={(e) => setDatos({...datos, monto: e.target.value})}
                    placeholder="0"
                    className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-lg text-2xl font-bold focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Saldo disponible: ${cuentaOrigen?.saldo?.toLocaleString() || '150,000'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción (opcional)
                </label>
                <textarea
                  value={datos.descripcion}
                  onChange={(e) => setDatos({...datos, descripcion: e.target.value})}
                  placeholder="Ej: Pago de alquiler"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setPaso(1)}
                  className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Atrás
                </button>
                <button
                  onClick={() => setPaso(3)}
                  disabled={!datos.monto || Number(datos.monto) <= 0}
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {/* Paso 3: Confirmación */}
          {paso === 3 && (
            <div className="space-y-4">
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">¡Transferencia Exitosa!</h4>
                <p className="text-gray-600">Tu transferencia fue procesada correctamente</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Destinatario</span>
                  <span className="font-medium text-gray-900">{datos.cuentaDestinoInfo?.nombre}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Monto</span>
                  <span className="font-bold text-green-600">${Number(datos.monto).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Fecha</span>
                  <span className="font-medium text-gray-900">{new Date().toLocaleDateString()}</span>
                </div>
                {datos.descripcion && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Concepto</span>
                    <span className="font-medium text-gray-900">{datos.descripcion}</span>
                  </div>
                )}
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
