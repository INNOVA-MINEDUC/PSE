import bcrypt from "bcrypt";

const ROLES_VALIDOS = ["admin", "user"];

const mapUser = (u) => ({
  id:             u.id,
  nombre:         u.full_name,
  correo:         u.email,
  usuario:        u.usuario,
  rol:            u.role,
  activo:         Boolean(u.activo),
  creado_en:      u.created_at,
  actualizado_en: u.actualizado_en,
});

export const listUsuarios = async (req, res) => {
  try {
    const [rows] = await req.db.query(
      `SELECT id, full_name, email, usuario, role, activo, created_at, actualizado_en
       FROM users ORDER BY id ASC`
    );
    return res.json({ success: true, usuarios: rows.map(mapUser) });
  } catch (err) {
    console.error("listUsuarios:", err.message);
    return res.status(500).json({ success: false, error: "Error interno" });
  }
};

export const createUsuario = async (req, res) => {
  const { nombre, correo, usuario, password, rol } = req.body;

  if (!nombre || !correo || !usuario || !password || !rol) {
    return res.status(400).json({
      success: false,
      error: "nombre, correo, usuario, password y rol son obligatorios.",
    });
  }

  if (!ROLES_VALIDOS.includes(rol)) {
    return res.status(400).json({ success: false, error: "Rol inválido." });
  }

  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      error: "La contraseña debe tener al menos 8 caracteres.",
    });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const [result] = await req.db.query(
      `INSERT INTO users (full_name, email, usuario, password_hash, role, activo)
       VALUES (?, ?, ?, ?, ?, 1)`,
      [
        nombre.trim(),
        correo.trim().toLowerCase(),
        usuario.trim(),
        passwordHash,
        rol,
      ]
    );

    return res.status(201).json({ success: true, id: result.insertId });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        error: "El correo o nombre de usuario ya está registrado.",
      });
    }
    console.error("createUsuario:", err.message);
    return res.status(500).json({ success: false, error: "Error interno" });
  }
};

export const updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, correo, usuario, rol } = req.body;

  if (!nombre || !correo || !usuario || !rol) {
    return res.status(400).json({
      success: false,
      error: "nombre, correo, usuario y rol son obligatorios.",
    });
  }

  if (!ROLES_VALIDOS.includes(rol)) {
    return res.status(400).json({ success: false, error: "Rol inválido." });
  }

  try {
    const [result] = await req.db.query(
      `UPDATE users SET full_name = ?, email = ?, usuario = ?, role = ? WHERE id = ?`,
      [nombre.trim(), correo.trim().toLowerCase(), usuario.trim(), rol, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: "Usuario no encontrado." });
    }

    return res.json({ success: true });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        error: "El correo o nombre de usuario ya está registrado.",
      });
    }
    console.error("updateUsuario:", err.message);
    return res.status(500).json({ success: false, error: "Error interno" });
  }
};

export const toggleActivo = async (req, res) => {
  const { id } = req.params;

  if (Number(id) === req.user.id) {
    return res.status(400).json({
      success: false,
      error: "No puedes desactivar tu propio usuario.",
    });
  }

  try {
    const [rows] = await req.db.query(
      "SELECT activo FROM users WHERE id = ?",
      [id]
    );

    if (!rows.length) {
      return res.status(404).json({ success: false, error: "Usuario no encontrado." });
    }

    const nuevoEstado = rows[0].activo ? 0 : 1;
    await req.db.query("UPDATE users SET activo = ? WHERE id = ?", [nuevoEstado, id]);

    return res.json({ success: true, activo: Boolean(nuevoEstado) });
  } catch (err) {
    console.error("toggleActivo:", err.message);
    return res.status(500).json({ success: false, error: "Error interno" });
  }
};

export const resetPassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  if (!password || password.length < 8) {
    return res.status(400).json({
      success: false,
      error: "La contraseña debe tener al menos 8 caracteres.",
    });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const [result] = await req.db.query(
      "UPDATE users SET password_hash = ? WHERE id = ?",
      [passwordHash, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: "Usuario no encontrado." });
    }

    return res.json({ success: true });
  } catch (err) {
    console.error("resetPassword:", err.message);
    return res.status(500).json({ success: false, error: "Error interno" });
  }
};
