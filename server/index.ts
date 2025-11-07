import express from "express";
import path from "path";
import dotenv from "dotenv";
import pool from "./db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Ruta correcta al frontend
const __dirname = path.resolve();
const clientDistPath = path.join(__dirname, "client", "dist");

app.use(express.static(clientDistPath));

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "API funcionando correctamente" });
});

// ✅ Todas las rutas no-API mandan a index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});

// ✅ Conexión a la DB
pool.connect()
  .then(() => console.log("✅ Conexión a PostgreSQL exitosa"))
  .catch((err) => console.error("❌ Error al conectar con PostgreSQL:", err));

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});