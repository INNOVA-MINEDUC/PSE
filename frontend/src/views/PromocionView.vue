<template>
  <main class="promo-page">
    <section class="promo-hero" :style="{ backgroundImage: `url(${bannerPromocion})` }">
      <div class="promo-hero-overlay">
        <div class="promo-hero-inner">
          <h1 class="promo-title">
            Promoción de la salud y prevención de enfermedades en
            <span class="highlight">centros educativos</span>
          </h1>

          <p class="promo-text">
            El PSE refuerza las acciones de prevención y promoción de la salud dentro de los
            centros educativos, con el objetivo de mejorar el bienestar de la comunidad estudiantil.
          </p>
        </div>
      </div>
    </section>

    <!-- FRANJA LOGOS -->
    <section class="logo-franja">
      <img
        class="logo-franja-img"
        :src="logoFranja"
        alt="Franja de logos institucionales"
        loading="lazy"
      />
    </section>

    <section class="promo-news-section">
      <div class="promo-news-inner">
        <div class="news-header">
          <h2 class="section-title center">Noticias y actividades</h2>
          <p class="news-subtitle center">
            El Portal de Salud PSE centraliza acciones de promoción, prevención y bienestar estudiantil.
          </p>
        </div>

        <div v-if="cargandoNoticias" class="news-empty">Cargando noticias…</div>

        <div v-else-if="noticias.length === 0" class="news-empty">
          No hay noticias disponibles en este momento.
        </div>

        <template v-else>
          <!-- CARRUSEL DESTACADO ARRIBA -->
          <div class="news-featured-wrap">
            <button class="news-arrow news-arrow-left" type="button" @click="prevNews">‹</button>

            <article
              class="news-featured"
              :class="{ 'news-featured--clickable': featuredNews.id }"
              @click="irADetalle(featuredNews)"
            >
              <img :src="featuredNews.img" :alt="featuredNews.titulo" class="news-featured-img" loading="lazy" decoding="async" />

              <div class="news-featured-overlay">
                <p class="news-date">{{ featuredNews.fecha }}</p>
                <p class="news-category">{{ featuredNews.categoria }}</p>
                <h3 class="news-title">{{ featuredNews.titulo }}</h3>
                <p class="news-text">{{ featuredNews.desc }}</p>
                <RouterLink v-if="featuredNews.id" :to="`/noticias/${featuredNews.id}`" class="news-ver-btn">
                  Ver noticia completa →
                </RouterLink>
              </div>
            </article>

            <button class="news-arrow news-arrow-right" type="button" @click="nextNews">›</button>
          </div>

          <!-- 4 CARDS ABAJO -->
          <div class="news-grid">
            <article
              v-for="(item, i) in noticiasPagina"
              :key="item.id || i"
              class="news-card"
            >
              <img :src="item.img" :alt="item.titulo" class="news-card-img" loading="lazy" decoding="async" />
              <div class="news-card-overlay">
                <h4 class="news-card-title">{{ item.titulo }}</h4>
                <p class="news-card-text">{{ item.desc }}</p>
                <button
                  class="news-card-btn"
                  :class="{ 'news-card-btn--disabled': !item.id }"
                  type="button"
                  @click="irADetalle(item)"
                >VER DETALLE</button>
              </div>
            </article>
          </div>

          <!-- PAGINACIÓN -->
          <nav v-if="totalPaginas >= 1" class="news-pagination" aria-label="Paginación de noticias">
            <button class="pag-arrow" type="button" :disabled="paginaActual === 1" @click="irAPagina(paginaActual - 1)">‹</button>
            <button v-for="n in totalPaginas" :key="n" class="pag-btn" :class="{ 'pag-btn--active': n === paginaActual }" type="button" @click="irAPagina(n)">{{ n }}</button>
            <button class="pag-arrow" type="button" :disabled="paginaActual === totalPaginas" @click="irAPagina(paginaActual + 1)">›</button>
          </nav>
        </template>
      </div>
    </section>

    <section class="promo-actions-section">
      <div class="promo-actions-inner">
        <div class="actions-top">
          <div class="actions-copy">
            <h2 class="section-title left">
              Actividades Realizadas en los Centros Educativos
            </h2>

            <p class="actions-intro">
              Acciones desarrolladas en centros educativos para fortalecer la prevención,
              la salud integral y el acompañamiento a estudiantes.
            </p>
          </div>

          <div class="actions-astro-box">
            <img
              :src="astronautaActividades"
              alt="Astronauta actividades"
              class="actions-astro"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div class="actions-cards-wrap">
          <button class="actions-arrow actions-arrow-left" type="button">‹</button>

          <div class="actions-grid">
            <article
              v-for="(actividad, index) in actividades"
              :key="index"
              class="action-card"
            >
              <img :src="actividad.img" :alt="actividad.titulo" class="action-card-img" loading="lazy" decoding="async" />

              <div class="action-card-overlay">
                <h3 class="action-title">{{ actividad.titulo }}</h3>
                <p class="action-text">{{ actividad.desc }}</p>
                <button class="action-btn" type="button">VER DETALLE</button>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
    <AppFooter />
  </main>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import AppFooter from '@/components/AppFooter.vue'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'
