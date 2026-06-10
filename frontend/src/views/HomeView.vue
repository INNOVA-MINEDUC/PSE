<template>
  <main class="page">
    <!-- HERO -->
    <section
    class="hero"
    :style="{ backgroundImage: `url(${heroImage})` }">
    <div class="hero-content">
      <p class="hero-kicker">
        ACUERDO GUBERNATIVO 36-2024 Y ACUERDO MINISTERIAL 815-2024
      </p>

      <h1 class="hero-title">Portal de Salud PSE</h1>

      <p class="hero-desc">
        Plataforma del Ministerio de Educación para centralizar atenciones médicas,
        llamadas, suministro de medicamentos, promoción de la salud y apoyos
        funerarios para estudiantes del sistema educativo nacional.
      </p>

  </div>
</section>
    

    <!-- FRANJA LOGOS -->
    <section class="logo-franja">
      <img
        class="logo-franja-img"
        :src="logoFranja"
        alt="Franja de logos institucionales"
      />
    </section>

    <!-- INDICADORES NACIONALES -->
    <section class="indicadores">
      <div class="section-shell">

        <div class="kpi-divider">
          <hr class="kpi-divider-line" />
          <span class="kpi-divider-label">INDICADORES NACIONALES &nbsp;·&nbsp; {{ kpis.periodo || 'enero – julio 2025' }}</span>
          <hr class="kpi-divider-line" />
        </div>

        <div class="kpi-grid">
          <div class="kpi-card" v-for="item in kpiPrincipales" :key="item.id">
            <div class="kpi-icon-wrap">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" :d="item.iconPath" />
              </svg>
            </div>
            <div class="kpi-number">{{ item.value }}</div>
            <div class="kpi-label">{{ item.label }}</div>
          </div>
        </div>

        <div class="sec-grid">
          <div class="sec-item">
            <span class="sec-val">{{ displayKpis.estudiantes.toLocaleString('es-GT') }}</span>
            <span class="sec-label">Estudiantes atendidos</span>
            <span class="sec-module">Atención médica</span>
          </div>
          <div class="sec-item">
            <span class="sec-val">{{ displayKpis.establecimientos.toLocaleString('es-GT') }}</span>
            <span class="sec-label">Establecimientos con suministro</span>
            <span class="sec-module">Medicamentos</span>
          </div>
          <div class="sec-item">
            <span class="sec-val">{{ displayKpis.cobertura }}</span>
            <span class="sec-label">Municipios cubiertos</span>
            <span class="sec-module">Cobertura nacional</span>
          </div>
          <div class="sec-item">
            <span class="sec-val sec-val--money">{{ formatoMoneda(displayKpis.montoTotal) }}</span>
            <span class="sec-label">Monto total entregado</span>
            <span class="sec-module">Apoyo funerario</span>
          </div>
          <div class="sec-item sec-item--sex">
            <div class="sex-bars">
              <div class="sex-bar-row">
                <span class="sex-dot sex-dot--m"></span>
                <div class="sex-bar-track">
                  <div class="sex-bar-fill sex-bar-fill--m" :style="{ width: displayKpis.porcentajeHombres + '%' }"></div>
                </div>
                <span class="sex-pct">{{ displayKpis.porcentajeHombres }}%</span>
                <span class="sex-name">Hombres</span>
              </div>
              <div class="sex-bar-row">
                <span class="sex-dot sex-dot--f"></span>
                <div class="sex-bar-track">
                  <div class="sex-bar-fill sex-bar-fill--f" :style="{ width: displayKpis.porcentajeMujeres + '%' }"></div>
                </div>
                <span class="sex-pct">{{ displayKpis.porcentajeMujeres }}%</span>
                <span class="sex-name">Mujeres</span>
              </div>
            </div>
            <span class="sec-label">Distribución por sexo</span>
            <span class="sec-module">Atención médica</span>
          </div>
        </div>

      </div>
    </section>

    <!-- MÓDULOS DEL PROGRAMA -->
    <section class="modulos-section">
      <div class="section-shell">
        <h2 class="section-title modulos-title">Beneficios del PSE</h2>
        <p class="section-text modulos-intro">
          El Portal de Salud PSE del Ministerio de Educación garantiza el bienestar integral
          de los estudiantes del sistema educativo nacional, centralizando atención médica,
          medicamentos, apoyo preventivo y asistencia en momentos críticos.
        </p>
        <div class="modulos-grid">
          <article
            v-for="modulo in modulos"
            :key="modulo.id"
            class="modulo-card"
          >
            <div class="modulo-image-wrap">
              <img
                :src="modulo.imagen"
                :alt="modulo.titulo"
                class="modulo-image"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div class="modulo-overlay"></div>
            <div class="modulo-body">
              <p class="modulo-id">MÓDULO {{ String(modulo.id).padStart(2, '0') }}</p>
              <h3 class="modulo-title">{{ modulo.titulo }}</h3>
              <p class="modulo-desc">{{ modulo.descripcion }}</p>
              <RouterLink :to="modulo.ruta" class="modulo-btn-link">
                <button class="modulo-btn" type="button">Más información</button>
              </RouterLink>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- NOTICIAS -->
    <section class="noticias">
      <div class="section-shell noticias-shell">
        <h2 class="section-title noticias-title">Noticias y actividades</h2>

        <p class="section-text noticias-text">
          Seguimiento de las acciones, jornadas y campañas realizadas por el Programa de Salud Escolar
          en los establecimientos educativos del sistema nacional.
        </p>

        <div v-if="cargandoNoticias" class="noticias-empty">
          Cargando noticias…
        </div>

        <div v-else-if="noticiasCarrusel.length === 0" class="noticias-empty">
          No hay noticias disponibles en este momento.
        </div>

        <div v-else class="noticias-wrap">
          <button class="noticias-arrow noticias-arrow-left" type="button" @click="prevNoticia" aria-label="Noticia anterior">‹</button>

          <article class="noticia-card">
            <img
              :src="noticiaDestacada.imagen"
              :alt="noticiaDestacada.titulo"
              class="noticia-img"
              loading="lazy"
              decoding="async"
            />

            <div class="noticia-overlay"></div>

            <div class="noticia-body">
              <p class="noticia-fecha">{{ noticiaDestacada.fecha }}</p>
              <p class="noticia-categoria">{{ noticiaDestacada.categoria }}</p>
              <h3 class="noticia-titulo">{{ noticiaDestacada.titulo }}</h3>
              <p class="noticia-desc">{{ noticiaDestacada.descripcion }}</p>
              <RouterLink
                v-if="noticiaDestacada.id"
                :to="`/noticias/${noticiaDestacada.id}`"
                class="noticia-ver-btn"
              >
                Ver noticia completa →
              </RouterLink>
            </div>
          </article>

          <button class="noticias-arrow noticias-arrow-right" type="button" @click="nextNoticia" aria-label="Noticia siguiente">›</button>
        </div>
      </div>
    </section>

    <AppFooter />
  </main>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import AppFooter from '@/components/AppFooter.vue'
