import express from "express";
import pool from "./db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// Prueba de conexión:
app.get("/api/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ message: "Conexión exitosa", time: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Servidor corriendo en puerto ${PORT}`));