const router = useRouter()

const bannerPromocion      = '/Promocion/banner/banner-promocion.webp'
const astronautaActividades = '/Promocion/actividades/astronauta-actividades.webp'
const logoFranja           = '/Home/LOGOS/logo-franja.png'

const POR_PAGINA   = 4
const paginaActual = ref(1)

const noticiasApi = ref([])
const cargandoNoticias = ref(true)

const resolveImage = (url) => {
  if (!url) return '/Promocion/banner/banner-promocion.webp'
  if (url.startsWith('http')) return url
  if (url.startsWith('/Promocion') || url.startsWith('/Home')) return url
  return `${API_URL}${url}`
}

const formatFecha = (fecha) => {
  if (!fecha) return ''
  const [y, m, d] = String(fecha).slice(0, 10).split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('es-GT', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

const noticias = computed(() =>
  noticiasApi.value.map((n) => ({
    id: n.id,
    img: resolveImage(n.imagen_url),
    titulo: n.titulo,
    desc: n.descripcion_corta,
    fecha: formatFecha(n.fecha_publicacion),
    categoria: 'PROMOCIÓN Y PREVENCIÓN'
  }))
)

const totalPaginas = computed(() =>
  Math.ceil(noticias.value.length / POR_PAGINA)
)

const noticiasPagina = computed(() => {
  const inicio = (paginaActual.value - 1) * POR_PAGINA
  return noticias.value.slice(inicio, inicio + POR_PAGINA)
})

const irAPagina = (n) => {
  if (n < 1 || n > totalPaginas.value) return
  paginaActual.value = n
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const irADetalle = (item) => {
  if (item.id) router.push(`/noticias/${item.id}`)
}

const actividades = [
  {
    img: '/Promocion/actividades/actividad-1.webp', // ya era webp
    titulo: 'Jornadas de desparasitación escolar',
    desc: 'Acciones para promover la salud y prevenir enfermedades en los centros educativos.'
  },
  {
    img: '/Promocion/actividades/actividad-2.webp',
    titulo: 'Jornadas de inmunización',
    desc: 'Registro de atenciones médicas y seguimiento de casos de las y los estudiantes.'
  },
  {
    img: '/Promocion/actividades/actividad-3.webp',
    titulo: 'Prevención del dengue',
    desc: 'Inventario y distribución de medicamentos del programa a los establecimientos.'
  },
  {
    img: '/Promocion/actividades/actividad-4.webp',
    titulo: 'Promoción de salud renal',
    desc: 'Llamadas recibidas, derivaciones y seguimiento de casos relacionados con PSE.'
  },
]

const currentNews = ref(0)

const featuredNews = computed(() => noticias.value[currentNews.value] ?? noticias.value[0] ?? null)

const nextNews = () => {
  currentNews.value = (currentNews.value + 1) % noticias.value.length
}

const prevNews = () => {
  currentNews.value = (currentNews.value - 1 + noticias.value.length) % noticias.value.length
}

const cargarNoticias = async () => {
  cargandoNoticias.value = true
  try {
    const res = await fetch(`${API_URL}/api/noticias`)
    const data = await res.json()

    if (data.success) {
      noticiasApi.value = data.data
        .filter((n) => Number(n.activo) === 1 && n.modulo === 'promocion')
        .sort((a, b) => Number(a.orden || 0) - Number(b.orden || 0))
    }
  } catch (error) {
    console.error('Error cargando noticias:', error)
  } finally {
    cargandoNoticias.value = false
  }
}

let sliderInterval = null

onMounted(() => {
  cargarNoticias()

  sliderInterval = setInterval(() => {
    nextNews()
  }, 5000)
})

onUnmounted(() => {
  if (sliderInterval) clearInterval(sliderInterval)
})
</script>

<style scoped>
.news-empty {
  text-align: center;
  padding: 48px 20px;
  font-size: 15px;
  color: #7b8ea5;
}

.news-featured--clickable {
  cursor: pointer;
}
.news-featured--clickable:hover .news-featured-img {
  transform: scale(1.03);
  transition: transform 0.3s ease;
}

.news-card-btn--disabled {
  opacity: 0.45;
  cursor: default;
  pointer-events: none;
}

.promo-page {
  background: #ffffff;
  min-height: 100vh;
  color: #111827;
}

.promo-hero {
  min-height: 590px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}

.promo-hero-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 160px 44px 40px;
  width: 100%;
}

.promo-title {
  max-width: 720px;
  width: 100%;
  font-size: 45px;
  line-height: 1.06;
  font-weight: 900;
  color: #ffffff;
  margin: 0 0 14px;
}

.highlight {
  color: #ffffff;
  position: relative;
  display: inline-block;
  z-index: 1;
  padding: 5px 15px;
}

.highlight::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 4px;
  width: 100%;
  height: 48px;
  background: linear-gradient(90deg, #15c9e8, #0bb6d6);
  z-index: -1;
  border-radius: 8px;
}

.promo-text {
  max-width: 560px;
  font-size: 15px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.94);
  margin: 0;
  text-align: justify;
}

/* FRANJA LOGOS */
.logo-franja {
  background: #ffffff;
  border-bottom: 1px solid #e8edf3;
}

.logo-franja-img {
  display: block;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 14px 40px;
}

.promo-news-section,
.promo-actions-section {
  padding: 52px 10px 48px;
  background: #ffffff;
}

/* PAGINACIÓN */
.news-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-top: 36px;
}

