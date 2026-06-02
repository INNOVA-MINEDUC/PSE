import sharp from 'sharp'
import { stat, writeFile, mkdir, copyFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PUBLIC  = path.resolve(__dirname, '../public')
const OUT_DIR = path.resolve(__dirname, '../public-compressed')

// Imágenes a comprimir con su resolución máxima de uso real
const TARGETS = [
  // Promocion — actividades (cards de ~340px alto, pantalla completa ancho max ~450px)
  { src: 'Promocion/actividades/actividad-1.webp', maxW: 800 },
  { src: 'Promocion/actividades/actividad-2.webp', maxW: 800 },
  { src: 'Promocion/actividades/actividad-3.webp', maxW: 800 },
  { src: 'Promocion/actividades/actividad-4.webp', maxW: 800 },
  // Promocion — banner hero (full width, max 1440px)
  { src: 'Promocion/banner/banner-promocion.webp', maxW: 1440 },
  // Promocion — astronauta decorativo
  { src: 'Promocion/actividades/astronauta-actividades.webp', maxW: 700 },
  // Home — imágenes de módulos (cards de ~320px alto)
  { src: 'Home/IMAGENES/noticia-virus.webp',          maxW: 800 },
  { src: 'Home/IMAGENES/noticia-jornada-salud.webp',  maxW: 800 },
  { src: 'Home/IMAGENES/mod-medicamentos.webp',       maxW: 800 },
  { src: 'Home/IMAGENES/mod-llamadas.webp',           maxW: 800 },
  { src: 'Home/IMAGENES/noticia-vacunacion.webp',     maxW: 800 },
  // Home — hero (full width)
  { src: 'Home/RECURSOS/hero-min.webp', maxW: 1920 },
  // Funerario
  { src: 'Funerario/banner/funerario-banner.webp',      maxW: 1440 },
  { src: 'Funerario/funerario-flujo-atencion.webp',     maxW: 1200 },
  { src: 'Funerario/funerario-metrica-casos.webp',      maxW: 900 },
  { src: 'Funerario/funerario-resumen-programa.webp',   maxW: 900 },
  { src: 'Funerario/funerario-paso-1.webp',             maxW: 800 },
  { src: 'Funerario/funerario-paso-2.webp',             maxW: 800 },
  { src: 'Funerario/funerario-paso-3.webp',             maxW: 800 },
]

let totalAntes = 0
let totalDespues = 0

for (const { src, maxW } of TARGETS) {
  const filePath = path.join(PUBLIC, src)
  const outPath  = path.join(OUT_DIR, src)

  if (!existsSync(filePath)) {
    console.log(`⚠  No encontrado: ${src}`)
    continue
  }

  await mkdir(path.dirname(outPath), { recursive: true })

  const before = (await stat(filePath)).size
  totalAntes += before

  const buffer = await sharp(filePath)
    .resize({ width: maxW, withoutEnlargement: true })
    .webp({ quality: 78, effort: 5 })
    .toBuffer()

  const after = buffer.length

  if (after < before) {
    await writeFile(outPath, buffer)
    totalDespues += after
    console.log(
      `✓  ${src.padEnd(52)} ${kb(before).padStart(7)} → ${kb(after).padStart(7)}  (-${pct(before, after)}%)`
    )
  } else {
    // copia sin cambios para que el directorio de salida esté completo
    await copyFile(filePath, outPath)
    totalDespues += before
    console.log(`=  ${src.padEnd(52)} ${kb(before).padStart(7)}  (ya óptimo, sin cambio)`)
  }
}

console.log('\n' + '─'.repeat(72))
console.log(`Total antes:  ${kb(totalAntes).padStart(8)} KB`)
console.log(`Total después: ${kb(totalDespues).padStart(7)} KB`)
console.log(`Ahorro:        ${kb(totalAntes - totalDespues).padStart(7)} KB  (-${pct(totalAntes, totalDespues)}%)`)

function kb(bytes) { return (bytes / 1024).toFixed(0) }
function pct(a, b) { return (((a - b) / a) * 100).toFixed(0) }
