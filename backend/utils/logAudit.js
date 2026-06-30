// Función utilitaria para registrar eventos en audit_log.
// Fire-and-forget: tiene su propio try/catch y nunca propaga errores
// ni bloquea la operación principal.

const CAMPOS_EXCLUIDOS = new Set([
  "password_hash",
  "password",
  "token",
  "jwt",
  "secret",
  "refresh_token",
  "access_token",
]);

function sanitizar(obj) {
  if (!obj || typeof obj !== "object") return obj;
  const limpio = {};
  for (const [k, v] of Object.entries(obj)) {
    if (!CAMPOS_EXCLUIDOS.has(k.toLowerCase())) {
      limpio[k] = v;
    }
  }
  return limpio;
}

function resolverIp(req) {
  const forwarded = req.headers?.["x-forwarded-for"];
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.ip ?? req.connection?.remoteAddress ?? null;
}

/**
 * Registra un evento en audit_log.
 *
 * @param {import('express').Request} req
 * @param {{
 *   accion:          string,
 *   modulo:          string,
 *   entidad_id?:     number,
 *   descripcion?:    string,
 *   valores_ant?:    object,
 *   valores_nuevo?:  object,
 *   usuario_override?: { id?: number, nombre?: string, correo?: string }
 * }} opciones
 */
export async function logAudit(req, opciones) {
  try {
    const {
      accion,
      modulo,
      entidad_id,
      descripcion,
      valores_ant,
      valores_nuevo,
      usuario_override,
    } = opciones;

    const usuario = usuario_override ?? req.user ?? null;

    await req.db.query(
      `INSERT INTO audit_log
         (usuario_id, usuario_nombre, usuario_email,
          accion, modulo, entidad_id,
          descripcion, valores_ant, valores_nuevo, ip_origen)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        usuario?.id     ?? null,
        usuario?.nombre ?? null,
        usuario?.correo ?? null,
        accion,
        modulo,
        entidad_id ?? null,
        descripcion ?? null,
        valores_ant   ? JSON.stringify(sanitizar(valores_ant))   : null,
        valores_nuevo ? JSON.stringify(sanitizar(valores_nuevo)) : null,
        resolverIp(req),
      ]
    );
  } catch (err) {
    console.error("[audit] Error registrando evento:", err.message);
  }
}
