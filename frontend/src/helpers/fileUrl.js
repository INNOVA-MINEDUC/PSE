// Resuelve el valor guardado en BD para imágenes/archivos (key de
// bucketService) a una URL visualizable en el navegador, manteniendo
// compatibilidad con registros antiguos que aún tengan rutas locales
// (/uploads/..., uploads/... o URLs absolutas del backend anterior).
const STORAGE_URL = import.meta.env.VITE_STORAGE_URL || "";

export function resolveFileUrl(value, apiUrl = "") {
  if (!value) return "";
  if (value.startsWith("http")) return value;
  if (value.startsWith("/uploads") || value.startsWith("uploads/")) {
    const path = value.startsWith("/") ? value : `/${value}`;
    return `${apiUrl}${path}`;
  }
  return `${STORAGE_URL}/${value}/view`;
}
