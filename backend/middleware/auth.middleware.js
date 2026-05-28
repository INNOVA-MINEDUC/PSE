import axios from "axios";

export const requireToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, error: "Token requerido" });
  }

  try {
    const response = await axios.post(
      process.env.API,
      {
        query: `query { usuarioActual { nombres apellidos roles { clave nombre } } }`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      }
    );

    if (response.data.errors) {
      return res.status(401).json({ success: false, error: "Token inválido" });
    }

    // Disponible en handlers downstream: req.usuarioActual.nombres, .apellidos, .roles
    req.usuarioActual = response?.data?.data?.usuarioActual || null;

    // TODO: validar rol admin — pendiente de coordinar con equipo ASISTO
    // Cuando entreguen la clave de rol, descomentar y ajustar ADMIN_ROLE_KEY en .env:
    //
    // const ADMIN_ROLE = process.env.ADMIN_ROLE_KEY; // ej: "PSE_ADMIN"
    // const hasRole = req.usuarioActual?.roles?.some(r => r.clave === ADMIN_ROLE);
    // if (!hasRole) {
    //   return res.status(403).json({ success: false, error: "Sin permisos de administrador" });
    // }

    next();
  } catch (err) {
    console.error("Error auth middleware:", err.response?.data || err.message);
    return res.status(401).json({ success: false, error: "Error validando token" });
  }
};
