<template>
  <main class="promo-page">
    <!-- HERO SUPERIOR -->
    <section class="promo-hero" :style="{ backgroundImage: `url(${bannerPromocion})` }">
      <div class="promo-hero-overlay">
        <div class="promo-hero-inner">
          <p class="promo-kicker">MÓDULO 1 · PROMOCIÓN Y PREVENCIÓN</p>

          <h1 class="promo-title">
            Promoción de la salud y
            prevención de enfermedades
            en <span class="highlight">centros educativos</span>
          </h1>

          <p class="promo-text">
            El PSE refuerza las acciones de prevención y promoción de la salud dentro de los
            centros educativos, con el objetivo de mejorar el bienestar de la comunidad
            estudiantil. Estas acciones se desarrollan de forma progresiva y coordinada por
            el Ministerio de Salud Pública y Asistencia Social y el Ministerio de Educación.
          </p>
        </div>
      </div>
    </section>

    <!-- NOTICIAS -->
    <section class="promo-news-section">
      <div class="promo-news-inner">
        <div class="news-header">
          <div>
            <h2 class="section-title center">Noticias y actividades</h2>
            <p class="news-subtitle center">
              El Portal de Salud PSE del Ministerio de Educación es una plataforma integral diseñada para
              garantizar el bienestar de los estudiantes del sistema educativo nacional, centralizando
              servicios médicos, apoyo preventivo y asistencia en momentos críticos.
            </p>
          </div>
        </div>

        <!-- BANNER PRINCIPAL EN MOVIMIENTO -->
        <div class="news-featured-wrap">
          <button class="news-arrow news-arrow-left" type="button" @click="goPrev">‹</button>

          <article
            class="news-featured"
            :style="{ backgroundImage: `url(${featuredNews.img})` }"
          >
            <div class="news-featured-overlay">
              <p class="news-category">{{ featuredNews.categoria }}</p>
              <h3 class="news-title">{{ featuredNews.titulo }}</h3>
              <p class="news-text">{{ featuredNews.resumen }}</p>
            </div>
          </article>

          <button class="news-arrow news-arrow-right" type="button" @click="goNext">›</button>
        </div>

        <!-- 4 CARDS FIJAS ABAJO -->
        <div class="news-grid">
          <article
            v-for="news in demoNews"
            :key="news.id"
            class="news-card"
            :style="{ backgroundImage: `url(${news.img})` }"
          >
            <div class="news-card-overlay">
              <h4 class="news-card-title">{{ news.titulo }}</h4>
              <p class="news-card-text">{{ news.resumen }}</p>
              <button class="news-card-btn" type="button">VER DETALLE</button>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ACTIVIDADES -->
    <section class="promo-actions-section">
      <div class="promo-actions-inner">
        <div class="actions-top">
          <div class="actions-copy">
            <h2 class="section-title left">
              Actividades Realizadas
              en los Centros Educativos
            </h2>
            <p class="actions-intro">
              Somos un motor para la innovación educativa en UVG y estamos a la vanguardia en el uso de
              herramientas digitales para ayudar a estudiantes, docentes e investigadores a descubrir el
              potencial de la tecnología en la transformación de sus actividades académicas diarias.
            </p>
          </div>

          <div class="actions-astro-box">
            <img
              :src="astronautaActividades"
              alt="Astronauta actividades"
              class="actions-astro"
            />
          </div>
        </div>

        <div class="actions-cards-wrap">
          <button class="actions-arrow actions-arrow-left" type="button">‹</button>

          <div class="actions-grid">
            <article
              v-for="actividad in actividades"
              :key="actividad.id"
              class="action-card"
              :style="{ backgroundImage: `url(${actividad.img})` }"
            >
              <div class="action-card-overlay">
                <p class="action-module">MÓDULO {{ actividad.id }}</p>
                <h3 class="action-title">{{ actividad.titulo }}</h3>
                <p class="action-text">{{ actividad.descripcion }}</p>
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
import { ref, computed, onMounted, onUnmounted } from 'vue'

