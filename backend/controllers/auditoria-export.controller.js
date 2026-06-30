import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { existsSync } from 'fs';
import PDFDocument from 'pdfkit';
import ExcelJS from 'exceljs';

// ── Rutas a logos del proyecto ────────────────────────────────────
const _dir    = dirname(fileURLToPath(import.meta.url));
const LOGOS   = join(_dir, '../../frontend/public/Home/LOGOS');
const L_MSPAS   = join(LOGOS, 'logo-mspas.png');
const L_MINEDUC = join(LOGOS, 'logo-mineduc.png');
const L_DIGIKAL = join(LOGOS, 'logo-digikal.png');
const L_DCE     = join(LOGOS, 'logo-dce.png');

// ── Colores ───────────────────────────────────────────────────────
const NAVY   = '#071a40';
const AMBER  = '#f59e0b';
const WHITE  = '#ffffff';
const GRAY_L = '#f9fafb';
const GRAY_T = '#6b7280';
const BLK    = '#111827';
const BORDER = '#e5e7eb';

const CARD_COLORS = [
  '#b45309', '#0e7490', '#1e3a5f',
  '#065f46', '#5b21b6', '#9d174d',
  '#0369a1', '#7c3aed',
];

// ── Etiquetas legibles por acción ─────────────────────────────────
const ACTION_LABELS = {
  LOGIN_EXITOSO:                      'Inicio de sesi\xF3n',
  LOGIN_FALLIDO:                      'Inicio fallido',
  USUARIO_CREADO:                     'Usuario creado',
  USUARIO_ACTUALIZADO:                'Usuario actualizado',
  USUARIO_ACTIVADO:                   'Usuario activado',
  USUARIO_DESACTIVADO:                'Usuario desactivado',
  PASSWORD_RESETEADA:                 'Contrase\xF1a reseteada',
  NOTICIA_CREADA:                     'Noticia creada',
  NOTICIA_ACTUALIZADA:                'Noticia actualizada',
  NOTICIA_ELIMINADA:                  'Noticia eliminada',
  IMAGEN_NOTICIA_SUBIDA:              'Imagen subida',
  IMAGEN_NOTICIA_ELIMINADA:           'Imagen eliminada',
  METRICAS_ATENCION_ACTUALIZADAS:     'M\xE9tricas atenci\xF3n',
  METRICAS_MEDICAMENTOS_ACTUALIZADAS: 'M\xE9tricas medicamentos',
  METRICAS_LLAMADAS_ACTUALIZADAS:     'M\xE9tricas llamadas',
  METRICAS_FUNERARIO_ACTUALIZADAS:    'M\xE9tricas funerario',
};
const accionLabel = (k) => (k && ACTION_LABELS[k]) ? ACTION_LABELS[k] : (k || '—');

// ── Fechas ────────────────────────────────────────────────────────
const pad2 = (n) => String(n).padStart(2, '0');

const MONTHS_ES = [
  'enero','febrero','marzo','abril','mayo','junio',
  'julio','agosto','septiembre','octubre','noviembre','diciembre',
];
const DAYS_ES = [
  'domingo','lunes','martes','mi\xE9rcoles','jueves','viernes','s\xE1bado',
];

const fmtTime = (d) => {
  const dt = new Date(d);
  const h  = dt.getHours();
  return `${h % 12 || 12}:${pad2(dt.getMinutes())} ${h >= 12 ? 'p. m.' : 'a. m.'}`;
};
const fmtDateLong = (d) => {
  const dt = new Date(d);
  return `${pad2(dt.getDate())} de ${MONTHS_ES[dt.getMonth()]} de ${dt.getFullYear()}`;
};
const fmtDT = (d) => {
  if (!d) return '—';
  const dt = new Date(d);
  return `${pad2(dt.getDate())}/${pad2(dt.getMonth() + 1)}/${dt.getFullYear()}, ${fmtTime(dt)}`;
};

