const API_URL = "https://edubank.onrender.com/tarjetas";

export const tarjetaService = {
  async getTarjetasDelUsuario(idUsuario) {
    const res = await fetch(`${API_URL}/usuario/${idUsuario}`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      // Si el error es porque no hay tarjetas, devolvemos un array vacío
      if (res.status === 400) {
        return [];
      }
      const error = await res.json();
      throw new Error(error.message || "Error al obtener tarjetas del usuario");
    }

    return res.json();
  },
    async crearTarjeta(data) {
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
        throw new Error(error.message || "Error al crear la Tarjeta del usuario");
    }

    return res.json();
    }
};