/* HERO */
const bannerPromocion = '/Promocion/banner/banner-promocion.png'

/* NOTICIAS */
const img1 = '/Promocion/noticias/noticia-1.png'
const img2 = '/Promocion/noticias/noticia-2.png'
const img3 = '/Promocion/noticias/noticia-3.png'
const img4 = '/Promocion/noticias/noticia-4.png'

const demoNews = [
  {
    id: 1,
    titulo: 'Jornada de vacunación en escuela rural',
    fecha: '15 febrero 2025',
    resumen:
      'Acciones para promover la salud y prevenir enfermedades en los centros educativos.',
    img: img1,
    categoria: 'PROMOCIÓN Y PREVENCIÓN'
  },
  {
    id: 2,
    titulo: 'Aplicación de barniz con flúor en estudiantes de primaria',
    fecha: '03 febrero 2025',
    resumen:
      'Niñas y niños de primero a tercero primaria recibieron barniz con flúor y material educativo sobre cuidado dental.',
    img: img2,
    categoria: 'PROMOCIÓN Y PREVENCIÓN'
  },
  {
    id: 3,
    titulo: 'Campaña de lavado de manos en escuelas urbanas',
    fecha: '28 enero 2025',
    resumen:
      'Inventario y distribución de medicamentos del programa a los establecimientos.',
    img: img3,
    categoria: 'PROMOCIÓN Y PREVENCIÓN'
  },
  {
    id: 4,
    titulo: 'Prevención del dengue con acciones comunitarias',
    fecha: '20 enero 2025',
    resumen:
      'Se organizaron brigadas escolares y comunitarias para identificar y eliminar criaderos de zancudos en los alrededores del centro educativo.',
    img: img4,
    categoria: 'PROMOCIÓN Y PREVENCIÓN'
  }
]

const currentIndex = ref(0)
const featuredNews = computed(() => demoNews[currentIndex.value])

const goPrev = () => {
  currentIndex.value =
    currentIndex.value === 0 ? demoNews.length - 1 : currentIndex.value - 1
}

const goNext = () => {
  currentIndex.value =
    currentIndex.value === demoNews.length - 1 ? 0 : currentIndex.value + 1
}

let intervalId = null

onMounted(() => {
  intervalId = setInterval(() => {
    goNext()
  }, 5000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})

/* ACTIVIDADES */
const astronautaActividades = '/Promocion/actividades/astronauta-actividades.png'

const actividades = [
  {
    id: 1,
    titulo: 'Jornadas de desparasitación escolar',
    descripcion:
      'Acciones para promover la salud y prevenir enfermedades en los centros educativos.',
    img: '/Promocion/actividades/actividad-1.png'
  },
  {
    id: 2,
    titulo: 'Jornadas de inmunización',
    descripcion:
      'Registro de atenciones médicas y seguimiento de casos de las y los estudiantes.',
    img: '/Promocion/actividades/actividad-2.png'
  },
  {
    id: 3,
    titulo: 'Prevención del dengue',
    descripcion:
      'Inventario y distribución de medicamentos del programa a los establecimientos.',
    img: '/Promocion/actividades/actividad-3.png'
  },
  {
    id: 4,
    titulo: 'Promoción de salud renal',
    descripcion:
      'Llamadas recibidas, derivaciones y seguimiento de casos relacionados con PSE.',
    img: '/Promocion/actividades/actividad-4.png'
  }
]
</script>

<style scoped>
.promo-page {
  background: #f2f5f8;
  min-height: 100vh;
  color: #111827;
}

/* HERO */
.promo-hero {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 430px;
  position: relative;
}

.promo-hero-overlay {
  background: linear-gradient(
    90deg,
    rgba(0, 44, 78, 0.96) 0%,
    rgba(0, 44, 78, 0.82) 38%,
    rgba(0, 44, 78, 0.18) 100%
  );
  min-height: 430px;
  display: flex;
  align-items: center;
}

.promo-hero-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 34px 44px;
  width: 100%;
}

