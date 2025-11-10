const API_URL = "https://edubank.onrender.com/sucursales";

export const sucursalService = {
  async conseguirSucursales() {
    const res = await fetch(`${API_URL}`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error al obtener sucursales");
    }

    return res.json();
  }
};
