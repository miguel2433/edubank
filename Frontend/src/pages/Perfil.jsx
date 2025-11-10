import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Building, Edit2, Save, X, Shield, Key, Bell, ArrowUpDown, Search, Check } from 'lucide-react';


export const Perfil = () => {
  const [editando, setEditando] = useState(false);
  const [datos, setDatos] = useState({
    nombre: 'Juan Pérez',
    email: 'juan.perez@correo.com',
    telefono: '011-2222-3333',
    direccion: 'Calle Falsa 123',
    dni: '40123456',
    sucursal: 'Sucursal Central'
  });

  const [datosTemp, setDatosTemp] = useState(datos);

  const handleGuardar = () => {
    setDatos(datosTemp);
    setEditando(false);
  };

  const handleCancelar = () => {
    setDatosTemp(datos);
    setEditando(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Mi Perfil</h2>

      {/* Información personal */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {datos.nombre.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{datos.nombre}</h3>
              <p className="text-sm text-gray-500">Cliente desde Diciembre 2024</p>
            </div>
          </div>
          {!editando ? (
            <button 
              onClick={() => setEditando(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Editar
            </button>
          ) : (
            <div className="flex gap-2">
              <button 
                onClick={handleGuardar}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                Guardar
              </button>
              <button 
                onClick={handleCancelar}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <X className="w-4 h-4" />
                Cancelar
              </button>
            </div>
          )}
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4" />
                Nombre completo
              </label>
              {editando ? (
                <input
                  type="text"
                  value={datosTemp.nombre}
                  onChange={(e) => setDatosTemp({...datosTemp, nombre: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-900">{datos.nombre}</p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4" />
                Email
              </label>
              {editando ? (
                <input
                  type="email"
                  value={datosTemp.email}
                  onChange={(e) => setDatosTemp({...datosTemp, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-900">{datos.email}</p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4" />
                Teléfono
              </label>
              {editando ? (
                <input
                  type="tel"
                  value={datosTemp.telefono}
                  onChange={(e) => setDatosTemp({...datosTemp, telefono: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-900">{datos.telefono}</p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4" />
                Dirección
              </label>
              {editando ? (
                <input
                  type="text"
                  value={datosTemp.direccion}
                  onChange={(e) => setDatosTemp({...datosTemp, direccion: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-900">{datos.direccion}</p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4" />
                DNI
              </label>
              <p className="text-gray-900">{datos.dni}</p>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Building className="w-4 h-4" />
                Sucursal
              </label>
              <p className="text-gray-900">{datos.sucursal}</p>
            </div>
          </div>
        </div>
      </div>

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
                <p className="text-sm text-gray-500">Última modificación hace 3 meses</p>
              </div>
            </div>
            <span className="text-blue-600">→</span>
          </button>

          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-gray-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Autenticación en dos pasos</p>
                <p className="text-sm text-gray-500">Mayor seguridad en tu cuenta</p>
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
            { titulo: 'Notificaciones de transacciones', activo: true },
            { titulo: 'Alertas de seguridad', activo: true },
            { titulo: 'Ofertas y promociones', activo: false },
            { titulo: 'Recordatorios de pago', activo: true },
          ].map((notif, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-gray-900">{notif.titulo}</span>
              <button className={`relative w-12 h-6 rounded-full transition-colors ${notif.activo ? 'bg-blue-600' : 'bg-gray-300'}`}>
                <span className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${notif.activo ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
