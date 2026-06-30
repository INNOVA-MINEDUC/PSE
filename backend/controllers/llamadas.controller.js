import { logAudit } from "../utils/logAudit.js";

export const getLlamadas = async (req, res) => {
  res.json({ success: true, message: "Ruta Centro de llamadas 1528 activa", data: [] });
};

export const getMetricasLlamadas = async (req, res) => {
  try {
    const [[row]] = await req.db.query(
      `SELECT id, total_llamadas, casos_atendidos, usuarios_beneficiados, periodo, video_url
       FROM metricas_llamadas ORDER BY id DESC LIMIT 1`
    );
    if (!row) return res.status(404).json({ success: false, error: "Sin datos registrados" });
    res.json({ success: true, data: row });
  } catch (err) {
    console.error("ERROR getMetricasLlamadas:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const updateMetricasLlamadas = async (req, res) => {
  try {
    const {
      total_llamadas = 0,
      casos_atendidos = 0,
      usuarios_beneficiados = 0,
      periodo = "",
      video_url = "",
    } = req.body;

    const [[anterior]] = await req.db.query(
      `SELECT total_llamadas, casos_atendidos, usuarios_beneficiados, periodo
       FROM metricas_llamadas ORDER BY id DESC LIMIT 1`
    );

    await req.db.query(
      `UPDATE metricas_llamadas
       SET total_llamadas = ?,
           casos_atendidos = ?,
           usuarios_beneficiados = ?,
           periodo = ?,
           video_url = ?
       ORDER BY id DESC LIMIT 1`,
      [total_llamadas, casos_atendidos, usuarios_beneficiados, periodo, video_url]
    );

    await logAudit(req, {
      accion:       "METRICAS_LLAMADAS_ACTUALIZADAS",
      modulo:       "llamadas",
      descripcion:  `Métricas de llamadas actualizadas (período: ${periodo || "sin período"})`,
      valores_ant:  anterior ?? null,
      valores_nuevo: { total_llamadas, casos_atendidos, usuarios_beneficiados, periodo },
    });

    res.json({ success: true, message: "Métricas de llamadas actualizadas" });
  } catch (err) {
    console.error("ERROR updateMetricasLlamadas:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