import { computed, onMounted, onUnmounted, ref } from 'vue'

const API_URL = import.meta.env.VITE_API_URL


const logoFranja = '/Home/LOGOS/logo-franja.png'
const heroImage = '/Home/RECURSOS/hero-min.webp'

const modulos = [
  {
    id: 1,
    titulo: 'Promoción y Prevención',
    descripcion: 'Acciones para promover la salud y prevenir enfermedades en los centros educativos.',
    imagen: '/Home/IMAGENES/noticia-jornada-salud.webp',
    ruta: '/promocion'
  },
  {
    id: 2,
    titulo: 'Atención a enfermedades',
    descripcion: 'Registro de atenciones médicas y seguimiento de casos de las y los estudiantes.',
    imagen: '/Home/IMAGENES/noticia-virus.webp',
    ruta: '/atencion'
  },
  {
    id: 3,
    titulo: 'Suministro de medicamentos',
    descripcion: 'Inventario y distribución de medicamentos del programa a los establecimientos.',
    imagen: '/Home/IMAGENES/mod-medicamentos.webp',
    ruta: '/medicamentos'
  },
  {
    id: 4,
    titulo: 'Centro de llamadas 1528',
    descripcion: 'Llamadas recibidas, derivaciones y seguimiento de casos relacionados con PSE.',
    imagen: '/Home/IMAGENES/mod-llamadas.webp',
    ruta: '/llamadas'
  },
  {
    id: 5,
    titulo: 'Apoyo funerario',
    descripcion: 'Gestión y apoyo en casos funerarios para estudiantes del sistema educativo nacional.',
    imagen: '/Home/IMAGENES/noticia-vacunacion.webp',
    ruta: '/funerarios'
  }
]

