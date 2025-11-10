const API_URL = "https://edubank.onrender.com/transacciones";

export const transaccionService = {
  async conseguirTransaccionesDelUsuario(idUsuario) {
    const res = await fetch(`${API_URL}/usuario/${idUsuario}`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error al obtener transacciones del usuario");
    }

    return res.json();
  },

  async listar() {
    const res = await fetch(`${API_URL}`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error al obtener transacciones");
    }

    return res.json();
  },

  async getId(id) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error al obtener la transacción");
    }

    return res.json();
  },

  async crear(data) {
    data.IdCuentaOrigen = Number(data.IdCuentaOrigen);
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
      throw new Error(error.message || "Error al crear la transacción");
    }

    return res.json();
  },

  async actualizar(id, data) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error al actualizar la transacción");
    }

    return res.json();
  },

  async eliminar(id) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error al eliminar la transacción");
    }

    return res.json();
  },
};
