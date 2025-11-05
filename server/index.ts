// server/index.ts
import express, { type Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createHttpServer, type Server } from "http";
import { registerRoutes } from "./routes";
import { setupVite } from "./vite"; // mantiene tu setupVite para dev
import { log } from "./vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// middlewares para parsear body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// middleware simple de logging que tenías antes (lo mantengo)
app.use((req, res, next) => {
  const start = Date.now();
  const pathReq = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  // override res.json para capturar body
  // @ts-ignore
  res.json = function (bodyJson: any, ...args: any[]) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (pathReq.startsWith("/api")) {
      let logLine = `${req.method} ${pathReq} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 200) logLine = logLine.slice(0, 199) + "…";
      log(logLine);
    }
  });

  next();
});

async function main() {
  const httpServer: Server = createHttpServer(app);

  // registra tus rutas API (implementa registerRoutes para añadir /api/*)
  await registerRoutes(app);

  // error handler (igual que tenías)
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    // no re-throw en producción, pero en dev puede ayudar
    // throw err;
  });

  // Si estamos en desarrollo montamos vite (middleware)
  if (app.get("env") === "development") {
    // setupVite usa createViteServer y middleware en dev
    await setupVite(app, httpServer);
  } else {
    // PRODUCCIÓN: servir archivos estáticos compilados por Vite (client/dist)
    const distPath = path.resolve(__dirname, "..", "client", "dist");
    if (!fs.existsSync(distPath)) {
      // Mensaje claro para debug
      console.error(`❌ Dist folder no encontrado en: ${distPath}`);
      console.error("Ejecuta `npm run build` dentro de /client antes de desplegar.");
    } else {
      app.use(express.static(distPath)); // sirve CSS, JS, assets
      // redirige todo al index.html (SPA)
      app.get("*", (_req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
      });
    }
  }

  const port = parseInt(process.env.PORT || "5000", 10);
  httpServer.listen({ port, host: "0.0.0.0" }, () => {
    log(`✅ Servidor corriendo en puerto ${port}`);
  });
}

main().catch((err) => {
  console.error("Error arrancando servidor:", err);
  process.exit(1);
});
