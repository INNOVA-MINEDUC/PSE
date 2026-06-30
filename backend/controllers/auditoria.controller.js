const PAGE_LIMIT = 25;

function buildWhere({ modulo, accion, desde, hasta }) {
  const conds  = [];
  const params = [];
  if (modulo) { conds.push("modulo = ?");              params.push(modulo); }
  if (accion)  { conds.push("accion = ?");              params.push(accion);  }
  if (desde)   { conds.push("DATE(created_at) >= ?");   params.push(desde);  }
  if (hasta)   { conds.push("DATE(created_at) <= ?");   params.push(hasta);  }
  return {
    where:  conds.length ? "WHERE " + conds.join(" AND ") : "",
    params,
  };
}

export const listAuditoria = async (req, res) => {
  try {
    const page   = Math.max(1, parseInt(req.query.page) || 1);
    const limit  = PAGE_LIMIT;
    const offset = (page - 1) * limit;

    const { where, params } = buildWhere(req.query);

    const [[{ total }], registros] = await Promise.all([
      req.db.query(`SELECT COUNT(*) AS total FROM audit_log ${where}`, params),
      req.db.query(
        `SELECT id, created_at, usuario_nombre, usuario_email,
                modulo, accion, descripcion
         FROM audit_log ${where}
         ORDER BY created_at DESC LIMIT ? OFFSET ?`,
        [...params, limit, offset]
      ),
    ]);

    return res.json({
      success:   true,
      registros: registros[0],
      total,
      page,
      pages:     Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("listAuditoria:", err.message);
    return res.status(500).json({ success: false, error: "Error interno" });
  }
};
