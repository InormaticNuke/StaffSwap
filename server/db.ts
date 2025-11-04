import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false, // importante para DigitalOcean
  },
});

pool.connect()
  .then(() => console.log("✅ Conectado a PostgreSQL en DigitalOcean"))
  .catch((err) => console.error("❌ Error al conectar con PostgreSQL:", err));

export default pool;