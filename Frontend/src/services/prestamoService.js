const API_URL = "https://edubank.onrender.com/prestamos";

export const prestamoService = {
  async getPrestamosDelUsuario(idUsuario) {
    const res = await fetch(`${API_URL}/usuario/${idUsuario}`, {
      method: "GET",
      credentials: "include",
    });
    if (res.status === 404) {
      // Usuario sin prestamos → devolver array vacío
      return [];
    }

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error al obtener prestamos del usuario");
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
        throw new Error(error.message || "Error al crear prestamo del usuario");
    }

    return res.json();
    }
};
