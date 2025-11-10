import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Edit2, Save, X, User, Mail, Phone, MapPin, Building } from "lucide-react";

export const FormularioPerfil = ({}) => {
  const { usuario } = useAuth();
  console.log(usuario)
  const [editando, setEditando] = useState(false);
  const [datos, setDatos] = useState({
    nombre: usuario?.user?.nombre || "",
    email: usuario?.user?.email || "",
    telefono: usuario?.user?.telefono || "",
    direccion: usuario?.user?.direccion || "",
    dni: usuario?.user?.dni || "",
    sucursal: usuario?.user?.sucursal || "",
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

  useEffect(()=>{
    const datosUser = ()=>{
      const datosUser = usuario?.user;
      if (datosUser) {
        setDatos(datosUser);
      }
    }
    datosUser();
  },[usuario])

  return (
    <>
      {/* Información personal */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {datos.nombre
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {datos.nombre}
              </h3>
              <p className="text-sm text-gray-500">
                Cliente desde Diciembre 2024
              </p>
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
      </div>
      {/* formulario */}
      <div>
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
                  onChange={(e) =>
                    setDatosTemp({ ...datosTemp, nombre: e.target.value })
                  }
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
                  onChange={(e) =>
                    setDatosTemp({ ...datosTemp, email: e.target.value })
                  }
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
                  onChange={(e) =>
                    setDatosTemp({ ...datosTemp, telefono: e.target.value })
                  }
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
                  onChange={(e) =>
                    setDatosTemp({ ...datosTemp, direccion: e.target.value })
                  }
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
    </>
  );
};
