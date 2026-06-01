<template>
  <main class="detalle-page">

    <!-- BARRA SUPERIOR -->
    <div class="detalle-topbar">
      <div class="topbar-inner">
        <RouterLink to="/promocion" class="back-link">← Noticias</RouterLink>
        <span class="bc-sep">/</span>
        <span class="bc-modulo">{{ moduloLabel(noticia?.modulo) }}</span>
      </div>
    </div>

    <!-- ESTADOS DE CARGA / ERROR -->
    <div v-if="loading" class="detalle-state">Cargando noticia…</div>
    <div v-else-if="errorMsg" class="detalle-state detalle-state--error">{{ errorMsg }}</div>

    <div v-else class="detalle-wrap">
      <div class="detalle-inner">

        <!-- CABECERA CENTRADA -->
        <header class="art-header">
          <span class="art-badge" :class="`badge--${noticia.modulo}`">
            {{ moduloLabel(noticia.modulo) }}
          </span>

          <h1 class="art-titulo">{{ noticia.titulo }}</h1>
          <p class="art-subtitulo">{{ noticia.descripcion_corta }}</p>

          <div class="art-meta-row">
            <span class="art-publicado">
              <strong class="art-publicado-label">Publicado por:</strong>
              {{ noticia.autor }}
            </span>
            <span class="art-meta-sep">·</span>
            <time class="art-fecha">{{ fechaFormateada }}</time>
          </div>

          <hr class="art-divider" />
        </header>

        <!-- LAYOUT EDITORIAL DOS COLUMNAS -->
        <div class="art-body" :class="{ 'art-body--single': !noticia.galeria?.length }">

          <!-- COLUMNA IZQUIERDA — Contenido -->
          <section class="art-col-text">
            <p
              v-for="(parrafo, i) in parrafos"
              :key="i"
              class="art-parrafo"
            >{{ parrafo }}</p>
          </section>

          <!-- COLUMNA DERECHA — Imágenes editoriales -->
          <aside v-if="noticia.galeria?.length" class="art-col-images">
            <figure
              v-for="(img, i) in noticia.galeria"
              :key="img.id"
              class="art-figure"
              @click="abrirLightbox(i)"
            >
              <div class="art-figure-img-wrap">
                <img
                  :src="img.imagen_url"
                  :alt="`Fotografía ${i + 1}`"
                  class="art-figure-img"
                  loading="lazy"
                  decoding="async"
                />
                <div class="art-figure-hover">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="art-figure-icon">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                    <line x1="11" y1="8" x2="11" y2="14"/>
                    <line x1="8" y1="11" x2="14" y2="11"/>
                  </svg>
                </div>
              </div>
              <figcaption class="art-figure-caption">
                Fotografía: {{ noticia.autor }}
              </figcaption>
            </figure>
          </aside>

        </div>

        <!-- PIE DE ARTÍCULO -->
        <div class="art-footer">
          <RouterLink to="/promocion" class="volver-btn">← Ver todas las noticias</RouterLink>
        </div>

      </div>
    </div><!-- /v-else -->

    <!-- LIGHTBOX -->
    <Transition name="lb">
      <div
        v-if="lightbox.open"
        class="lb-overlay"
        @click.self="cerrarLightbox"
        @keydown.left.window="prevImg"
        @keydown.right.window="nextImg"
        @keydown.esc.window="cerrarLightbox"
      >
        <button class="lb-close" type="button" @click="cerrarLightbox">✕</button>

        <button
          class="lb-arrow lb-prev"
          type="button"
          :disabled="lightbox.index === 0"
          @click="prevImg"
        >‹</button>

        <div class="lb-img-wrap">
          <img
            :src="noticia.galeria[lightbox.index]?.imagen_url"
            :alt="`Foto ${lightbox.index + 1}`"
            class="lb-img"
          />
        </div>

        <button
          class="lb-arrow lb-next"
          type="button"
          :disabled="lightbox.index === noticia.galeria.length - 1"
          @click="nextImg"
        >›</button>

        <div class="lb-footer">
          <span class="lb-counter">{{ lightbox.index + 1 }} / {{ noticia.galeria.length }}</span>
          <div class="lb-dots">
            <span
              v-for="(_, i) in noticia.galeria"
              :key="i"
              class="lb-dot"
              :class="{ 'lb-dot--on': i === lightbox.index }"
              @click="lightbox.index = i"
            ></span>
          </div>
        </div>
      </div>
    </Transition>

    <AppFooter />
  </main>
</template>

<script setup>
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import AppFooter from '@/components/AppFooter.vue'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'
const route   = useRoute()

const noticia  = ref(null)
const loading  = ref(true)
const errorMsg = ref('')

const resolveImage = (url) => {
  if (!url) return ''
  if (url.startsWith('http')) return url
  if (url.startsWith('/uploads')) return `${API_URL}${url}`
  return url
}

