import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// 👉 Carpeta de archivos estáticos (AJUSTE AQUÍ)
const publicPath = path.join(__dirname, "../client/dist");
app.use(express.static(publicPath));

// 👉 Servir index.html en todas las rutas
app.get("*", (_req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});