<template>
  <main class="detalle-page">

    <div class="detalle-topbar">
      <div class="detalle-shell">
        <button class="back-btn" @click="router.back()">← Volver</button>
      </div>
    </div>

    <div v-if="loading" class="detalle-state">Cargando noticia…</div>

    <div v-else-if="errorMsg" class="detalle-state detalle-state--error">
      {{ errorMsg }}
    </div>

    <article v-else-if="noticia">

      <div class="detalle-hero-wrap">
        <img
          v-if="noticia.imagen_url"
          :src="resolveImage(noticia.imagen_url)"
          :alt="noticia.titulo"
          class="detalle-hero-img"
          loading="eager"
        />
        <div v-else class="detalle-hero-placeholder"></div>
      </div>

      <div class="detalle-shell detalle-content">

        <div class="detalle-meta">
          <span class="detalle-modulo-badge">{{ moduloLabel }}</span>
          <span class="detalle-fecha">{{ fechaFormateada }}</span>
        </div>

        <h1 class="detalle-titulo">{{ noticia.titulo }}</h1>

        <p v-if="noticia.descripcion_corta" class="detalle-desc">
          {{ noticia.descripcion_corta }}
        </p>

        <div v-if="noticia.contenido" class="detalle-body">
          {{ noticia.contenido }}
        </div>

        <div class="detalle-footer-actions">
          <button class="back-btn-alt" @click="router.back()">← Volver</button>
        </div>

      </div>
    </article>

  </main>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const route  = useRoute()
const router = useRouter()

const noticia  = ref(null)
const loading  = ref(true)
const errorMsg = ref('')

const resolveImage = (url) => {
  if (!url) return ''
  if (url.startsWith('http')) return url
  return `${API_URL}${url}`
}

const moduloLabels = {
  promocion:    'Promoción y prevención',
  atencion:     'Atención a enfermedades',
  medicamentos: 'Suministro de medicamentos',
  llamadas:     'Centro de llamadas 1528',
  funerario:    'Apoyo funerario',
}

const moduloLabel = computed(() =>
  moduloLabels[noticia.value?.modulo] || noticia.value?.modulo || 'General'
)

const fechaFormateada = computed(() => {
  if (!noticia.value?.fecha_publicacion) return ''
  return new Date(noticia.value.fecha_publicacion).toLocaleDateString('es-GT', {
    day: '2-digit', month: 'long', year: 'numeric',
  })
})

onMounted(async () => {
  try {
    const res  = await fetch(`${API_URL}/api/noticias/${route.params.id}`)
    const data = await res.json()
    if (data.success) {
      noticia.value = data.data
    } else {
      errorMsg.value = 'Noticia no encontrada.'
    }
  } catch {
    errorMsg.value = 'No se pudo cargar la noticia.'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.detalle-page {
  background: #f2f5f8;
  min-height: 100vh;
  font-family: 'Montserrat', sans-serif;
  color: #0f172a;
}

/* TOP BACK BAR */
.detalle-topbar {
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
  padding: 14px 0;
}

.detalle-shell {
  max-width: 920px;
  margin: 0 auto;
  padding: 0 24px;
}

.back-btn {
  background: none;
  border: 1.5px solid #d1d5db;
  border-radius: 8px;
  padding: 8px 18px;
  font-size: 0.88rem;
  font-weight: 700;
  color: #374151;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s, border-color 0.15s;
}
.back-btn:hover {
  background: #f1f5f9;
  border-color: #9ca3af;
}

/* STATE MESSAGES */
.detalle-state {
  text-align: center;
  padding: 80px 24px;
  color: #64748b;
  font-size: 1rem;
}
.detalle-state--error { color: #b91c1c; }

/* HERO IMAGE */
.detalle-hero-wrap {
  width: 100%;
  max-height: 480px;
  overflow: hidden;
  background: #1e293b;
}
.detalle-hero-img {
  width: 100%;
  max-height: 480px;
  object-fit: cover;
  display: block;
}
.detalle-hero-placeholder {
  height: 240px;
  background: linear-gradient(135deg, #1e3a5f 0%, #16a34a 100%);
}

/* CONTENT AREA */
.detalle-content {
  padding-top: 40px;
  padding-bottom: 64px;
}

.detalle-meta {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.detalle-modulo-badge {
  background: #dcfce7;
  color: #15803d;
  border-radius: 20px;
  padding: 4px 14px;
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.detalle-fecha {
  color: #64748b;
  font-size: 0.86rem;
  font-weight: 600;
}

.detalle-titulo {
  font-size: clamp(1.5rem, 3vw, 2.4rem);
  font-weight: 900;
  color: #0f172a;
  line-height: 1.18;
  margin: 0 0 20px;
}

.detalle-desc {
  font-size: 1.08rem;
  color: #374151;
  line-height: 1.7;
  font-weight: 500;
  border-left: 4px solid #16a34a;
  padding-left: 18px;
  margin: 0 0 32px;
}

.detalle-body {
  font-size: 0.97rem;
  color: #374151;
  line-height: 1.85;
  white-space: pre-wrap;
  border-top: 1px solid #e2e8f0;
  padding-top: 28px;
  margin-bottom: 40px;
}

.detalle-footer-actions {
  border-top: 1px solid #e2e8f0;
  padding-top: 28px;
}

.back-btn-alt {
  background: #0f172a;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 12px 28px;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s;
}
.back-btn-alt:hover { background: #1e293b; }

/* RESPONSIVE */
@media (max-width: 640px) {
  .detalle-shell  { padding: 0 16px; }
  .detalle-content { padding-top: 28px; }
  .detalle-hero-wrap { max-height: 220px; }
  .detalle-hero-img  { max-height: 220px; }
}
</style>