onMounted(async () => {
  try {
    const res  = await fetch(`${API_URL}/api/noticias/${route.params.id}`)
    const data = await res.json()
    if (data.success) {
      noticia.value = {
        ...data.data,
        hero_url:     resolveImage(data.data.imagen_url),
        galeria:      [],
        autor:        data.data.autor || 'Programa de Salud Escolar — MINEDUC',
      }
    } else {
      errorMsg.value = 'Noticia no encontrada.'
    }
  } catch {
    errorMsg.value = 'No se pudo cargar la noticia.'
  } finally {
    loading.value = false
  }

  window.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeyDown)
  document.body.style.overflow = ''
})

const onKeyDown = (e) => {
  if (!lightbox.open) return
  if (e.key === 'ArrowLeft')  prevImg()
  if (e.key === 'ArrowRight') nextImg()
  if (e.key === 'Escape')     cerrarLightbox()
}

/* ── LIGHTBOX ────────────────────────────────────────────────────── */
const lightbox = reactive({ open: false, index: 0 })

const abrirLightbox = (i) => {
  lightbox.index = i
  lightbox.open  = true
  document.body.style.overflow = 'hidden'
}
const cerrarLightbox = () => {
  lightbox.open = false
  document.body.style.overflow = ''
}
const prevImg = () => { if (lightbox.index > 0) lightbox.index-- }
const nextImg = () => { if (lightbox.index < (noticia.value?.galeria?.length ?? 0) - 1) lightbox.index++ }

/* ── HELPERS ─────────────────────────────────────────────────────── */
const MODULO_LABELS = {
  promocion:    'Promoción y prevención',
  atencion:     'Atención a enfermedades',
  medicamentos: 'Suministro de medicamentos',
  llamadas:     'Centro de llamadas 1528',
  funerario:    'Apoyo funerario',
}
const moduloLabel = (m) => MODULO_LABELS[m] || 'General'