const iconPaths = {
  consultas:    'M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z',
  medicamentos: 'M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 1-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5',
  llamadas:     'M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6.75Z',
  familias:     'M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z',
}


const kpis = ref({
  consultas:          674656,
  medicamentos:       800000,
  llamadas:           24221,
  familias:           329,
  noticias:           4,
  estudiantes:        222704,
  establecimientos:   1350,
  cobertura:          340,
  montoTotal:         2467000,
  montoPorEstudiante: 7500,
  porcentajeHombres:  52,
  porcentajeMujeres:  48,
  masculinos:         193,
  femeninos:          136,
  periodo:            ''
})

const formatoMoneda = (val) => {
  if (!val && val !== 0) return '—'
  return 'Q' + Number(val).toLocaleString('es-GT')
}

/* Valores animados (counter 0 → real) */
const displayKpis = ref({
  consultas: 0, medicamentos: 0, llamadas: 0, familias: 0, montoPorEstudiante: 0,
  estudiantes: 0, establecimientos: 0, cobertura: 0, montoTotal: 0,
  porcentajeHombres: 0, porcentajeMujeres: 0,
})

const animateNum = (key, target, duration = 1800) => {
  const t0 = performance.now()
  const tick = (now) => {
    const p = Math.min((now - t0) / duration, 1)
    const ease = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
    displayKpis.value[key] = Math.round(target * ease)
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

const animateAll = () => {
  animateNum('consultas',          kpis.value.consultas)
  animateNum('medicamentos',       kpis.value.medicamentos)
  animateNum('llamadas',           kpis.value.llamadas)
  animateNum('familias',           kpis.value.familias)
  animateNum('montoPorEstudiante', kpis.value.montoPorEstudiante, 1200)
  animateNum('estudiantes',        kpis.value.estudiantes)
  animateNum('establecimientos',   kpis.value.establecimientos, 1200)
  animateNum('cobertura',          kpis.value.cobertura, 1000)
  animateNum('montoTotal',         kpis.value.montoTotal)
  animateNum('porcentajeHombres',  kpis.value.porcentajeHombres, 1000)
  animateNum('porcentajeMujeres',  kpis.value.porcentajeMujeres, 1000)
}

const kpiPrincipales = computed(() => [
  { id: 'consultas',    iconPath: iconPaths.consultas,    value: displayKpis.value.consultas.toLocaleString('es-GT'),    label: 'Consultas atendidas'    },
  { id: 'medicamentos', iconPath: iconPaths.medicamentos, value: displayKpis.value.medicamentos.toLocaleString('es-GT'), label: 'Medicamentos entregados' },
  { id: 'llamadas',     iconPath: iconPaths.llamadas,     value: displayKpis.value.llamadas.toLocaleString('es-GT'),     label: 'Llamadas registradas'   },
  { id: 'familias',     iconPath: iconPaths.familias,     value: displayKpis.value.familias.toLocaleString('es-GT'),     label: 'Familias beneficiadas'  },
])

/* NOTICIAS HOME + PROMOCIÓN */
const noticiasApi = ref([])
const cargandoNoticias = ref(true)
const currentNoticia = ref(0)

const resolveImage = (url) => {
  if (!url) return '/Home/IMAGENES/noticia-vacunacion.webp'
  if (url.startsWith('http')) return url
  if (url.startsWith('/Home') || url.startsWith('/Promocion')) return url
  return `${API_URL}${url}`
}

const formatFecha = (fecha) => {
  if (!fecha) return 'SIN FECHA'

  return new Date(fecha)
    .toLocaleDateString('es-GT', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
    .toUpperCase()
}

const noticiasCarrusel = computed(() =>
  noticiasApi.value.map((n) => ({
    id: n.id,
    fecha: formatFecha(n.fecha_publicacion),
    categoria: 'PROMOCIÓN Y PREVENCIÓN',
    titulo: n.titulo,
    descripcion: n.descripcion_corta,
    imagen: resolveImage(n.imagen_url)
  }))
)

const noticiaDestacada = computed(() =>
  noticiasCarrusel.value[currentNoticia.value] ?? noticiasCarrusel.value[0] ?? {}
)

const nextNoticia = () => {
  currentNoticia.value =
    (currentNoticia.value + 1) % noticiasCarrusel.value.length
}

const prevNoticia = () => {
  currentNoticia.value =
    (currentNoticia.value - 1 + noticiasCarrusel.value.length) %
    noticiasCarrusel.value.length
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
      kpis.value.noticias = noticiasApi.value.length
    }
  } catch (error) {
    console.error('Error cargando noticias en Home:', error)
  } finally {
    cargandoNoticias.value = false
  }
}

let noticiaInterval = null

onMounted(async () => {
  cargarNoticias()

  noticiaInterval = setInterval(() => {
    nextNoticia()
  }, 5000)

  try {
    const [atencionRes, medRes, llamadasRes, funerarioRes] = await Promise.allSettled([
      fetch(`${API_URL}/api/atencion/metricas`),
      fetch(`${API_URL}/api/medicamentos/metricas`),
      fetch(`${API_URL}/api/llamadas/metricas`),
      fetch(`${API_URL}/api/funerario/metricas`)
    ])

    if (atencionRes.status === 'fulfilled') {
      const data = await atencionRes.value.json()
      if (data.success && data.data) {
        kpis.value.consultas         = data.data.consultas_atendidas   ?? kpis.value.consultas
        kpis.value.estudiantes       = data.data.estudiantes_atendidos ?? kpis.value.estudiantes
        kpis.value.porcentajeHombres = data.data.porcentaje_hombres    ?? kpis.value.porcentajeHombres
        kpis.value.porcentajeMujeres = data.data.porcentaje_mujeres    ?? kpis.value.porcentajeMujeres
        if (data.data.periodo) kpis.value.periodo = data.data.periodo
      }
    }
    if (medRes.status === 'fulfilled') {
      const data = await medRes.value.json()
      if (data.success && data.data) {
        kpis.value.medicamentos    = data.data.unidades_entregadas              ?? kpis.value.medicamentos
        kpis.value.establecimientos = data.data.establecimientos_con_suministro ?? kpis.value.establecimientos
        kpis.value.cobertura       = data.data.cobertura_nacional               ?? kpis.value.cobertura
      }
    }
    if (llamadasRes.status === 'fulfilled') {
      const data = await llamadasRes.value.json()
      if (data.success && data.data) {
        kpis.value.llamadas = data.data.total_llamadas ?? kpis.value.llamadas
      }
    }
    if (funerarioRes.status === 'fulfilled') {
      const data = await funerarioRes.value.json()
      if (data.success && data.data) {
        kpis.value.familias           = data.data.familias_beneficiadas  ?? kpis.value.familias
        kpis.value.masculinos         = data.data.casos_masculinos        ?? kpis.value.masculinos
        kpis.value.femeninos          = data.data.casos_femeninos         ?? kpis.value.femeninos
        kpis.value.montoTotal         = data.data.monto_total             ?? kpis.value.montoTotal
        kpis.value.montoPorEstudiante = data.data.monto_por_estudiante    ?? kpis.value.montoPorEstudiante
      }
    }
  } catch (err) {
    console.error('Error cargando métricas de módulos:', err)
  } finally {
    animateAll()
  }
})

onUnmounted(() => {
  if (noticiaInterval) clearInterval(noticiaInterval)
})
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #ffffff;
  overflow-x: hidden;
  color: #10233f;
}

