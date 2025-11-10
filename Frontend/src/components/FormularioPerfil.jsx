import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Edit2,
  Save,
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Building,
} from "lucide-react";
import { editarPerfilService } from "../services/prefilService";

export const FormularioPerfil = () => {
  const { usuario, setUsuario } = useAuth();
  const [cargando, setCargando] = useState(false);
  
  const [editando, setEditando] = useState(false);


  const [datos, setDatos] = useState({
    Nombre: "",
    Email: "",
    Telefono: "",
    Direccion: "",
    DNI: "",
    sucursal: "",
    IdUsuario: "",
  });

  const [datosTemp, setDatosTemp] = useState(datos);

  const handleGuardar = async () => {
    setCargando(true);
    const nuevoUsuario = await editarPerfilService(datosTemp);
    setEditando(false);
    setUsuario(nuevoUsuario);
    setCargando(false);
  };

  const handleCancelar = () => {
    setDatosTemp(datos);
    setEditando(false);
  };

  useEffect(() => {
    if (usuario) {
      setDatos({
        IdUsuario: usuario.IdUsuario,
        Nombre: usuario.Nombre || "",
        Email: usuario.Email || "",
        Telefono: usuario.Telefono || "",
        Direccion: usuario.Direccion || "",
        DNI: usuario.DNI || "",
        sucursal: usuario.sucursal || {},
      });
      setDatosTemp({
        IdUsuario: usuario.IdUsuario,
        Nombre: usuario.Nombre || "",
        Email: usuario.Email || "",
        Telefono: usuario.Telefono || "",
        Direccion: usuario.Direccion || "",
        DNI: usuario.DNI || "",
        sucursal: usuario.sucursal || {},
      });
    }
  }, [usuario]);

  return (
    <>
      {/* Información personal */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {datos.Nombre}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {datos.Nombre}
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
                disabled={cargando}
                onClick={handleGuardar}
                className={`flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors ${cargando ? "cursor-not-allowed opacity-70" : ""}`}
              >
                {cargando ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Guardar
                  </>
                )}
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
                  value={datosTemp.Nombre}
                  onChange={(e) =>
                    setDatosTemp({ ...datosTemp, Nombre: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-900">{datos.Nombre}</p>
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
                  value={datosTemp.Email}
                  onChange={(e) =>
                    setDatosTemp({ ...datosTemp, Email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-900">{datos.Email}</p>
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
                  value={datosTemp.Telefono}
                  onChange={(e) =>
                    setDatosTemp({ ...datosTemp, Telefono: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-900">{datos.Telefono}</p>
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
                  value={datosTemp.Direccion}
                  onChange={(e) =>
                    setDatosTemp({ ...datosTemp, Direccion: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-900">{datos.Direccion}</p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4" />
                DNI
              </label>
              <p className="text-gray-900">{datos.DNI}</p>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Building className="w-4 h-4" />
                Sucursal
              </label>
              <p className="text-gray-900">{datos.sucursal.Nombre}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
