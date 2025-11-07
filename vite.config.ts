import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, "client"),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
    },
  },
  build: {
    // 📦 Output directo a donde Express espera los archivos
    outDir: path.resolve(__dirname, "client", "dist"),
    emptyOutDir: true,
  },
  server: {
    port: 5173,
  },
});