import { useState } from "react";
import React from "react";
import {Eye, EyeOff, TrendingUp, TrendingDown, ArrowUpDown, Plus, DollarSign, CreditCard} from "lucide-react";
import { Link } from "react-router-dom";
import { ModalTransferencia } from "../components/ModalTransferencia";

export const Dashboard = () => {
  
  const [mostrarSaldo, setMostrarSaldo] = useState(true);
  const [modalTransferencia, setModalTransferencia] = useState(false);
  
  const cuentas = [
    { id: 1, tipo: 'Caja de Ahorro', saldo: 150000, cbu: '0000003100012345678901', alias: 'juan.ahorro' },
    { id: 2, tipo: 'Cuenta Corriente', saldo: 50000, cbu: '0000003200012345678902', alias: 'juan.corriente' },
  ];

  const transaccionesRecientes = [
    { id: 1, tipo: 'Transferencia recibida', monto: 5000, fecha: '2025-01-15', estado: 'completado' },
    { id: 2, tipo: 'Pago de servicios', monto: -2500, fecha: '2025-01-14', estado: 'completado' },
    { id: 3, tipo: 'Retiro', monto: -10000, fecha: '2025-01-13', estado: 'completado' },
  ];

  return (
    <div className="space-y-6">
      {/* Bienvenida */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">¡Hola, Juan!</h2>
        <p className="text-blue-100">Bienvenido a tu banca digital</p>
      </div>

      {/* Resumen de cuentas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-gray-600 text-sm font-medium">Saldo Total</h3>
            <button onClick={() => setMostrarSaldo(!mostrarSaldo)}>
              {mostrarSaldo ? <Eye className="w-5 h-5 text-gray-400" /> : <EyeOff className="w-5 h-5 text-gray-400" />}
            </button>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {mostrarSaldo ? '$200,000' : '••••••'}
          </p>
          <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            +2.5% este mes
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-gray-600 text-sm font-medium mb-4">Mis Cuentas</h3>
          <p className="text-3xl font-bold text-gray-900">{cuentas.length}</p>
          <p className="text-sm text-gray-500 mt-2">Cuentas activas</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-gray-600 text-sm font-medium mb-4">Transacciones</h3>
          <p className="text-3xl font-bold text-gray-900">45</p>
          <p className="text-sm text-gray-500 mt-2">Este mes</p>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button onClick={() => setModalTransferencia(true)} className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <ArrowUpDown className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium">Transferir</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Plus className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm font-medium">Depositar</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium">Préstamo</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-sm font-medium">Pagar</span>
          </button>
        </div>
      </div>

      {/* Mis Cuentas */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Mis Cuentas</h3>
          <button className="text-blue-600 text-sm font-medium hover:underline">Ver todas</button>
        </div>
        <div className="space-y-3">
          {cuentas.map((cuenta) => (
            <div key={cuenta.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900">{cuenta.tipo}</p>
                <p className="text-sm text-gray-500">{cuenta.alias}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">
                  {mostrarSaldo ? `$${cuenta.saldo.toLocaleString()}` : '••••••'}
                </p>
                <p className="text-xs text-gray-500">{cuenta.cbu.slice(-4)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transacciones recientes */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Transacciones Recientes</h3>
          <button className="text-blue-600 text-sm font-medium hover:underline">Ver todas</button>
        </div>
        <div className="space-y-3">
          {transaccionesRecientes.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.monto > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                  {tx.monto > 0 ? <TrendingUp className="w-5 h-5 text-green-600" /> : <TrendingDown className="w-5 h-5 text-red-600" />}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{tx.tipo}</p>
                  <p className="text-sm text-gray-500">{tx.fecha}</p>
                </div>
              </div>
              <p className={`font-bold ${tx.monto > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {tx.monto > 0 ? '+' : ''}${Math.abs(tx.monto).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
      {modalTransferencia && (
        <ModalTransferencia cerrar={() => setModalTransferencia(false)} cuentaOrigen={cuentas[0]} />
      )}
    </div>
  );
};