// ── SQL helpers ───────────────────────────────────────────────────
function buildWhere({ modulo, accion, desde, hasta }) {
  const conds  = [];
  const params = [];
  if (modulo) { conds.push('modulo = ?');            params.push(modulo); }
  if (accion)  { conds.push('accion = ?');            params.push(accion); }
  if (desde)   { conds.push('DATE(created_at) >= ?'); params.push(desde); }
  if (hasta)   { conds.push('DATE(created_at) <= ?'); params.push(hasta); }
  return { where: conds.length ? 'WHERE ' + conds.join(' AND ') : '', params };
}

async function fetchFiltered(db, query) {
  const { where, params } = buildWhere(query);
  const [rows] = await db.query(
    `SELECT id, created_at, usuario_nombre, usuario_email, modulo, accion, descripcion
     FROM audit_log ${where} ORDER BY created_at DESC`,
    params
  );
  return rows;
}

async function getGenerador(db, userId) {
  try {
    const [[u]] = await db.query(
      'SELECT full_name, email FROM users WHERE id = ? LIMIT 1', [userId]
    );
    return u ? { nombre: u.full_name, correo: u.email } : null;
  } catch { return null; }
}

function buildFiltrosLabel({ modulo, accion, desde, hasta }) {
  const parts = [];
  if (modulo) parts.push(`M\xF3dulo: ${modulo}`);
  if (accion)  parts.push(`Acci\xF3n: ${accionLabel(accion)}`);
  if (desde)   parts.push(`Desde: ${desde}`);
  if (hasta)   parts.push(`Hasta: ${hasta}`);
  return parts.length ? parts.join('  |  ') : 'Ninguno';
}

// ── Imagen segura (no lanza si falta el archivo) ──────────────────
function tryImage(doc, path, x, y, opts) {
  if (existsSync(path)) {
    try { doc.image(path, x, y, opts); } catch { /* logo inaccesible */ }
  }
}

// ── Encabezado con logos estilo SIGEC (fondo navy) ───────────────
const HDR_H = 76;

function drawPageHeader(doc, W, M) {
  // Fondo navy completo
  doc.rect(0, 0, W, 73).fill(NAVY);

  // Logos transparentes directo sobre navy
  tryImage(doc, L_MSPAS,   M,       6, { fit: [92, 58] });
  tryImage(doc, L_MINEDUC, M + 100, 6, { fit: [92, 58] });
  tryImage(doc, L_DIGIKAL, W - M - 163, 14, { fit: [72, 40] });

  // DCE tiene fondo blanco en el PNG → panel blanco contenido
  doc.roundedRect(W - M - 87, 8, 79, 55, 3).fill(WHITE);
  tryImage(doc, L_DCE, W - M - 85, 10, { fit: [75, 51] });

  // Título y subtítulo centrados (sobre el fondo navy)
  const TX = M + 202;
  const TW = W - M - 170 - TX;
  doc.fillColor(WHITE).fontSize(16).font('Helvetica-Bold')
     .text('PSE — Bit\xE1cora de Auditor\xEDa', TX, 18, {
       width: TW, align: 'center', lineBreak: false,
     });
  doc.fillColor('#93c5fd').fontSize(8.5).font('Helvetica')
     .text('Ministerio de Educaci\xF3n de Guatemala', TX, 40, {
       width: TW, align: 'center', lineBreak: false,
     });

  // Franja dorada inferior
  doc.rect(0, 73, W, 3).fill(AMBER);
}

// ── Pie de página ─────────────────────────────────────────────────
function drawFooter(doc, W, H, M, CW, now, pageNum) {
  doc.rect(M, H - 22, CW, 0.5).fill(BORDER);
  doc.fillColor(GRAY_T).fontSize(7.5).font('Helvetica')
     .text(
       `Portal PSE — MINEDUC  \xB7  P\xE1gina ${pageNum}  \xB7  ${DAYS_ES[now.getDay()]}, ${fmtDateLong(now)}`,
       M, H - 15, { width: CW, align: 'center', lineBreak: false },
     );
}

