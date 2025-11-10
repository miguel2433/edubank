import React from "react";
import { Plus, CreditCard } from "lucide-react";

export const MisCuentas = () => {
  const cuentas = [
    { id: 1, tipo: 'Caja de Ahorro', saldo: 150000, cbu: '0000003100012345678901', alias: 'juan.ahorro', activa: true },
    { id: 2, tipo: 'Cuenta Corriente', saldo: 50000, cbu: '0000003200012345678902', alias: 'juan.corriente', activa: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Mis Cuentas</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Nueva Cuenta
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cuentas.map((cuenta) => (
          <div key={cuenta.id} className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-blue-100 text-sm mb-1">Saldo disponible</p>
                  <p className="text-3xl font-bold">${cuenta.saldo.toLocaleString()}</p>
                </div>
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
              </div>
              
              <div className="space-y-2">
                <div>
                  <p className="text-blue-100 text-xs">Tipo de cuenta</p>
                  <p className="font-semibold">{cuenta.tipo}</p>
                </div>
                <div>
                  <p className="text-blue-100 text-xs">CBU</p>
                  <p className="font-mono text-sm">{cuenta.cbu}</p>
                </div>
                <div>
                  <p className="text-blue-100 text-xs">Alias</p>
                  <p className="font-semibold">{cuenta.alias}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white border-opacity-20 flex gap-3">
                <button className="flex-1 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Ver detalles
                </button>
                <button className="flex-1 bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Transferir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