.pag-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: #374151;
  font-size: 0.9rem;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.pag-btn:hover { background: #e8f8fc; color: #17c4e8; }

.pag-btn--active {
  background: #10233f;
  color: #ffffff;
  font-weight: 900;
}

.pag-arrow {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1.5px solid #d1d5db;
  background: #ffffff;
  color: #374151;
  font-size: 1.1rem;
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s;
}

.pag-arrow:hover:not(:disabled) { border-color: #17c4e8; color: #17c4e8; }
.pag-arrow:disabled { opacity: 0.3; cursor: default; }

.promo-news-inner,
.promo-actions-inner {
  max-width: 1920px;
  margin: 0 auto;
  padding: 0;
}

.section-title {
  font-weight: 900;
  color: #10395f;
  line-height: 1.05;
}

.section-title.center {
  text-align: center;
  font-size: 2rem;
  margin: 0 0 10px;
}

.section-title.left {
  text-align: left;
  font-size: 2rem;
  margin: 0 0 12px;
}

.news-header {
  margin-bottom: 24px;
}

.news-subtitle {
  max-width: 980px;
  margin: 0 auto;
  font-size: 0.86rem;
  color: #35577d;
  line-height: 1.6;
}

.news-subtitle.center {
  text-align: center;
}

.news-featured-wrap {
  position: relative;
  width: 100vw;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 28px;
  margin-bottom: 28px;
}

.news-featured {
  width: 100%;
  height: 420px;
  position: relative;
  overflow: hidden;
}

.news-featured-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  display: block;
}

.news-featured-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 72px 30px;
  background: linear-gradient(
    180deg,
    rgba(0, 52, 92, 0.08) 0%,
    rgba(0, 52, 92, 0.42) 48%,
    rgba(0, 52, 92, 0.92) 100%
  );
  color: #fff;
}

.news-date {
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.85);
  margin: 0 0 8px;
}

.news-ver-btn {
  display: inline-block;
  margin-top: 14px;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  border: 1.5px solid rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  padding: 9px 20px;
  font-size: 0.85rem;
  font-weight: 700;
  text-decoration: none;
  font-family: 'Montserrat', sans-serif;
  transition: background 0.2s, border-color 0.2s;
  align-self: flex-start;
}

.news-ver-btn:hover {
  background: rgba(255, 255, 255, 0.28);
  border-color: rgba(255, 255, 255, 0.8);
}

.news-category {
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #15c9e8;
  margin: 0 0 8px;
}

.news-title {
  font-size: 24px;
  line-height: 1.05;
  font-weight: 900;
  max-width: 620px;
  margin: 0 0 8px;
}

.news-text {
  max-width: 520px;
  font-size: 11px;
  line-height: 1.45;
  color: #e6eef7;
  margin: 0;
  text-align: left;
}

.news-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;
  width: 36px;
  height: 36px;
  border-radius: 999px;
  border: none;
  background: rgba(255, 255, 255, 0.96);
  color: #6a7d94;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(16, 35, 63, 0.15);
}

.news-arrow-left {
  left: 10px;
}

