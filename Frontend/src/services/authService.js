const API_URL = "https://edubank.onrender.com/usuarios"; // Ajustá tu URL base real

export const authService = {
  // 🔹 Registro de usuario
  async register(data) {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include", // permite cookies cross-site
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error al registrar usuario");
    }

    return res.json();
  },

  // 🔹 Login
  async login(credentials) {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
      credentials: "include",
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Credenciales incorrectas");
    }

    return res.json();
  },

  // 🔹 Logout
  async logout() {
    const res = await fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Error al cerrar sesión");
    return res.json();
  },

  // 🔹 Verificar sesión activa
  async me() {
    const res = await fetch(`${API_URL}/me`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) return null; // No hay sesión
    return res.json();
  },
};
