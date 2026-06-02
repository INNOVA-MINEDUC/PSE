/**
 * Convierte imágenes PNG/JPG pesadas en frontend/public a WebP.
 * Guarda los .webp junto al original; no borra los originales.
 *
 * Ejecutar desde la carpeta /backend:
 *   node optimize-images.js
 */

import { readdir, stat } from 'fs/promises'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const PUBLIC_DIR = join(__dirname, '..', 'frontend', 'public')

const QUALITY = 80
const MIN_SIZE_KB = 100

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      yield* walk(full)
    } else {
      yield full
    }
  }
}

async function convert(filePath) {
  const ext = extname(filePath).toLowerCase()
  if (!['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) return null

  const info = await stat(filePath)
  const sizeKB = info.size / 1024
  if (sizeKB < MIN_SIZE_KB) return null

  const outPath = filePath.replace(/\.(png|jpg|jpeg|webp)$/i, '.webp')

  try {
    const existing = await stat(outPath)
    if (existing.mtime > info.mtime) return null
  } catch { /* no existe, continuar */ }

  await sharp(filePath)
    .webp({ quality: QUALITY })
    .toFile(outPath)

  const outInfo = await stat(outPath)
  const saved = sizeKB - outInfo.size / 1024

  return {
    original: filePath.replace(PUBLIC_DIR, '').replace(/\\/g, '/'),
    originalKB: Math.round(sizeKB),
    webpKB: Math.round(outInfo.size / 1024),
    savedKB: Math.round(saved),
    savedPct: Math.round((saved / sizeKB) * 100)
  }
}

async function main() {
  console.log(`Escaneando: ${PUBLIC_DIR}\n`)

  const results = []
  let totalSavedKB = 0

  for await (const file of walk(PUBLIC_DIR)) {
    const result = await convert(file)
    if (result) {
      results.push(result)
      totalSavedKB += result.savedKB
      console.log(`✓ ${result.original}`)
      console.log(`  ${result.originalKB} KB → ${result.webpKB} KB  (-${result.savedPct}%)`)
    }
  }

  console.log('\n─────────────────────────────────────────')
  console.log(`Archivos convertidos: ${results.length}`)
  console.log(`Espacio ahorrado total: ${Math.round(totalSavedKB / 1024 * 10) / 10} MB`)
}

main().catch(console.error)
