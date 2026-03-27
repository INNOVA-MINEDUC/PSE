<template>
  <main class="promo-page">
    <!-- HERO AZUL SOLO ARRIBA -->
    <section class="promo-hero">
      <div class="promo-hero-inner">
        <p class="promo-kicker">MÓDULO 1 · Promoción y prevención</p>

        <h1 class="promo-title">
          Promoción de la salud y prevención de enfermedades en centros educativos
        </h1>

        <p class="promo-text">
          El PSE refuerza las acciones de prevención y promoción de la salud dentro de los centros
          educativos, con el objetivo de mejorar el bienestar de la comunidad estudiantil. Estas
          acciones se desarrollan de forma progresiva y coordinada por el Ministerio de Salud
          Pública y Asistencia Social y el Ministerio de Educación.
        </p>
      </div>
    </section>

    <!-- NOTICIAS / ACTIVIDADES -->
    <section class="promo-news-section">
      <div class="promo-news-inner">
        <div class="news-header">
          <div>
            <h2 class="section-title">Noticias y actividades</h2>
            <p class="news-subtitle">
              Hechos destacados del módulo de promoción y prevención en los centros educativos.
            </p>
          </div>
        </div>

        <!-- NOTICIA DESTACADA (BANNER AUTOMÁTICO) -->
        <article
          class="news-featured"
          :style="{ backgroundImage: `url(${featuredNews.img})` }"
        >
          <div class="news-featured-overlay">
            <p class="news-date">{{ featuredNews.fecha }}</p>
            <h3 class="news-title">{{ featuredNews.titulo }}</h3>
            <p class="news-text">
              {{ featuredNews.resumen }}
            </p>
          </div>
        </article>

        <!-- Controles del carrusel (opcional, además del auto) -->
        <div class="carousel-controls">
          <button class="carousel-btn" type="button" @click="goPrev">
            ◀ Anterior
          </button>

          <div class="carousel-dots">
            <button
              v-for="(n, index) in demoNews"
              :key="n.id"
              type="button"
              class="dot"
              :class="{ active: index === currentIndex }"
              @click="goToIndex(index)"
            ></button>
          </div>

          <button class="carousel-btn" type="button" @click="goNext">
            Siguiente ▶
          </button>
        </div>

        <!-- OTRAS NOTICIAS EN TARJETAS -->
        <div class="news-grid">
          <article
            v-for="news in otherNews"
            :key="news.id"
            class="news-card"
          >
            <div
              class="news-card-image"
              :style="{ backgroundImage: `url(${news.img})` }"
            ></div>
            <div class="news-card-body">
              <p class="news-date-small">{{ news.fecha }}</p>
              <h4 class="news-card-title">{{ news.titulo }}</h4>
              <p class="news-card-text">
                {{ news.resumen }}
              </p>
              <button class="news-card-btn" type="button">
                Ver detalle
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- BLOQUE DE ACTIVIDADES REALIZADAS -->
    <section class="promo-actions-section">
      <div class="promo-actions-inner">
        <div class="actions-header">
          <div>
            <h2 class="section-title">Actividades realizadas en los centros educativos</h2>
            <p class="actions-intro">
              Intervenciones que se desarrollan en el marco del módulo de promoción y prevención
              en distintos niveles educativos.
            </p>
          </div>
        </div>

        <div class="actions-grid">
          <article
            v-for="(actividad, index) in actividades"
            :key="actividad.id"
            class="action-card"
          >
            <div
              class="action-card-image"
              :style="{ backgroundImage: `url(${actividad.img})` }"
            ></div>
            <div class="action-card-body">
              <p class="action-pill">
                {{ index + 1 }}
              </p>
              <h3 class="action-title">{{ actividad.titulo }}</h3>
              <p class="action-text">
                {{ actividad.descripcion }}
              </p>
              <p class="action-meta">
                {{ actividad.meta }}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

import imgPromocion from '@/assets/mod-promocion.jpg'
import imgAtencion from '@/assets/mod-atencion.jpg'
import imgMedicamentos from '@/assets/mod-medicamentos.jpg'
import imgLlamadas from '@/assets/mod-llamadas.jpg'

/* ===== NOTICIAS (BANNER + CARDS) ===== */

