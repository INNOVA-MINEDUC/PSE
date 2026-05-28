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

    <section class="promo-news-section">
      <div class="promo-news-inner">
        <div class="news-header">
          <h2 class="section-title center">Noticias y actividades</h2>
          <p class="news-subtitle center">
            El Portal de Salud PSE centraliza acciones de promoción, prevención y bienestar estudiantil.
          </p>
        </div>

        <div class="news-featured-wrap">
          <button class="news-arrow news-arrow-left" type="button" @click="prevNews">‹</button>

          <article
            class="news-featured"
            :class="{ 'news-featured--clickable': featuredNews.id }"
            @click="irADetalle(featuredNews)"
          >
            <img :src="featuredNews.img" :alt="featuredNews.titulo" class="news-featured-img" loading="lazy" decoding="async" />

            <div class="news-featured-overlay">
              <p class="news-category">{{ featuredNews.categoria }}</p>
              <h3 class="news-title">{{ featuredNews.titulo }}</h3>
              <p class="news-text">{{ featuredNews.desc }}</p>
            </div>
          </article>

          <button class="news-arrow news-arrow-right" type="button" @click="nextNews">›</button>
        </div>

        <div class="news-grid">
          <article v-for="(item, i) in noticias" :key="i" class="news-card">
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
                <p class="action-module">MÓDULO {{ index + 1 }}</p>
                <h3 class="action-title">{{ actividad.titulo }}</h3>
                <p class="action-text">{{ actividad.desc }}</p>
                <button class="action-btn" type="button">VER DETALLE</button>
              </div>
            </article>
          </div>

          <button class="actions-arrow actions-arrow-right" type="button">›</button>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
const router = useRouter()

const bannerPromocion = '/Promocion/banner/banner-promocion.webp'
const astronautaActividades = '/Promocion/actividades/astronauta-actividades.webp'

const noticiasBase = [
  {
    img: '/Promocion/noticias/noticia-1.webp',
    titulo: 'Jornada de vacunación en escuela rural',
    desc: 'Acciones para promover la salud y prevenir enfermedades en los centros educativos.',
    categoria: 'PROMOCIÓN Y PREVENCIÓN'
  },
  {
    img: '/Promocion/noticias/noticia-2.webp',
    titulo: 'Aplicación de barniz con flúor en estudiantes de primaria',
    desc: 'Niñas y niños de primero a tercero primaria recibieron barniz con flúor y material educativo sobre cuidado dental.',
    categoria: 'PROMOCIÓN Y PREVENCIÓN'
  },
  {
    img: '/Promocion/noticias/noticia-3.webp',
    titulo: 'Campaña de lavado de manos en escuelas urbanas',
    desc: 'Acciones preventivas para fortalecer hábitos de higiene en los establecimientos educativos.',
    categoria: 'PROMOCIÓN Y PREVENCIÓN'
  },
  {
    img: '/Promocion/noticias/noticia-4.webp',
    titulo: 'Prevención del dengue con acciones comunitarias',
    desc: 'Se organizaron brigadas escolares y comunitarias para identificar y eliminar criaderos de zancudos.',
    categoria: 'PROMOCIÓN Y PREVENCIÓN'
  }
]

const noticiasApi = ref([])

const resolveImage = (url) => {
  if (!url) return '/Promocion/noticias/noticia-1.png'
  if (url.startsWith('http')) return url
  if (url.startsWith('/Promocion') || url.startsWith('/Home')) return url
  return `${API_URL}${url}`
}

const noticias = computed(() => {
  const dinamicas = noticiasApi.value.map((n) => ({
    id: n.id,
    img: resolveImage(n.imagen_url),
    titulo: n.titulo,
    desc: n.descripcion_corta,
    categoria: 'PROMOCIÓN Y PREVENCIÓN'
  }))

  return [...noticiasBase, ...dinamicas]
})

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
  }
]

const currentNews = ref(1)

const featuredNews = computed(() => noticias.value[currentNews.value] || noticias.value[0])

const nextNews = () => {
  currentNews.value = (currentNews.value + 1) % noticias.value.length
}

const prevNews = () => {
  currentNews.value = (currentNews.value - 1 + noticias.value.length) % noticias.value.length
}

const cargarNoticias = async () => {
  try {
    const res = await fetch(`${API_URL}/api/noticias`)
    const data = await res.json()

    if (data.success) {
      noticiasApi.value = data.data
        .filter((n) => Number(n.activo) === 1 && n.modulo === 'promocion')
        .filter((n) => n.titulo !== 'Jornada de salud escolar en zona rural')
        .sort((a, b) => Number(a.orden || 0) - Number(b.orden || 0))
    }
  } catch (error) {
    console.error('Error cargando noticias:', error)
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
  background: #f2f5f8;
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

.promo-news-section,
.promo-actions-section {
  padding: 52px 10px 48px;
  background: #f2f5f8;
}

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
  width: 100%;
}

.news-featured {
  width: 100vw;
  height: 360px;
  position: relative;
  overflow: hidden;
  border-radius: 0;
  margin-left: -10px;
}

.news-featured-img {
  width: 100vw;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.news-featured-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 86px 28px;
  background: linear-gradient(
    to top,
    rgba(0, 52, 92, 0.9) 0%,
    rgba(0, 52, 92, 0.4) 25%,
    rgba(0, 52, 92, 0) 40%
  );
  border-bottom: 6px solid #15c9e8;
  color: #fff;
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

.news-grid {
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 14px;
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
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
  grid-template-columns: 1.45fr 0.9fr;
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
  min-height: 190px;
  overflow: hidden;
}

.actions-astro {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.actions-cards-wrap {
  position: relative;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;
}

.action-card {
  position: relative;
  min-height: 340px;
  border-radius: 12px;
  overflow: hidden;
}

.action-card-img {
  width: 100%;
  height: 100%;
  min-height: 340px;
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
  font-size: 1.15rem;
  line-height: 1.06;
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

@media (max-width: 1400px) {
  .news-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 1200px) {
  .news-grid,
  .actions-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .actions-top {
    grid-template-columns: 1fr;
  }

  .news-featured {
    width: 100%;
    height: 360px;
    margin-left: 0;
  }

  .news-featured-img {
    width: 100%;
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

  .news-grid,
  .actions-grid {
    grid-template-columns: 1fr;
  }

  .news-card-img,
  .action-card-img {
    min-height: 260px;
  }

  .news-arrow,
  .actions-arrow {
    display: none;
  }

  .promo-actions-inner {
    padding: 22px 18px;
  }
}
</style>