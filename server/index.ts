import express from "express";
import session from "express-session";
import pgSession from "connect-pg-simple";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import pool from "./db.js";

dotenv.config();

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PgSession = pgSession(session);

app.use(express.json());
app.use(
  session({
    store: new PgSession({
      pool,
      tableName: "session",
    }),
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

// --- Ejemplo de ruta API ---
app.get("/api/ping", (req, res) => {
  res.json({ message: "pong!" });
});

// --- Servir el frontend (vite build) ---
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
});