/* HERO */
.hero {
  position: relative;
  min-height: 590px;
  height: 590px;
  max-height: 590px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
}

hero-banner-bg {
  min-height: 590px;
}


.hero-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 160px 44px 40px;
  width: 100%;
}

.hero-content {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 120px 44px 40px;
}

.hero-kicker {
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #60d5f3;
  margin: 0 0 8px;
  font-weight: 700;
}

.hero-title {
  max-width: 720px;
  width: 100%;
  font-size: 63px;
  line-height: 1.06;
  font-weight: 900;
  color: #ffffff;
  margin: 0 0 14px;
}

.hero-desc {
  margin: 0;
  max-width: 700px;
  font-size: 17px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.94);
  text-align: justify;
}


/* FRANJA */
.logo-franja {
  background: #ffffff;
}

.logo-franja-img {
  display: block;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 14px 40px;
}

/* GENERALES */
.section-shell {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 44px;
}

.section-title {
  margin: 0 0 14px;
  font-size: clamp(32px, 3.5vw, 48px);
  font-weight: 800;
  color: #10233f;
  text-align: center;
}

.section-text {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
  font-size: 15px;
  line-height: 1.7;
  color: #4b5c77;
}

/* INDICADORES NACIONALES */
.indicadores {
  padding: 52px 0 44px;
  background: #ffffff;
}