// ── Caja de metadatos ─────────────────────────────────────────────
function drawMetaBox(doc, W, M, CW, now, gen, total, filtrosLabel) {
  const BY = HDR_H + 12;
  const BH = 46;
  const LP = 12;
  const LW = 116;

  doc.rect(M, BY, CW, BH).fill('#f8fafc');
  doc.strokeColor(BORDER).lineWidth(0.5).rect(M, BY, CW, BH).stroke();

  const lx = M + LP;
  const lv = lx + LW;

  doc.fillColor(BLK).fontSize(8.5).font('Helvetica-Bold')
     .text('Documento generado:', lx, BY + 9, { lineBreak: false });
  doc.fillColor(GRAY_T).font('Helvetica')
     .text(`${fmtDateLong(now)} a las ${fmtTime(now)}`, lv, BY + 9, { lineBreak: false });

  doc.fillColor(BLK).font('Helvetica-Bold')
     .text('Generado por:', lx, BY + 27, { lineBreak: false });
  doc.fillColor(GRAY_T).font('Helvetica')
     .text(
       gen ? `${gen.nombre} (${gen.correo})` : '—',
       lv, BY + 27, { width: W / 2 - lv - LP, lineBreak: false },
     );

  const rx = W / 2 + 22;
  const rv = rx + LW;

  doc.fillColor(BLK).font('Helvetica-Bold')
     .text('Total de registros:', rx, BY + 9, { lineBreak: false });
  doc.fillColor(GRAY_T).font('Helvetica')
     .text(String(total), rv, BY + 9, { lineBreak: false });

  doc.fillColor(BLK).font('Helvetica-Bold')
     .text('Filtros aplicados:', rx, BY + 27, { lineBreak: false });
  doc.fillColor(GRAY_T).font('Helvetica')
     .text(filtrosLabel, rv, BY + 27, {
       width: W - M - rv - LP, lineBreak: false,
     });

  return BY + BH + 14;
}

// ── Color por tipo de acción (columna Acción en la tabla) ─────────
function accionColor(label) {
  if (!label || label === '—') return BLK;
  if (/sesi[oó]n|Inicio/.test(label))  return '#1e40af';  // azul
  if (/fallido/i.test(label))           return '#dc2626';  // rojo
  if (/Noticia/.test(label))            return '#065f46';  // verde
  if (/Usuario/.test(label))            return '#6d28d9';  // morado
  if (/Imagen/.test(label))             return '#0e7490';  // cian
  if (/Contrase/.test(label))           return '#b45309';  // ámbar
  if (/M[eé]tricas/.test(label))        return '#92400e';  // naranja
  return BLK;
}