.news-arrow-right {
  right: 10px;
}

/* ── CARDS DISEÑO ORIGINAL ─────────────────────────────────────── */
.news-grid {
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  width: 100%;
}

.news-card {
  position: relative;
  height: 380px;
  border-radius: 8px;
  overflow: hidden;
}

.news-card-img {
  width: 100%;
  height: 100%;
  min-height: 180px;
  object-fit: cover;
  object-position: center;
  display: block;
}

.news-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 52, 92, 0.95) 0%,
    rgba(0, 52, 92, 0.7) 25%,
    rgba(0, 52, 92, 0.3) 45%,
    rgba(0, 52, 92, 0) 70%
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 12px 10px 10px;
  color: #fff;
}

.news-card-title {
  font-size: 0.72rem;
  line-height: 1.05;
  font-weight: 900;
  margin: 0 0 4px;
  text-align: center;
}

.news-card-text {
  font-size: 0.54rem;
  line-height: 1.28;
  margin: 0 0 8px;
  text-align: center;
}

.news-card-btn {
  align-self: center;
  padding: 6px 14px;
  border-radius: 6px;
  border: 1px solid #15c9e8;
  background: transparent;
  color: #fff;
  font-size: 0.6rem;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.18s;
}

.news-card-btn:hover {
  background: rgba(21, 201, 232, 0.18);
}

.news-card-btn--disabled {
  opacity: 0.45;
  cursor: default;
  pointer-events: none;
}

/* ACTIVIDADES */
.promo-actions-inner {
  background: #dfe8ee;
  border-radius: 18px;
  padding: 28px 32px 24px;
  max-width: 1440px;
  margin: 0 auto;
}

.actions-top {
  display: grid;
  grid-template-columns: 1.6fr 0.8fr;
  gap: 26px;
  align-items: center;
  margin-bottom: 22px;
}

.actions-intro {
  max-width: 720px;
  font-size: 0.96rem;
  line-height: 1.6;
  color: #35577d;
  margin: 0;
}

.actions-astro-box {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0b4d7a;
  border-radius: 18px;
  overflow: hidden;
  height: 220px;
  width: 100%;
}

.actions-astro {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}

.actions-cards-wrap {
  position: relative;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}

.action-card {
  position: relative;
  height: 380px;
  border-radius: 12px;
  overflow: hidden;
}

.action-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.action-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 52, 92, 0.96),
    rgba(0, 52, 92, 0.18)
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px 16px 18px;
  color: #fff;
}

.action-module {
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: #15c9e8;
  text-transform: uppercase;
  text-align: center;
  margin: 0 0 6px;
}

.action-title {
  font-size: 1.05rem;
  line-height: 1.12;
  font-weight: 900;
  margin: 0 0 8px;
  text-align: center;
}

.action-text {
  font-size: 0.82rem;
  line-height: 1.42;
  margin: 0 0 12px;
  text-align: center;
}

.action-btn {
  align-self: center;
  padding: 8px 18px;
  border-radius: 6px;
  border: 1px solid #15c9e8;
  background: transparent;
  color: #fff;
  font-size: 0.72rem;
  font-weight: 700;
  cursor: pointer;
}

.actions-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 4;
  width: 44px;
  height: 44px;
  border-radius: 999px;
  border: none;
  background: rgba(255, 255, 255, 0.96);
  color: #6a7d94;
  font-size: 30px;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(16, 35, 63, 0.15);
}

.actions-arrow-left {
  left: -18px;
}

.actions-arrow-right {
  right: -18px;
}

@media (max-width: 1200px) {
  .news-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }

  .actions-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .actions-top {
    grid-template-columns: 1fr;
  }

  .news-featured {
    height: 360px;
  }
}

@media (max-width: 768px) {
  .promo-hero,
  .promo-news-section,
  .promo-actions-section {
    padding-inline: 18px;
  }

  .promo-hero-inner {
    padding: 24px 10px;
  }

  .promo-title {
    font-size: 34px;
  }

  .promo-text {
    font-size: 14px;
  }

  .section-title.center,
  .section-title.left {
    font-size: 1.7rem;
  }

  .news-featured {
    height: 250px;
  }

  .news-featured-overlay {
    padding: 0 24px 20px;
  }

  .news-title {
    font-size: 1.8rem;
  }

  .news-text {
    font-size: 14px;
  }

  .news-grid        { grid-template-columns: 1fr; }
  .actions-grid     { grid-template-columns: 1fr; }

  .news-arrow,
  .actions-arrow {
    display: none;
  }

  .promo-actions-inner {
    padding: 22px 18px;
  }
}
</style>