.promo-kicker {
  font-size: 0.82rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #60d5f3;
  margin-bottom: 10px;
  font-weight: 700;
}

.promo-title {
  max-width: 620px;
  width: 100%;
  font-size: 56px;
  line-height: 1.02;
  font-weight: 900;
  color: #ffffff;
  margin: 0 0 18px;
  text-wrap: balance;
}

.highlight {
  color: #ffffff;
  position: relative;
  display: inline-block;
}

.highlight::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 6px;
  width: 100%;
  height: 10px;
  background: #15c9e8;
  z-index: -1;
  border-radius: 2px;
}

.promo-text {
  max-width: 760px;
  font-size: 18px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.94);
  margin: 0;
  text-align: justify;
}

.promo-dots {
  display: none;
}

/* SECCIONES */
.promo-news-section,
.promo-actions-section {
  padding: 60px 38px 60px;
  background: #f2f5f8;
}

.promo-news-inner,
.promo-actions-inner {
  max-width: 100%;
  margin: 0;
  padding: 0;
}

/* TITULOS */
.section-title {
  font-weight: 900;
  color: #10395f;
  line-height: 1.05;
}

.section-title.center {
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 10px;
}

.section-title.left {
  text-align: left;
  font-size: 2.2rem;
  margin-bottom: 12px;
}

/* NOTICIAS */
.news-header {
  margin-bottom: 32px;
}

.news-subtitle {
  max-width: 980px;
  margin: 0 auto;
  font-size: 0.9rem;
  color: #35577d;
  line-height: 1.6;
}

.news-subtitle.center {
  text-align: center;
}

.news-featured-wrap {
  position: relative;
}

.news-featured {
  width: 100%;
  height: 420px;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  border-radius: 0;
}

.news-featured-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 120px 40px;
  background: linear-gradient(
    to top,
    rgba(0, 52, 92, 0.96),
    rgba(0, 52, 92, 0.12)
  );
  border-bottom: 8px solid #15c9e8;
  color: #fff;
}

.news-category {
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #15c9e8;
  margin: 0 0 8px;
}

.news-title {
  font-size: clamp(34px, 3.2vw, 54px);
  line-height: 1.02;
  font-weight: 900;
  max-width: 760px;
  margin: 0 0 8px;
}

.news-text {
  max-width: 720px;
  font-size: 16px;
  line-height: 1.5;
  color: #e6eef7;
  margin: 0;
  text-align: justify;
}

.news-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;
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

.news-arrow-left {
  left: 30px;
}

.news-arrow-right {
  right: 30px;
}

.news-grid {
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.news-card {
  min-height: 310px;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.news-card-overlay {
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
  padding: 16px 14px 16px;
  color: #fff;
}

.news-card-title {
  font-size: 1.08rem;
  line-height: 1.05;
  font-weight: 900;
  margin: 0 0 8px;
  text-align: center;
}

.news-card-text {
  font-size: 0.8rem;
  line-height: 1.4;
  margin: 0 0 12px;
  text-align: center;
}

.news-card-btn {
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
  gap: 12px;
}

.action-card {
  min-height: 290px;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
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
  padding: 16px 14px 16px;
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
  font-size: 1.06rem;
  line-height: 1.04;
  font-weight: 900;
  margin: 0 0 8px;
  text-align: center;
}

.action-text {
  font-size: 0.8rem;
  line-height: 1.38;
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
  left: -22px;
}

.actions-arrow-right {
  right: -22px;
}

/* RESPONSIVE */
@media (max-width: 1200px) {
  .news-grid,
  .actions-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .actions-top {
    grid-template-columns: 1fr;
  }

  .actions-astro-box {
    max-width: 420px;
  }

  .news-featured-overlay {
    padding: 0 42px 24px;
  }

  .promo-title {
    font-size: 46px;
  }

  .promo-text {
    font-size: 16px;
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
    height: 260px;
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

  .news-arrow,
  .actions-arrow {
    display: none;
  }

  .promo-actions-inner {
    padding: 22px 18px;
  }
}
</style>