// ── EXPORTAR PDF ──────────────────────────────────────────────────
export const exportPdf = async (req, res) => {
  try {
    const rows = await fetchFiltered(req.db, req.query);
    const gen  = await getGenerador(req.db, req.user.id);
    const now  = new Date();
    const filtrosLabel = buildFiltrosLabel(req.query);

    const PAGE_W = 841.89;
    const PAGE_H = 595.28;
    const M  = 36;
    const CW = PAGE_W - M * 2;

    // margins:0 evita que pdfkit añada páginas en blanco automáticamente
    const doc = new PDFDocument({
      size: 'A4', layout: 'landscape',
      margins: { top: 0, bottom: 0, left: 0, right: 0 },
      info: {
        Title:   'Portal PSE — Bit\xE1cora de Auditor\xEDa',
        Author:  gen?.nombre || req.user.usuario,
        Creator: 'Portal PSE — MINEDUC',
      },
      autoFirstPage: true,
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition',
      `attachment; filename="PSE_Bitacora_${now.toISOString().slice(0, 10)}.pdf"`);
    doc.pipe(res);

    // ── PÁGINA 1: PORTADA ─────────────────────────────────────────
    drawPageHeader(doc, PAGE_W, M);

    let y = drawMetaBox(doc, PAGE_W, M, CW, now, gen, rows.length, filtrosLabel);

    // Tarjetas de resumen por acción
    const actionCounts = {};
    for (const r of rows) {
      const lbl = accionLabel(r.accion);
      actionCounts[lbl] = (actionCounts[lbl] || 0) + 1;
    }
    const cardEntries = [
      ['Total registros', rows.length],
      ...Object.entries(actionCounts),
    ];

    const GAP = 8;
    const N   = cardEntries.length;
    const cW  = Math.min(112, Math.floor((CW - GAP * (N - 1)) / N));
    const cH  = 68;
    const cTW = cW * N + GAP * (N - 1);
    let cx = M + Math.max(0, Math.floor((CW - cTW) / 2));

    for (let i = 0; i < cardEntries.length; i++) {
      const [label, count] = cardEntries[i];
      const color = i === 0 ? NAVY : CARD_COLORS[(i - 1) % CARD_COLORS.length];
      doc.rect(cx, y, cW, cH).fill(color);
      // Número dorado en todas las tarjetas
      doc.fillColor(AMBER).fontSize(24).font('Helvetica-Bold')
         .text(String(count), cx, y + 9, { width: cW, align: 'center', lineBreak: false });
      doc.fillColor(WHITE).fontSize(6.5).font('Helvetica')
         .text(label, cx + 2, y + 45, { width: cW - 4, align: 'center', lineBreak: false });
      cx += cW + GAP;
    }

    drawFooter(doc, PAGE_W, PAGE_H, M, CW, now, 1);

    // ── PÁGINA 2+: TABLA DE DETALLE ───────────────────────────────
    doc.addPage({ size: 'A4', layout: 'landscape',
                  margins: { top: 0, bottom: 0, left: 0, right: 0 } });

    drawPageHeader(doc, PAGE_W, M);

    // Título compacto (menos espacio para caber más filas)
    const TITLE_Y = HDR_H + 8;
    doc.fillColor(BLK).fontSize(12).font('Helvetica-Bold')
       .text('Detalle de Acciones Registradas', M, TITLE_Y, {
         width: CW, align: 'center', lineBreak: false,
       });
    doc.fillColor(GRAY_T).fontSize(8).font('Helvetica')
       .text(`${rows.length} registro${rows.length !== 1 ? 's' : ''}`, M, TITLE_Y + 16, {
         width: CW, align: 'center', lineBreak: false,
       });

    // Columnas: Fecha, Usuario, Correo, Acción (color+negrita), Descripción
    const COLS = [
      { label: 'Fecha',           key: 'created_at',     w: 118, fmt: fmtDT                 },
      { label: 'Usuario',         key: 'usuario_nombre', w: 105                               },
      { label: 'Correo',          key: 'usuario_email',  w: 158                               },
      { label: 'Acci\xF3n',      key: 'accion',          w: 128, fmt: accionLabel, bold: true },
      { label: 'Descripci\xF3n', key: 'descripcion',     w: CW - 118 - 105 - 158 - 128       },
    ];

    const HDR_ROW = 21;
    const ROW_H   = 18;   // más compacto → caben ~24 filas por página
    const FIRST_Y = TITLE_Y + 32;
    const MAX_Y   = PAGE_H - 22;  // sin margen inferior (margins:0)
    y = FIRST_Y;
    let pageNum = 2;

    const drawTblHeader = (startY) => {
      let hx = M;
      for (const col of COLS) {
        doc.rect(hx, startY, col.w, HDR_ROW).fill(NAVY);
        doc.fillColor(WHITE).fontSize(8).font('Helvetica-Bold')
           .text(col.label, hx + 5, startY + 6, { width: col.w - 10, lineBreak: false });
        hx += col.w;
      }
    };

    drawTblHeader(y);
    y += HDR_ROW;

    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];

      if (y + ROW_H > MAX_Y) {
        drawFooter(doc, PAGE_W, PAGE_H, M, CW, now, pageNum);
        doc.addPage({ size: 'A4', layout: 'landscape',
                      margins: { top: 0, bottom: 0, left: 0, right: 0 } });
        pageNum++;
        drawPageHeader(doc, PAGE_W, M);
        y = HDR_H + 8;
        drawTblHeader(y);
        y += HDR_ROW;
      }

      if (i % 2 === 0) doc.rect(M, y, CW, ROW_H).fill(GRAY_L);

      let rx = M;
      for (const col of COLS) {
        const raw = col.fmt ? col.fmt(r[col.key]) : String(r[col.key] || '—');
        const textColor = col.bold ? accionColor(raw) : BLK;
        doc.fillColor(textColor).fontSize(7.5)
           .font(col.bold ? 'Helvetica-Bold' : 'Helvetica')
           .text(raw, rx + 5, y + 5, { width: col.w - 10, lineBreak: false, ellipsis: true });
        rx += col.w;
      }

      doc.rect(M, y + ROW_H - 0.5, CW, 0.5).fill(BORDER);
      y += ROW_H;
    }

    if (rows.length === 0) {
      doc.fillColor(GRAY_T).fontSize(10).font('Helvetica')
         .text('No hay registros con los filtros seleccionados.', M, y + 20, {
           width: CW, align: 'center',
         });
    }

    drawFooter(doc, PAGE_W, PAGE_H, M, CW, now, pageNum);
    doc.end();

  } catch (err) {
    console.error('exportPdf:', err.message);
    if (!res.headersSent) {
      res.status(500).json({ success: false, error: 'Error generando PDF' });
    }
  }
};

