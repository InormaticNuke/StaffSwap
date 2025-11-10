import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  // 📁 Indica que tu proyecto React está dentro de /client
  root: path.resolve(__dirname, "client"),

  build: {
    // 📦 Donde Vite generará los archivos finales
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
    },
  },
});