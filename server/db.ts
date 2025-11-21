import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  ssl: {
    rejectUnauthorized: false,
  },
});

(async () => {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("✅ Conexión exitosa:", result.rows[0]);
  } catch (err) {
    console.error("❌ Error de conexión:", err);
  } finally {
    pool.end();
  }
})();