/* BENEFICIOS */
.beneficios {
  padding: 48px 0;
  background: #ffffff;
}

.beneficios-wrapper {
  background: #eaf0f4;
  border-radius: 24px;
  padding: 36px 34px 34px;
  max-width: 1580px;
  margin: 0 auto;
}

.beneficios-title {
  margin-bottom: 12px;
}

.beneficios-text {
  max-width: 820px;
  font-size: 14px;
  line-height: 1.6;
  color: #26496f;
  margin-bottom: 24px;
}

/* PILARES */
.pilares-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  margin-bottom: 24px;
}

.pilar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px 14px 18px;
  background: #ffffff;
  border-radius: 10px;
  border: 1px solid #dce8f0;
}

.pilar-icon-wrap {
  width: 40px;
  height: 40px;
  color: #17c4e8;
  margin-bottom: 11px;
}

.pilar-icon-wrap :deep(svg) {
  width: 100%;
  height: 100%;
}

.pilar-titulo {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 800;
  color: #10233f;
  line-height: 1.2;
}

.pilar-desc {
  margin: 0;
  font-size: 11.5px;
  line-height: 1.5;
  color: #5a7089;
}

/* DIVISOR KPI */
.kpi-divider {
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 4px 0 18px;
}

.kpi-divider-line {
  flex: 1;
  border: none;
  border-top: 1px solid #c6d8e6;
  margin: 0;
}

.kpi-divider-label {
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: 0.13em;
  color: #8da7be;
  text-transform: uppercase;
  white-space: nowrap;
}

/* KPI PRINCIPALES */
@keyframes kpiEnter {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0);    }
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 10px;
}

.kpi-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 22px 14px 18px;
  background: #ffffff;
  border-radius: 10px;
  border: 1px solid #dce8f0;
  box-shadow: 0 2px 8px rgba(16, 35, 63, 0.04);
  cursor: default;
  animation: kpiEnter 0.45s ease both;
  transition: transform 0.22s ease, box-shadow 0.22s ease;
}

.kpi-card:nth-child(1) { animation-delay: 0.05s; }
.kpi-card:nth-child(2) { animation-delay: 0.12s; }
.kpi-card:nth-child(3) { animation-delay: 0.19s; }
.kpi-card:nth-child(4) { animation-delay: 0.26s; }
.kpi-card:nth-child(5) { animation-delay: 0.33s; }