const fechaFormateada = computed(() =>
  noticia.value?.fecha_publicacion
    ? new Date(noticia.value.fecha_publicacion).toLocaleDateString('es-GT', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : ''
)

const parrafos = computed(() =>
  (noticia.value?.contenido || '').split(/\n\n+/).filter((p) => p.trim())
)
</script>

<style scoped>
/* ── PÁGINA ────────────────────────────────────────────────────────── */
.detalle-page {
  background: #ffffff;
  min-height: 100vh;
  font-family: 'Montserrat', sans-serif;
  color: #10233f;
}

/* ── ESTADOS ───────────────────────────────────────────────────────── */
.detalle-state {
  text-align: center;
  padding: 80px 24px;
  font-size: 1rem;
  color: #6b7280;
}
.detalle-state--error { color: #b91c1c; }

/* ── TOPBAR ────────────────────────────────────────────────────────── */
.detalle-topbar {
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  padding: 12px 0;
  position: sticky;
  top: 0;
  z-index: 20;
}

.topbar-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.82rem;
}

.back-link {
  font-weight: 700;
  color: #10233f;
  text-decoration: none;
  transition: color 0.15s;
}
.back-link:hover { color: #17c4e8; }

.bc-sep    { color: #d1d5db; }
.bc-modulo { color: #6b7280; font-weight: 600; }

/* ── CONTENEDOR PRINCIPAL ──────────────────────────────────────────── */
.detalle-wrap  { padding: 0 0 72px; }

.detalle-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

/* ── CABECERA CENTRADA ─────────────────────────────────────────────── */
.art-header {
  text-align: center;
  padding: 52px 0 0;
  max-width: 860px;
  margin: 0 auto;
}

.art-badge {
  display: inline-block;
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  padding: 5px 14px;
  border-radius: 999px;
  color: #ffffff;
  background: #17c4e8;
  margin-bottom: 18px;
}

.badge--promocion    { background: #17c4e8; }
.badge--atencion     { background: #2563eb; }
.badge--medicamentos { background: #059669; }
.badge--llamadas     { background: #7c3aed; }
.badge--funerario    { background: #64748b; }

.art-titulo {
  font-size: clamp(1.9rem, 3.6vw, 2.8rem);
  font-weight: 900;
  color: #10233f;
  line-height: 1.15;
  margin: 0 0 16px;
}

.art-subtitulo {
  font-size: 1.05rem;
  color: #4b5c77;
  line-height: 1.65;
  font-weight: 500;
  margin: 0 0 22px;
}

.art-meta-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 0;
}

.art-publicado {
  font-size: 0.84rem;
  color: #374151;
  font-weight: 600;
}

.art-publicado-label {
  color: #17c4e8;
  font-weight: 800;
}

.art-meta-sep { color: #d1d5db; font-size: 1.1rem; }

.art-fecha {
  font-size: 0.84rem;
  color: #6b7280;
  font-weight: 600;
}

.art-divider {
  border: none;
  border-top: 1.5px solid #e2e8f0;
  margin: 28px 0 0;
}

/* ── LAYOUT EDITORIAL DOS COLUMNAS ─────────────────────────────────── */
.art-body {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 52px;
  align-items: start;
  padding-top: 40px;
}

/* Si no hay galería, contenido full-width */
.art-body--single {
  grid-template-columns: 1fr;
  max-width: 780px;
  margin: 0 auto;
}

/* ── COLUMNA TEXTO ──────────────────────────────────────────────────── */
.art-col-text { min-width: 0; }

.art-parrafo {
  font-size: 1rem;
  color: #374151;
  line-height: 1.92;
  text-align: justify;
  hyphens: auto;
  margin: 0 0 1.5rem;
}
.art-parrafo:last-child { margin-bottom: 0; }

/* ── COLUMNA IMÁGENES ───────────────────────────────────────────────── */
.art-col-images {
  display: flex;
  flex-direction: column;
  gap: 28px;
  position: sticky;
  top: 80px;
}

.art-figure {
  margin: 0;
  cursor: pointer;
}

.art-figure-img-wrap {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  line-height: 0;
}

.art-figure-img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  display: block;
  transition: transform 0.32s ease;
}

.art-figure:hover .art-figure-img {
  transform: scale(1.04);
}

.art-figure-hover {
  position: absolute;
  inset: 0;
  background: rgba(16, 35, 63, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.22s ease;
}

.art-figure:hover .art-figure-hover {
  background: rgba(16, 35, 63, 0.38);
}

.art-figure-icon {
  width: 36px;
  height: 36px;
  color: #ffffff;
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 0.22s ease, transform 0.22s ease;
}

.art-figure:hover .art-figure-icon {
  opacity: 1;
  transform: scale(1);
}

.art-figure-caption {
  font-size: 0.74rem;
  color: #94a3b8;
  font-weight: 600;
  margin-top: 7px;
  padding-left: 2px;
}

/* ── PIE ────────────────────────────────────────────────────────────── */
.art-footer {
  border-top: 1px solid #e2e8f0;
  margin-top: 52px;
  padding-top: 32px;
}

.volver-btn {
  display: inline-block;
  background: #10233f;
  color: #ffffff;
  border-radius: 10px;
  padding: 12px 26px;
  font-size: 0.87rem;
  font-weight: 700;
  text-decoration: none;
  font-family: 'Montserrat', sans-serif;
  transition: background 0.18s;
}
.volver-btn:hover { background: #1a3a60; }

/* ── LIGHTBOX ──────────────────────────────────────────────────────── */
.lb-overlay {
  position: fixed;
  inset: 0;
  background: rgba(5, 13, 27, 0.94);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 80px;
}

.lb-close {
  position: absolute;
  top: 18px;
  right: 22px;
  background: rgba(255,255,255,0.1);
  border: none;
  color: #fff;
  font-size: 1.1rem;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.15s;
}
.lb-close:hover { background: rgba(255,255,255,0.22); }

.lb-img-wrap {
  max-width: min(860px, 88vw);
  max-height: 80vh;
  display: flex;
  align-items: center;
}

.lb-img {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 24px 60px rgba(0,0,0,0.5);
}

.lb-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,0.1);
  border: none;
  color: #fff;
  font-size: 2.2rem;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}
.lb-arrow:hover:not(:disabled) { background: rgba(23,196,232,0.3); }
.lb-arrow:disabled { opacity: 0.18; cursor: default; }
.lb-prev { left: 18px; }
.lb-next { right: 18px; }

.lb-footer {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.lb-counter {
  color: rgba(255,255,255,0.6);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.lb-dots { display: flex; gap: 7px; }

.lb-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: rgba(255,255,255,0.28);
  cursor: pointer;
  transition: background 0.15s;
}
.lb-dot--on     { background: #17c4e8; }
.lb-dot:hover   { background: rgba(255,255,255,0.6); }

.lb-enter-active, .lb-leave-active { transition: opacity 0.2s ease; }
.lb-enter-from, .lb-leave-to       { opacity: 0; }

/* ── RESPONSIVE ────────────────────────────────────────────────────── */
@media (max-width: 1024px) {
  .art-body {
    grid-template-columns: 1fr 320px;
    gap: 36px;
  }
  .detalle-inner { padding: 0 28px; }
}

@media (max-width: 768px) {
  /* Una sola columna en tablet/móvil */
  .art-body {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  /* En móvil las imágenes van en grid 2 cols después del texto */
  .art-col-images {
    position: static;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }

  .detalle-inner   { padding: 0 20px; }
  .topbar-inner    { padding: 0 20px; }
  .art-header      { padding: 36px 0 0; }
}

@media (max-width: 480px) {
  .art-col-images  { grid-template-columns: 1fr; }
  .art-titulo      { font-size: 1.7rem; }
  .lb-overlay      { padding: 16px 56px; }
}
</style>
