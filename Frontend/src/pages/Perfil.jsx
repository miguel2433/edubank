import React, { useState } from "react";
import { Shield, Key, Bell } from "lucide-react";
import { FormularioPerfil } from "../components/FormularioPerfil";

export const Perfil = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Mi Perfil</h2>
      <FormularioPerfil></FormularioPerfil>
      {/* Seguridad */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Seguridad
          </h3>
        </div>
        <div className="p-6 space-y-3">
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <Key className="w-5 h-5 text-gray-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Cambiar contraseña</p>
                <p className="text-sm text-gray-500">
                  Última modificación hace 3 meses
                </p>
              </div>
            </div>
            <span className="text-blue-600">→</span>
          </button>

          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-gray-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">
                  Autenticación en dos pasos
                </p>
                <p className="text-sm text-gray-500">
                  Mayor seguridad en tu cuenta
                </p>
              </div>
            </div>
            <div className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
              Activo
            </div>
          </button>
        </div>
      </div>

      {/* Preferencias */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notificaciones
          </h3>
        </div>
        <div className="p-6 space-y-4">
          {[
            { titulo: "Notificaciones de transacciones", activo: true },
            { titulo: "Alertas de seguridad", activo: true },
            { titulo: "Ofertas y promociones", activo: false },
            { titulo: "Recordatorios de pago", activo: true },
          ].map((notif, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-gray-900">{notif.titulo}</span>
              <button
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  notif.activo ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${
                    notif.activo ? "left-7" : "left-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