.kpi-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 28px rgba(16, 35, 63, 0.13);
}

.kpi-icon-wrap {
  width: 34px;
  height: 34px;
  color: #17c4e8;
  margin-bottom: 10px;
}

.kpi-icon-wrap :deep(svg) {
  width: 100%;
  height: 100%;
}

.kpi-number {
  font-size: clamp(20px, 2.2vw, 30px);
  font-weight: 900;
  color: #10233f;
  line-height: 1;
  margin-bottom: 6px;
  letter-spacing: -0.02em;
}

.kpi-label {
  font-size: 10.5px;
  font-weight: 700;
  color: #6a8299;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  line-height: 1.3;
}

/* INDICADORES SECUNDARIOS */
@keyframes secEnter {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0);    }
}

.sec-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  background: #10233f;
  border-radius: 12px;
  overflow: hidden;
}

.sec-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 28px 16px 24px;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  cursor: default;
  transition: background 0.22s ease;
  animation: secEnter 0.4s ease both;
}

.sec-item:nth-child(1) { animation-delay: 0.35s; }
.sec-item:nth-child(2) { animation-delay: 0.42s; }
.sec-item:nth-child(3) { animation-delay: 0.49s; }
.sec-item:nth-child(4) { animation-delay: 0.56s; }
.sec-item:nth-child(5) { animation-delay: 0.63s; }

.sec-item:hover {
  background: rgba(23, 196, 232, 0.07);
}

.sec-item:last-child {
  border-right: none;
}

.sec-val {
  font-size: clamp(22px, 2.2vw, 30px);
  font-weight: 900;
  color: #17c4e8;
  line-height: 1;
  margin-bottom: 7px;
}

.sec-val--money {
  font-size: clamp(16px, 1.6vw, 22px);
}

.sec-label {
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.90);
  line-height: 1.35;
  margin-bottom: 4px;
}

.sec-module {
  font-size: 9.5px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.09em;
  color: rgba(255, 255, 255, 0.35);
  margin-top: 2px;
}

/* Distribución por sexo */
.sex-bars {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  margin-bottom: 6px;
}

.sex-bar-row {
  display: flex;
  align-items: center;
  gap: 5px;
}

.sex-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}

.sex-dot--m { background: #17c4e8; }
.sex-dot--f { background: #f472b6; }

.sex-bar-track {
  flex: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 2px;
  overflow: hidden;
}

.sex-bar-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.9s ease;
}

.sex-bar-fill--m { background: #17c4e8; }
.sex-bar-fill--f { background: #f472b6; }

.sex-pct {
  font-size: 11px;
  font-weight: 700;
  color: #ffffff;
  min-width: 28px;
  text-align: right;
  flex-shrink: 0;
}

.sex-name {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.55);
  min-width: 40px;
  flex-shrink: 0;
}

/* MÓDULOS DEL PROGRAMA */
.modulos-section {
  padding: 48px 0 56px;
  background: #ffffff;
}

.modulos-title {
  margin-bottom: 14px;
}

.modulos-intro {
  max-width: 820px;
  margin: 0 auto 28px;
  font-size: 15px;
  line-height: 1.7;
  color: #4b5c77;
}


.modulos-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(180px, 1fr));
  gap: 14px;
}

.modulo-card {
  position: relative;
  min-height: 320px;
  border-radius: 12px;
  overflow: hidden;
  background: #0a4a7a;
}

.modulo-image-wrap {
  position: absolute;
  inset: 0;
}

.modulo-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.modulo-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(7, 62, 105, 0.10) 0%,
    rgba(8, 63, 106, 0.58) 50%,
    rgba(6, 56, 95, 0.96) 100%
  );
}

.modulo-body {
  position: relative;
  z-index: 2;
  height: 100%;
  min-height: 320px;
  padding: 70px 16px 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: center;
}

