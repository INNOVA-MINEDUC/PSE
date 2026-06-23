import jwt from "jsonwebtoken";

/**
 * Verifica el Bearer JWT emitido por PSE.
 * Adjunta req.user con los campos mínimos necesarios para auditoría:
 *   id, nombre, correo, usuario, rol
 */
export const requireToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, error: "Token requerido" });
  }

  const token = authHeader.slice(7);

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const [rows] = await req.db.query(
      `SELECT id, full_name, email, usuario, role, activo
       FROM users WHERE id = ? AND activo = 1 LIMIT 1`,
      [payload.id]
    );

    if (!rows.length) {
      return res.status(401).json({ success: false, error: "Sesión inválida" });
    }

    const u = rows[0];
    req.user = {
      id:      u.id,
      nombre:  u.full_name,
      correo:  u.email,
      usuario: u.usuario,
      rol:     u.role,
    };

    next();
  } catch {
    return res.status(401).json({ success: false, error: "Token inválido o expirado" });
  }
};

/**
 * Requiere que el usuario autenticado tenga el rol indicado.
 * Debe usarse después de requireToken.
 */
export const requireRole = (rol) => (req, res, next) => {
  if (!req.user || req.user.rol !== rol) {
    return res.status(403).json({ success: false, error: "Sin permisos suficientes" });
  }
  next();
};
