import { getFileStream, StorageServiceError } from "../utils/storageService.js";

// Proxy de visualización: el frontend nunca construye URLs hacia
// bucketService directamente, siempre pide /api/archivos/:key/view
// y el backend es quien consulta STORAGE_SERVICE_URL.
export const viewArchivo = async (req, res) => {
  try {
    const { key } = req.params;

    if (!key || key.includes("..") || key.includes("/")) {
      return res.status(400).json({ success: false, error: "Key de archivo inválida" });
    }

    const { stream, contentType } = await getFileStream(key);

    res.setHeader("Content-Type", contentType);
    stream.on("error", () => {
      if (!res.headersSent) {
        res.status(502).json({ success: false, error: "Error al obtener el archivo del almacenamiento" });
      }
    });
    stream.pipe(res);
  } catch (error) {
    const status = error instanceof StorageServiceError ? error.status : 500;
    res.status(status).json({ success: false, error: error.message });
  }
};
