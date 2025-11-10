const API_URL = "https://edubank.onrender.com/tiposCuentas";

export const tipoCuentaService = {
  async conseguirTiposCuentas() {
    const res = await fetch(`${API_URL}`, {
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