const demoNews = [
  {
    id: 1,
    titulo: 'Jornada de vacunación en escuela rural',
    fecha: '15 febrero 2025',
    resumen:
      'Se realizó una jornada de vacunación, desparasitación y control de crecimiento para niñas y niños de preprimaria y primaria.',
    img: imgPromocion
  },
  {
    id: 2,
    titulo: 'Campaña de lavado de manos en escuelas urbanas',
    fecha: '3 febrero 2025',
    resumen:
      'Docentes y personal de salud realizaron demostraciones prácticas de lavado de manos y hábitos de higiene en el recreo.',
    img: imgAtencion
  },
  {
    id: 3,
    titulo: 'Aplicación de barniz con flúor en estudiantes de primaria',
    fecha: '28 enero 2025',
    resumen:
      'Niñas y niños de primero a tercero primaria recibieron barniz con flúor y material educativo sobre cuidado dental.',
    img: imgMedicamentos
  },
  {
    id: 4,
    titulo: 'Prevención del dengue con acciones comunitarias',
    fecha: '20 enero 2025',
    resumen:
      'Se organizaron brigadas escolares y comunitarias para identificar y eliminar criaderos de zancudos en los alrededores del centro educativo.',
    img: imgLlamadas
  }
]

const currentIndex = ref(0)

const featuredNews = computed(() => demoNews[currentIndex.value])

const otherNews = computed(() =>
  demoNews.filter((_, index) => index !== currentIndex.value)
)

const goPrev = () => {
  currentIndex.value =
    currentIndex.value === 0 ? demoNews.length - 1 : currentIndex.value - 1
}

const goNext = () => {
  currentIndex.value =
    currentIndex.value === demoNews.length - 1 ? 0 : currentIndex.value + 1
}

const goToIndex = (index) => {
  currentIndex.value = index
}

/* AUTO CAROUSEL */
const intervalId = ref(null)

onMounted(() => {
  intervalId.value = setInterval(() => {
    goNext()
  }, 6000) // cambia cada 6 segundos
})

onUnmounted(() => {
  if (intervalId.value) {
    clearInterval(intervalId.value)
  }
})

/* ===== ACTIVIDADES (CON IMAGENES) ===== */

const actividades = [
  {
    id: 'desparasitacion',
    titulo: 'Jornadas de desparasitación escolar',
    descripcion:
      'Organización de jornadas periódicas para niñas, niños y adolescentes en los centros educativos, según lineamientos del MSPAS.',
    meta: 'Registro de estudiantes atendidos y coordinación con servicios de salud.',
    img: imgPromocion
  },
  {
    id: 'inmunizacion',
    titulo: 'Jornadas de inmunización',
    descripcion:
      'Apoyo a las brigadas de vacunación para completar el esquema nacional de vacunación en el entorno escolar.',
    meta: 'Reducción de ausentismo y fortalecimiento del esquema de vacunación.',
    img: imgAtencion
  },
  {
    id: 'barniz-fluor',
    titulo: 'Aplicación de barniz con flúor',
    descripcion:
      'Intervenciones de salud bucal para prevenir caries y fortalecer los hábitos de higiene oral desde edades tempranas.',
    meta: 'Material educativo para estudiantes y familias.',
    img: imgMedicamentos
  },
  {
    id: 'dengue',
    titulo: 'Prevención del dengue',
    descripcion:
      'Actividades educativas y comunitarias para la eliminación de criaderos de zancudos y reducción de riesgos.',
    meta: 'Brigadas escolares y limpieza de patios y alrededores.',
    img: imgLlamadas
  },
  {
    id: 'renal',
    titulo: 'Promoción de salud renal',
    descripcion:
      'Charlas sobre hidratación adecuada, alimentación saludable y signos de alerta de enfermedad renal.',
    meta: 'Enfoque especial en adolescentes y jóvenes.',
    img: imgPromocion
  }
]
</script>

<style scoped>
/* ===== LAYOUT GENERAL ===== */

.promo-page {
  background: #f5f5f7;
  min-height: 100vh;
  color: #111827;
}

/* ===== HERO AZUL (SOLO ARRIBA) ===== */

.promo-hero {
  padding: 32px 40px 28px;
  background: #020617;
  border-bottom: 1px solid rgba(148, 163, 184, 0.3);
  color: #f9fafb;
}

