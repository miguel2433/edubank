const API_URL = "https://edubank.onrender.com/cuentas";

export const cuentasService = {
  async getCuentasDelUsuario(idUsuario) {
    const res = await fetch(`${API_URL}/usuario/${idUsuario}`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error al obtener cuentas del usuario");
    }

    return res.json();
  },

  async crearCuenta(datosCuenta) {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(datosCuenta),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error al crear la cuenta");
    }

    return res.json();
  },
};
