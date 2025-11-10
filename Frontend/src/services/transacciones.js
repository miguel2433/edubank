const API_URL = "https://edubank.onrender.com/transacciones";

export const transaccionService = {
  async conseguirTransaccionesDelUsuario(idUsuario) {
    const res = await fetch(`${API_URL}/usuario/${idUsuario}`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error al obtener tipos cuentas");
    }

    return res.json();
  }
};
