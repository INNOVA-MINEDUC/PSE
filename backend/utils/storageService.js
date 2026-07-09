// Cliente del microservicio externo de almacenamiento (bucketService).
// Toda subida/eliminación de imágenes y archivos de PSE pasa por aquí
// en vez de escribir al disco local del backend.

import axios from "axios";
import FormData from "form-data";

// Error normalizado para que los controladores/middlewares puedan responder
// al frontend con un mensaje claro y un status HTTP adecuado, sin propagar
// el error crudo de axios.
export class StorageServiceError extends Error {
  constructor(message, status = 502) {
    super(message);
    this.name = "StorageServiceError";
    this.status = status;
  }
}

// Cliente axios perezoso: STORAGE_SERVICE_URL/STORAGE_API_KEY se leen de
// process.env recién cuando se hace la primera llamada real, nunca al
// importar el módulo. Esto evita depender del orden en que dotenv.config()
// corre respecto a los imports en ESM.
function getClient() {
  const baseURL = process.env.STORAGE_SERVICE_URL;
  if (!baseURL) {
    throw new StorageServiceError(
      "Configuración inválida del servicio de almacenamiento. Verifique STORAGE_SERVICE_URL.",
      500
    );
  }
  return axios.create({ baseURL, timeout: 30000 });
}

function getApiKeyHeader() {
  const apiKey = process.env.STORAGE_API_KEY;
  if (!apiKey) {
    throw new StorageServiceError(
      "Configuración inválida del servicio de almacenamiento. Verifique STORAGE_API_KEY.",
      500
    );
  }
  return { "X-API-Key": apiKey };
}

function normalizeError(err) {
  if (err instanceof StorageServiceError) return err;
  if (err.code === "ERR_INVALID_URL") {
    return new StorageServiceError(
      "Configuración inválida del servicio de almacenamiento. Verifique STORAGE_SERVICE_URL.",
      500
    );
  }
  if (err.code === "ECONNABORTED") {
    return new StorageServiceError("El servicio de almacenamiento no respondió a tiempo.", 504);
  }
  if (err.response) {
    const mensaje =
      err.response.data?.error ||
      err.response.data?.message ||
      "El servicio de almacenamiento rechazó la solicitud.";
    return new StorageServiceError(mensaje, err.response.status >= 500 ? 502 : err.response.status);
  }
  return new StorageServiceError("No se pudo conectar con el servicio de almacenamiento.", 502);
}

/**
 * Un valor guardado en BD es una key de bucketService (y no una ruta local
 * heredada del almacenamiento en disco) si no es una URL absoluta ni
 * apunta a /uploads del backend.
 */
export function isBucketKey(value) {
  if (!value || typeof value !== "string") return false;
  return !value.startsWith("http") && !value.startsWith("/uploads") && !value.startsWith("uploads/");
}

// Forma exacta que bucketService devuelve como key: UUID + extensión
// (ej. "a7c0ab65-9839-4529-b0f4-74927488dd20.webp"). Es una allowlist, no una
// blacklist: cualquier cosa que no calce con este patrón se rechaza antes de
// interpolarla en la URL hacia bucketService, sin importar qué caracteres
// traiga (evita SSRF / path traversal / cambio de host o protocolo).
const BUCKET_KEY_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.[a-z0-9]{1,10}$/i;

export function isValidBucketKey(value) {
  return typeof value === "string" && BUCKET_KEY_PATTERN.test(value);
}

function assertValidKey(key) {
  if (!isValidBucketKey(key)) {
    throw new StorageServiceError("Key de archivo inválida.", 400);
  }
}

export async function checkHealth() {
  try {
    const { data } = await getClient().get("/health");
    return data;
  } catch (err) {
    throw normalizeError(err);
  }
}

/**
 * Sube un único archivo (buffer en memoria) al bucketService, tal cual
 * fue recibido (sin reprocesarlo) — bucketService es responsable de
 * cualquier conversión/optimización.
 * @returns {Promise<{ key: string, size: number, mimeType: string }>}
 */
export async function uploadFile(buffer, filename, mimeType) {
  const form = new FormData();
  form.append("file", buffer, { filename, contentType: mimeType });

  try {
    const { data } = await getClient().post("/", form, {
      headers: { ...form.getHeaders(), ...getApiKeyHeader() },
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    });
    return data.data;
  } catch (err) {
    throw normalizeError(err);
  }
}

/**
 * Sube varios archivos en una sola petición usando /batch.
 * @param {Array<{ buffer: Buffer, filename: string, mimeType: string }>} files
 * @returns {Promise<{ uploaded: Array, failed: Array }>}
 */
export async function uploadFiles(files) {
  const form = new FormData();
  for (const f of files) {
    form.append("files", f.buffer, { filename: f.filename, contentType: f.mimeType });
  }

  try {
    const { data } = await getClient().post("/batch", form, {
      headers: { ...form.getHeaders(), ...getApiKeyHeader() },
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    });
    return data.data;
  } catch (err) {
    throw normalizeError(err);
  }
}

/**
 * Obtiene el archivo como stream directamente del bucketService, para que
 * el backend actúe de proxy y el frontend nunca hable con bucketService
 * directamente.
 * @returns {Promise<{ stream: import('stream').Readable, contentType: string }>}
 */
export async function getFileStream(key) {
  assertValidKey(key);
  try {
    const response = await getClient().get(`/${key}/view`, {
      headers: { ...getApiKeyHeader() },
      responseType: "stream",
    });
    return {
      stream: response.data,
      contentType: response.headers["content-type"] || "application/octet-stream",
    };
  } catch (err) {
    throw normalizeError(err);
  }
}

export async function deleteFile(key) {
  assertValidKey(key);
  try {
    const { data } = await getClient().delete(`/${key}`, {
      headers: { ...getApiKeyHeader() },
    });
    return data;
  } catch (err) {
    throw normalizeError(err);
  }
}
