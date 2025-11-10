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
    async crearCuenta(data) {
    const res = await fetch(`${API_URL}`, {
        method: "POST",
        credentials: "include",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Error al crear la cuenta del usuario");
    }

    return res.json();
    }
};