// ── EXPORTAR EXCEL ────────────────────────────────────────────────
export const exportExcel = async (req, res) => {
  try {
    const rows = await fetchFiltered(req.db, req.query);
    const now  = new Date();

    const wb = new ExcelJS.Workbook();
    wb.creator = 'Portal PSE — MINEDUC';
    wb.created = now;

    const ws = wb.addWorksheet('Bit\xE1cora', {
      views: [{ state: 'frozen', ySplit: 1 }],
    });

    ws.columns = [
      { header: 'ID',              key: 'id',             width: 8  },
      { header: 'Fecha',           key: 'fecha',           width: 22 },
      { header: 'Usuario',         key: 'usuario_nombre',  width: 22 },
      { header: 'Correo',          key: 'usuario_email',   width: 32 },
      { header: 'M\xF3dulo',      key: 'modulo',           width: 14 },
      { header: 'Acci\xF3n',      key: 'accion',           width: 28 },
      { header: 'Descripci\xF3n', key: 'descripcion',      width: 65 },
    ];

    ws.getRow(1).eachCell(cell => {
      cell.fill      = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF071A40' } };
      cell.font      = { bold: true, color: { argb: 'FFFFFFFF' }, size: 10, name: 'Calibri' };
      cell.alignment = { vertical: 'middle', horizontal: 'left' };
    });
    ws.getRow(1).height = 22;

    rows.forEach((r, i) => {
      const row = ws.addRow({
        id:             r.id,
        fecha:          r.created_at ? new Date(r.created_at) : null,
        usuario_nombre: r.usuario_nombre || '',
        usuario_email:  r.usuario_email  || '',
        modulo:         r.modulo         || '',
        accion:         r.accion         || '',
        descripcion:    r.descripcion    || '',
      });

      if (i % 2 === 1) {
        row.eachCell({ includeEmpty: true }, (cell, colNum) => {
          if (colNum <= 7) {
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF1F5F9' } };
          }
        });
      }
      row.height = 16;
    });

    ws.getColumn('fecha').numFmt = 'dd/mm/yyyy hh:mm';

    const buf = await wb.xlsx.writeBuffer();
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition',
      `attachment; filename="PSE_Bitacora_${now.toISOString().slice(0, 10)}.xlsx"`);
    res.send(Buffer.from(buf));

  } catch (err) {
    console.error('exportExcel:', err.message);
    res.status(500).json({ success: false, error: 'Error generando Excel' });
  }
};

// ── EXPORTAR CSV ──────────────────────────────────────────────────
export const exportCsv = async (req, res) => {
  try {
    const rows = await fetchFiltered(req.db, req.query);
    const now  = new Date();
    const esc  = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;

    const lines = [
      ['ID', 'Fecha', 'Usuario', 'Correo', 'M\xF3dulo', 'Acci\xF3n', 'Descripci\xF3n']
        .map(esc).join(','),
      ...rows.map(r => [
        r.id,
        fmtDT(r.created_at),
        r.usuario_nombre || '',
        r.usuario_email  || '',
        r.modulo         || '',
        r.accion         || '',
        r.descripcion    || '',
      ].map(esc).join(',')),
    ];

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition',
      `attachment; filename="PSE_Bitacora_${now.toISOString().slice(0, 10)}.csv"`);
    res.send('﻿' + lines.join('\r\n'));

  } catch (err) {
    console.error('exportCsv:', err.message);
    res.status(500).json({ success: false, error: 'Error generando CSV' });
  }
};
