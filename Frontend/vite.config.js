import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  base: "/", // 🔹 Importante para rutas absolutas en producción
  build: {
    outDir: "dist", // 🔹 Carpeta de salida (Vercel usará esta)
  },
});