.modulo-id {
  margin: 0 0 5px;
  font-size: 10.5px;
  font-weight: 800;
  color: #17c4e8;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.modulo-title {
  margin: 0 0 8px;
  font-size: 17px;
  line-height: 1.15;
  font-weight: 800;
  color: #ffffff;
}

.modulo-desc {
  margin: 0 0 14px;
  font-size: 11px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.90);
}

.modulo-btn-link {
  align-self: center;
  text-decoration: none;
}

.modulo-btn {
  border: 1.5px solid rgba(23, 196, 232, 0.75);
  border-radius: 6px;
  background: transparent;
  color: #ffffff;
  font-family: inherit;
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 8px 16px;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
}

.modulo-btn:hover {
  background: rgba(23, 196, 232, 0.15);
  border-color: rgba(23, 196, 232, 1);
}

/* NOTICIAS */
.noticias {
  padding: 56px 0 0;
  background: #ffffff;
}

.noticias-shell {
  max-width: 100%;
  padding: 0;
}

.noticias-title {
  margin-bottom: 14px;
  padding: 0 28px;
}

.noticias-text {
  max-width: 1180px;
  margin: 0 auto 34px;
  font-size: 15px;
  line-height: 1.7;
  color: #35577d;
  padding: 0 28px;
}

.noticias-wrap {
  position: relative;
  width: 100%;
  max-width: 100%;
  margin: 0;
}

.noticia-card {
  position: relative;
  width: 100%;
  height: 560px;
  border-radius: 0;
  overflow: hidden;
  background: #0a4a7a;
}

.noticia-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.noticia-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 52, 92, 0.1) 0%,
    rgba(0, 52, 92, 0.4) 48%,
    rgba(0, 52, 92, 0.92) 100%
  );
}

.noticia-body {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 58%;
  padding: 0 0 30px 72px;
  color: #ffffff;
}

.noticia-fecha {
  margin: 0 0 12px;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.88);
}

.noticia-categoria {
  margin: 0 0 10px;
  font-size: 0.8rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #60d5f3;
}

.noticia-titulo {
  margin: 0 0 10px;
  font-size: clamp(28px, 3vw, 56px);
  line-height: 1.05;
  font-weight: 900;
  color: #ffffff;
  max-width: 980px;
}

.noticia-desc {
  margin: 0;
  max-width: 820px;
  font-size: 15px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.96);
}

.noticia-ver-btn {
  display: inline-block;
  margin-top: 16px;
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
}
.noticia-ver-btn:hover {
  background: rgba(255, 255, 255, 0.28);
  border-color: rgba(255, 255, 255, 0.8);
}

.noticias-empty {
  text-align: center;
  padding: 60px 20px;
  font-size: 15px;
  color: #7b8ea5;
}

/* FLECHAS */
.noticias-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;
  width: 52px;
  height: 52px;
  border-radius: 999px;
  border: none;
  background: rgba(255, 255, 255, 0.95);
  color: #6a7d94;
  font-size: 34px;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(16, 35, 63, 0.15);
}

.noticias-arrow-left {
  left: 56px;
}

.noticias-arrow-right {
  right: 56px;
}

/* PANTALLAS GRANDES — TV / Ultrawide */
@media (min-width: 1441px) {
  .noticia-body {
    width: 55%;
    padding: 0 0 36px 72px;
  }

  .noticias-arrow-left  { left:  calc(50% - 720px + 32px); }
  .noticias-arrow-right { right: calc(50% - 720px + 32px); }
}

@media (min-width: 1921px) {
  .hero-content {
    padding: 160px 80px 60px;
  }

  .noticia-card {
    height: 640px;
  }
}

