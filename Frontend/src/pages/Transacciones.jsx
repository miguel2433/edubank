import React, { useState } from 'react'; 
import { Plus, TrendingUp, TrendingDown } from 'lucide-react';

export const Transacciones = () => {
  const [filtro, setFiltro] = useState('todas');
  
  const transacciones = [
    { id: 1, tipo: 'Transferencia recibida', descripcion: 'De María Gómez', monto: 5000, fecha: '2025-01-15 10:30', estado: 'completado' },
    { id: 2, tipo: 'Pago de servicios', descripcion: 'EDENOR - Luz', monto: -2500, fecha: '2025-01-14 15:20', estado: 'completado' },
    { id: 3, tipo: 'Retiro', descripcion: 'Cajero Automático', monto: -10000, fecha: '2025-01-13 18:45', estado: 'completado' },
    { id: 4, tipo: 'Transferencia', descripcion: 'A Carlos López', monto: -3000, fecha: '2025-01-12 09:15', estado: 'completado' },
    { id: 5, tipo: 'Depósito', descripcion: 'Sucursal Central', monto: 20000, fecha: '2025-01-10 11:00', estado: 'completado' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Transacciones</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Nueva Transacción
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex flex-wrap gap-2">
          {['todas', 'recibidas', 'enviadas', 'pagos'].map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filtro === f ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de transacciones */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="divide-y divide-gray-200">
          {transacciones.map((tx) => (
            <div key={tx.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${tx.monto > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                    {tx.monto > 0 ? <TrendingUp className="w-6 h-6 text-green-600" /> : <TrendingDown className="w-6 h-6 text-red-600" />}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{tx.tipo}</p>
                    <p className="text-sm text-gray-500">{tx.descripcion}</p>
                    <p className="text-xs text-gray-400 mt-1">{tx.fecha}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-xl font-bold ${tx.monto > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {tx.monto > 0 ? '+' : ''}${Math.abs(tx.monto).toLocaleString()}
                  </p>
                  <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    {tx.estado}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};