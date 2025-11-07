import multer, { FileFilterCallback } from "multer";
import path from "path";
import { Request } from "express";

// 🔹 Extendemos el tipo Request para incluir req.file
export interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

// 🔹 Configuración del almacenamiento
const storage = multer.diskStorage({
  destination: (_req: Request, _file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: (_req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// 🔹 Filtro opcional de archivos (ejemplo: solo imágenes y PDFs)
const fileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de archivo no permitido"));
  }
};

// 🔹 Inicializamos multer con las configuraciones
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // límite: 5 MB
});

export default upload;