/* RESPONSIVE */
@media (max-width: 1200px) {
  .hero {
    min-height: 520px;
  }

  .hero-content {
    padding: 120px 30px 30px;
  }

  .hero-title {
    font-size: clamp(40px, 4vw, 56px);
  }

  .logo-franja-img {
    padding: 16px 30px;
  }

  .section-shell {
    padding: 0 30px;
  }

  .modulos-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .sec-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .sec-item:nth-child(3) {
    border-right: none;
  }

  .noticia-body {
    width: 70%;
    padding: 0 0 24px 40px;
  }

  .noticias-arrow-left {
    left: 24px;
  }

  .noticias-arrow-right {
    right: 24px;
  }

  .noticias-shell {
    padding: 0 30px;
  }
}

@media (max-width: 1024px) {
  .hero {
    min-height: 480px;
    padding: 0;
    background-position: 70% center;
  }

  .hero-content {
    padding: 100px 20px 20px;
  }

  .beneficios-wrapper {
    padding: 32px 24px;
  }

  .noticia-card {
    height: 360px;
  }

  .noticia-body {
    width: 80%;
    padding: 0 0 20px 32px;
  }
}

@media (max-width: 768px) {
  .section-shell {
    padding: 0 20px;
  }

  .beneficios-wrapper {
    padding: 24px 20px;
  }

  .kpi-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .modulos-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  /* 5ta tarjeta de módulos sola → ocupa las 2 columnas */
  .modulos-grid .modulo-card:last-child:nth-child(odd) {
    grid-column: 1 / -1;
    max-width: 50%;
    margin: 0 auto;
  }

  .sec-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .sec-item:nth-child(2),
  .sec-item:nth-child(4) {
    border-right: none;
  }

  .sec-item:nth-child(3) {
    border-right: 1px solid rgba(255, 255, 255, 0.08);
  }

  /* Último item de sec-grid si queda solo */
  .sec-item:last-child:nth-child(odd) {
    grid-column: 1 / -1;
    border-right: none;
  }
}

@media (max-width: 640px) {
  .hero {
    min-height: 400px;
    padding: 0;
    background-position: 72% center;
  }

  .hero-content {
    padding: 80px 16px 20px;
  }

  .hero-kicker {
    font-size: 0.65rem;
    line-height: 1.4;
  }

  .hero-title {
    font-size: 32px;
    margin-bottom: 12px;
  }

  .hero-desc {
    font-size: 14px;
  }

.logo-franja-img {
    padding: 12px 16px;
  }

  .section-shell {
    padding: 0 16px;
  }

  .section-title {
    font-size: clamp(24px, 5vw, 32px);
    margin-bottom: 12px;
  }

  .section-text {
    font-size: 14px;
    margin-bottom: 20px;
  }

  .beneficios {
    padding: 40px 0;
  }

  .beneficios-wrapper {
    padding: 20px 16px;
    border-radius: 12px;
  }

  .beneficios-text {
    font-size: 13px;
    margin-bottom: 20px;
  }

  .kpi-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .modulos-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .sec-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .kpi-divider-label {
    font-size: 9px;
  }

  /* Reducir padding sec-item en móvil */
  .sec-item {
    padding: 18px 12px 16px;
  }

  /* Secciones con menos aire en móvil */
  .indicadores {
    padding: 32px 0 28px;
  }

  .modulos-section {
    padding: 32px 0 40px;
  }

  .modulo-card {
    min-height: 240px;
  }

  .modulo-body {
    min-height: 240px;
    padding: 60px 12px 14px;
  }

  .noticias {
    padding: 40px 0 0;
  }

  .noticias-shell {
    padding: 0 16px;
  }

  .noticias-title,
  .noticias-text {
    padding: 0;
  }

  .noticias-text {
    margin-bottom: 24px;
  }

  .noticia-card {
    height: 280px;
    border-radius: 0;
  }

  .noticias-arrow {
    display: none;
  }

  .noticia-body {
    width: 90%;
    padding: 0 0 16px 18px;
  }

  .noticia-categoria {
    font-size: 0.7rem;
    margin-bottom: 8px;
  }

  .noticia-titulo {
    font-size: 20px;
    line-height: 1.2;
    margin-bottom: 8px;
  }

  .noticia-desc {
    font-size: 13px;
    line-height: 1.4;
  }

}
</style>