.promo-hero-inner {
  max-width: 1440px;
  margin: 0 auto;
}

.promo-kicker {
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #60a5fa;
  margin-bottom: 4px;
}

.promo-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.promo-text {
  font-size: 0.9rem;
  line-height: 1.6;
  color: #e5e7eb;
}

/* ===== SECCIONES EN FONDO CLARO ===== */

.promo-news-section,
.promo-actions-section {
  padding: 24px 40px 32px;
  background: #f5f5f7;
}

.promo-actions-section {
  padding-top: 0;
  padding-bottom: 40px;
}

.promo-news-inner,
.promo-actions-inner {
  max-width: 1440px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 18px;
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.12);
  padding: 18px 22px 22px;
}

.promo-actions-inner {
  margin-top: 12px;
}

.section-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 6px;
  color: #020617;
}

/* ===== NOTICIAS ===== */

.news-header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
}

.news-subtitle {
  font-size: 0.82rem;
  color: #4b5563;
}

/* NOTICIA DESTACADA (BANNER) */

.news-featured {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  height: 380px; /* MÁS GRANDE AÚN 💙 */
  background-size: cover;
  background-position: center;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.18);
}

.news-featured-overlay {
  position: absolute;
  inset: 0;
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: linear-gradient(
    to top,
    rgba(15, 23, 42, 0.9),
    rgba(15, 23, 42, 0.1)
  );
  color: #f9fafb;
}

.news-date {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: #bfdbfe;
  margin-bottom: 4px;
}

.news-title {
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 4px;
}

.news-text {
  font-size: 0.87rem;
  color: #e5e7eb;
}

/* Controles carrusel */

.carousel-controls {
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.carousel-btn {
  font-size: 0.75rem;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid #c4d3ff;
  background: #ffffff;
  color: #1d4ed8;
  cursor: pointer;
}

.carousel-dots {
  display: flex;
  gap: 6px;
  margin: 0 4px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  border: none;
  background: #cbd5f5;
  cursor: pointer;
}

.dot.active {
  background: #4f46e5;
}

/* TARJETAS DE NOTICIAS */

.news-grid {
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.news-card {
  background: #ffffff;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 10px 26px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
}

.news-card-image {
  height: 120px;
  background-size: cover;
  background-position: center;
}

.news-card-body {
  padding: 10px 12px 12px;
}

.news-date-small {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: #6b7280;
  margin-bottom: 2px;
}

.news-card-title {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 4px;
  color: #111827;
}

.news-card-text {
  font-size: 0.8rem;
  color: #4b5563;
  margin-bottom: 6px;
}

.news-card-btn {
  font-size: 0.75rem;
  border-radius: 999px;
  padding: 5px 12px;
  border: 1px solid #93c5fd;
  background: #eff6ff;
  color: #1d4ed8;
  cursor: pointer;
}

/* ===== ACTIVIDADES REALIZADAS ===== */

.actions-header {
  margin-bottom: 10px;
}

.actions-intro {
  font-size: 0.85rem;
  color: #4b5563;
  max-width: 820px;
}

.actions-grid {
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.action-card {
  background: #ffffff;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 10px 26px rgba(15, 23, 42, 0.06);
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(148, 163, 184, 0.35);
}

.action-card-image {
  height: 120px;
  background-size: cover;
  background-position: center;
}

.action-card-body {
  padding: 10px 12px 12px;
}

.action-pill {
  display: inline-block;
  font-size: 0.7rem;
  letter-spacing: 0.13em;
  color: #1d4ed8;
  background: #e0edff;
  border-radius: 999px;
  padding: 3px 8px;
  margin-bottom: 4px;
}

.action-title {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 4px;
  color: #111827;
}

.action-text {
  font-size: 0.8rem;
  color: #4b5563;
  margin-bottom: 4px;
}

.action-meta {
  font-size: 0.75rem;
  color: #6b7280;
}

/* ===== RESPONSIVE ===== */

@media (max-width: 1100px) {
  .news-grid,
  .actions-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 800px) {
  .promo-hero,
  .promo-news-section,
  .promo-actions-section {
    padding-inline: 20px;
  }

  .promo-news-inner,
  .promo-actions-inner {
    padding-inline: 16px;
  }

  .news-grid,
  .actions-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
