<template>
  <main class="page">
    <!-- HERO -->
    <section class="hero">
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

        <div class="hero-search">
          <input
            type="text"
            class="hero-search-input"
            placeholder="Buscar información del programa..."
          />
          <button class="hero-search-btn" type="button">Buscar</button>
        </div>
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

    <!-- BENEFICIOS -->
    <section class="beneficios">
      <div class="section-shell">
        <div class="beneficios-wrapper">
          <h2 class="section-title beneficios-title">Beneficios del PSE</h2>

          <p class="section-text beneficios-text">
            El Portal de Salud PSE del Ministerio de Educación es una plataforma integral
            diseñada para garantizar el bienestar de los estudiantes del sistema educativo
            nacional, centralizando servicios médicos, apoyo preventivo y asistencia en
            momentos críticos.
          </p>

          <div class="modulos-area">
            <button class="slider-arrow slider-arrow-left" type="button">‹</button>

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
                  />
                </div>

                <div class="modulo-overlay"></div>

                <div class="modulo-body">
                  <p class="modulo-id">MÓDULO {{ modulo.id }}</p>
                  <h3 class="modulo-title">{{ modulo.titulo }}</h3>
                  <p class="modulo-desc">{{ modulo.descripcion }}</p>

                  <RouterLink :to="modulo.ruta" class="modulo-btn-link">
                    <button class="modulo-btn" type="button">Más información</button>
                  </RouterLink>
                </div>
              </article>
            </div>

            <button class="slider-arrow slider-arrow-right" type="button">›</button>
          </div>

          <div class="resultados-wrap">
            <div class="resultados-grid-top">
              <article
                v-for="(resultado, index) in resultadosTop"
                :key="'top-' + index"
                class="resultado-card"
              >
                <p class="resultado-tag">RESULTADOS</p>
                <h3 class="resultado-title">{{ resultado.titulo }}</h3>
                <p class="resultado-meta">{{ resultado.periodo }}</p>

                <div class="resultado-stats">
                  <div
                    v-for="(item, itemIndex) in resultado.items"
                    :key="itemIndex"
                    class="resultado-line"
                  >
                    <span class="resultado-emoji">{{ item.icono }}</span>

                    <div class="resultado-copy">
                      <p class="resultado-label">{{ item.label }}</p>
                      <p class="resultado-value">{{ item.valor }}</p>
                    </div>
                  </div>
                </div>

                <p class="resultado-footer">{{ resultado.footer }}</p>
              </article>
            </div>

            <div class="resultados-grid-bottom">
              <article class="resultado-card">
                <p class="resultado-tag">RESULTADOS</p>
                <h3 class="resultado-title">{{ resultadoBottom1.titulo }}</h3>
                <p class="resultado-meta">{{ resultadoBottom1.periodo }}</p>

                <div class="resultado-stats">
                  <div
                    v-for="(item, index) in resultadoBottom1.items"
                    :key="index"
                    class="resultado-line"
                  >
                    <span class="resultado-emoji">{{ item.icono }}</span>

                    <div class="resultado-copy">
                      <p class="resultado-label">{{ item.label }}</p>
                      <p class="resultado-value">{{ item.valor }}</p>
                    </div>
                  </div>
                </div>

                <p class="resultado-footer">{{ resultadoBottom1.footer }}</p>
              </article>

              <article class="resultado-card resultado-card-dark">
                <p class="resultado-tag resultado-tag-cyan">RESULTADOS</p>
                <h3 class="resultado-title">{{ resultadoBottom2.titulo }}</h3>
                <p class="resultado-meta">{{ resultadoBottom2.periodo }}</p>

                <div class="resultado-stats">
                  <div
                    v-for="(item, index) in resultadoBottom2.items"
                    :key="index"
                    class="resultado-line"
                  >
                    <span class="resultado-emoji">{{ item.icono }}</span>

                    <div class="resultado-copy">
                      <p class="resultado-label">{{ item.label }}</p>
                      <p class="resultado-value">{{ item.valor }}</p>
                    </div>
                  </div>
                </div>

                <p class="resultado-footer">{{ resultadoBottom2.footer }}</p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- NOTICIAS -->
    <section class="noticias">
      <div class="section-shell noticias-shell">
        <h2 class="section-title noticias-title">Noticias y actividades</h2>

        <p class="section-text noticias-text">
          El Portal de Salud PSE del Ministerio de Educación es una plataforma integral diseñada para garantizar el
          bienestar de los estudiantes del sistema educativo nacional, centralizando servicios médicos, apoyo preventivo y
          asistencia en momentos críticos.
        </p>

        <div class="noticias-wrap">
          <button class="noticias-arrow noticias-arrow-left" type="button">‹</button>

          <article class="noticia-card">
            <img
              :src="noticiaDestacada.imagen"
              :alt="noticiaDestacada.titulo"
              class="noticia-img"
            />

            <div class="noticia-overlay"></div>

            <div class="noticia-body">
              <p class="noticia-fecha">{{ noticiaDestacada.fecha }}</p>
              <p class="noticia-categoria">{{ noticiaDestacada.categoria }}</p>
              <h3 class="noticia-titulo">{{ noticiaDestacada.titulo }}</h3>
              <p class="noticia-desc">{{ noticiaDestacada.descripcion }}</p>
            </div>
          </article>

          <button class="noticias-arrow noticias-arrow-right" type="button">›</button>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="section-shell footer-grid">
        <div class="footer-col">
          <h4 class="footer-title">Programa de Salud Escolar (PSE)</h4>
          <p class="footer-text">
            Plataforma institucional orientada a acompañar la salud integral de las y los estudiantes del sistema educativo nacional.
          </p>
        </div>

        <div class="footer-col">
          <h4 class="footer-title">Secciones</h4>
          <RouterLink to="/" class="footer-link">Inicio</RouterLink>
          <RouterLink to="/promocion" class="footer-link">Promoción y prevención</RouterLink>
          <RouterLink to="/atencion" class="footer-link">Atención a enfermedades</RouterLink>
          <RouterLink to="/medicamentos" class="footer-link">Suministro de medicamentos</RouterLink>
          <RouterLink to="/llamadas" class="footer-link">Centro de llamadas 1528</RouterLink>
          <RouterLink to="/funerarios" class="footer-link">Apoyo funerario</RouterLink>
        </div>

        <div class="footer-col">
          <h4 class="footer-title">Contacto</h4>
          <p class="footer-text">Ministerio de Educación de Guatemala</p>
          <p class="footer-text">Dirección General de Gestión de Calidad Educativa</p>
          <p class="footer-text">Subdirección de Innovación Educativa</p>
          <p class="footer-text">Correo: saludescolar@mineduc.gob.gt</p>
        </div>
      </div>
    </footer>
  </main>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const logoFranja = '/Home/LOGOS/logo-franja.png'

const modulos = [
  {
    id: 1,
    titulo: 'Promoción y Prevención',
    descripcion: 'Acciones para promover la salud y prevenir enfermedades en los centros educativos.',
    imagen: '/Home/IMAGENES/noticia-jornada-salud.png',
    ruta: '/promocion'
  },
  {
    id: 2,
    titulo: 'Atención a enfermedades',
    descripcion: 'Registro de atenciones médicas y seguimiento de casos de las y los estudiantes.',
    imagen: '/Home/IMAGENES/noticia-virus.png',
    ruta: '/atencion'
  },
  {
    id: 3,
    titulo: 'Suministro de medicamentos',
    descripcion: 'Inventario y distribución de medicamentos del programa a los establecimientos.',
    imagen: '/Home/IMAGENES/mod-medicamentos.png',
    ruta: '/medicamentos'
  },
  {
    id: 4,
    titulo: 'Centro de llamadas 1528',
    descripcion: 'Llamadas recibidas, derivaciones y seguimiento de casos relacionados con PSE.',
    imagen: '/Home/IMAGENES/mod-llamadas.png',
    ruta: '/llamadas'
  },
  {
    id: 5,
    titulo: 'Apoyo funerario',
    descripcion: 'Gestión y apoyo en casos funerarios para estudiantes del sistema educativo nacional.',
    imagen: '/Home/IMAGENES/noticia-vacunacion.png',
    ruta: '/funerarios'
  }
]

const resultadosTop = [
  {
    titulo: 'Atención a enfermedades',
    periodo: 'Periodo de referencia: enero – julio 2025',
    items: [
      { icono: '🧑‍⚕️', label: 'Consultas atendidas:', valor: '674,656' },
      { icono: '👩', label: 'Estudiante con suministro:', valor: '222,704' }
    ],
    footer: 'Hombres 52% · Mujeres 48%'
  },
  {
    titulo: 'Suministro de medicamentos',
    periodo: 'Periodo de referencia: enero – julio 2025',
    items: [
      { icono: '💊', label: 'Unidades entregadas:', valor: '674,656' },
      { icono: '🏥', label: 'Establecimientos con suministro:', valor: '222,704' }
    ],
    footer: 'Hombres 52% · Mujeres 48%'
  },
  {
    titulo: 'Centro de llamadas 1528',
    periodo: 'Periodo de referencia: enero – julio 2025',
    items: [
      { icono: '🎧', label: 'Llamadas registradas:', valor: '24,221' },
      { icono: '📋', label: 'Casos atendidos:', valor: '329' }
    ],
    footer: 'Hombres 52% · Mujeres 48%'
  }
]

const resultadoBottom1 = {
  titulo: 'Apoyo económico funerario',
  periodo: 'Periodo de referencia: enero – julio 2025',
  items: [
    { icono: '👨‍👩‍👧', label: 'Familias beneficiadas:', valor: '329' },
    { icono: '💰', label: 'Monto máximo por estudiante:', valor: 'Q7,500.00' }
  ],
  footer: 'Hombres 52% · Mujeres 48%'
}

const resultadoBottom2 = {
  titulo: 'Aportes a familias',
  periodo: 'Periodo de referencia: enero – julio 2025',
  items: [
    { icono: '👦', label: 'Masculinos:', valor: '193' },
    { icono: '👧', label: 'Femeninos:', valor: '136' }
  ],
  footer: 'Monto total entregado: Q2,467,000'
}

const noticiaDestacada = {
  fecha: '03 FEBRERO 2026',
  categoria: 'PROMOCIÓN Y PREVENCIÓN',
  titulo: 'Jornada de vacunación en escuela Rural',
  descripcion:
    'Se realizó una jornada de vacunación, desparasitación y control de crecimiento para niñas y niños de preprimaria y primaria.',
  imagen: '/Home/IMAGENES/noticia-vacunacion.png'
}
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
  min-height: 680px;
  height: 74vh;
  max-height: 780px;
  background-image: url('/Home/RECURSOS/hero-min.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
}

.hero-content {
  width: 100%;
  max-width: 1720px;
  margin: 0 auto;
  padding: 0 72px;
}

.hero-kicker {
  margin: 0 0 18px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(0, 224, 255, 0.7);
  max-width: 760px;
}

.hero-title {
  margin: 0 0 18px;
  font-size: clamp(56px, 5vw, 90px);
  line-height: 1;
  font-weight: 900;
  color: #ffffff;
  max-width: 760px;
}

.hero-title .highlight {
  color: #60d5f3;
}

.hero-desc {
  margin: 0;
  max-width: 620px;
  font-size: 18px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.94);
}

.hero-search {
  display: flex;
  gap: 12px;
  margin-top: 28px;
  max-width: 560px;
}

.hero-search-input {
  flex: 1;
  height: 48px;
  border: none;
  border-radius: 999px;
  padding: 0 18px;
  font-size: 14px;
  outline: none;
  color: #10233f;
  background: #ffffff;
}

.hero-search-input::placeholder {
  color: #7b8ea5;
}

.hero-search-btn {
  height: 48px;
  padding: 0 24px;
  border: none;
  border-radius: 999px;
  background: #17c4e8;
  color: #ffffff;
  font-family: inherit;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(23, 196, 232, 0.25);
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.hero-search-btn:hover {
  transform: translateY(-1px);
  opacity: 0.95;
}

/* FRANJA */
.logo-franja {
  background: #ffffff;
}

.logo-franja-img {
  display: block;
  width: 100%;
  max-width: 1350px;
  margin: 0 auto;
  padding: 18px 56px;
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

/* BENEFICIOS */
.beneficios {
  padding: 56px 0;
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

/* MODULOS */
.modulos-area {
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
}

.modulos-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(5, minmax(220px, 1fr));
  gap: 14px;
}

.slider-arrow {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  border: 1px solid #d4dce5;
  background: #ffffff;
  color: #7b8ea5;
  font-size: 30px;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(16, 35, 63, 0.08);
  flex-shrink: 0;
}

.modulo-card {
  position: relative;
  min-height: 260px;
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
    rgba(7, 62, 105, 0.12) 0%,
    rgba(8, 63, 106, 0.62) 52%,
    rgba(6, 56, 95, 0.96) 100%
  );
}

.modulo-body {
  position: relative;
  z-index: 2;
  height: 100%;
  padding: 112px 16px 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-align: center;
}

.modulo-id {
  margin: 0 0 6px;
  font-size: 11px;
  font-weight: 800;
  color: #17c4e8;
  text-transform: uppercase;
}

.modulo-title {
  margin: 0 0 8px;
  font-size: 18px;
  line-height: 1.1;
  font-weight: 800;
  color: #ffffff;
}

.modulo-desc {
  margin: 0 0 12px;
  font-size: 11px;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.92);
}

.modulo-btn-link {
  align-self: center;
  text-decoration: none;
}

.modulo-btn {
  align-self: center;
  border: 1px solid rgba(23, 196, 232, 0.8);
  border-radius: 6px;
  background: transparent;
  color: #ffffff;
  font-family: inherit;
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  padding: 8px 14px;
  cursor: pointer;
}

/* RESULTADOS */
.resultados-wrap {
  margin-top: 18px;
}

.resultados-grid-top {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.resultados-grid-bottom {
  display: grid;
  grid-template-columns: repeat(2, minmax(320px, 470px));
  justify-content: center;
  gap: 18px;
  margin-top: 18px;
}

.resultado-card {
  background: #ffffff;
  border-radius: 10px;
  padding: 18px 20px;
  box-shadow: 0 8px 18px rgba(16, 35, 63, 0.08);
  min-height: 245px;
}

.resultado-card-dark {
  background: #034876;
}

.resultado-tag {
  display: inline-block;
  margin: 0 0 14px;
  padding: 5px 11px;
  border-radius: 4px;
  background: #0a4675;
  color: #ffffff;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.resultado-tag-cyan {
  background: #18c6e8;
}

.resultado-title {
  margin: 0 0 4px;
  font-size: 17px;
  font-weight: 800;
  color: #16365f;
}

.resultado-card-dark .resultado-title {
  color: #ffffff;
}

.resultado-meta {
  margin: 0 0 16px;
  font-size: 12px;
  color: #60728a;
}

.resultado-card-dark .resultado-meta {
  color: rgba(255, 255, 255, 0.84);
}

.resultado-stats {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.resultado-line {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.resultado-emoji {
  width: 26px;
  height: 26px;
  border-radius: 999px;
  background: rgba(10, 70, 117, 0.08);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
  margin-top: 2px;
}

.resultado-card-dark .resultado-emoji {
  background: rgba(255, 255, 255, 0.15);
}

.resultado-copy {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: baseline;
}

.resultado-label {
  margin: 0;
  font-size: 13px;
  color: #35577d;
}

.resultado-value {
  margin: 0;
  font-size: 13px;
  font-weight: 800;
  color: #16365f;
}

.resultado-card-dark .resultado-label,
.resultado-card-dark .resultado-value {
  color: #ffffff;
}

.resultado-footer {
  margin: 18px 0 0;
  padding-top: 12px;
  border-top: 1px solid #dbe3eb;
  font-size: 12px;
  color: #5f7188;
}

.resultado-card-dark .resultado-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.22);
  color: rgba(255, 255, 255, 0.84);
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
  height: 420px;
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
  right: 0;
  bottom: 0;
  padding: 0 180px 30px;
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

/* FOOTER */
.footer {
  margin-top: 0;
  padding: 0;
  background: #031a33;
  color: #ffffff;
  position: relative;
}

.footer::before {
  content: "";
  display: block;
  width: 100%;
  height: 10px;
  background: #17c4e8;
}

.footer-grid {
  max-width: 1720px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.35fr 1fr 1fr;
  gap: 36px;
  padding: 34px 28px 18px;
}

.footer-title {
  margin: 0 0 14px;
  font-size: 16px;
  font-weight: 800;
  color: #ffffff;
}

.footer-text {
  margin: 0 0 8px;
  font-size: 13px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.84);
}

.footer-link {
  display: block;
  margin: 0 0 8px;
  font-size: 13px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.84);
  text-decoration: none;
}

.footer-link:hover {
  color: #17c4e8;
}

.footer-col:last-child .footer-text:last-child {
  margin-bottom: 0;
}

/* RESPONSIVE */
@media (max-width: 1400px) {
  .modulos-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

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
    grid-template-columns: repeat(2, 1fr);
  }

  .resultados-grid-top {
    grid-template-columns: 1fr;
  }

  .resultados-grid-bottom {
    grid-template-columns: 1fr;
  }

  .footer-grid {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 36px 30px;
  }

  .noticia-body {
    padding: 0 80px 24px;
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
    padding: 0 40px 20px;
  }
}

@media (max-width: 768px) {
  .section-shell {
    padding: 0 20px;
  }

  .beneficios-wrapper {
    padding: 24px 20px;
  }

  .modulos-grid {
    grid-template-columns: 1fr;
  }

  .slider-arrow {
    display: none;
  }

  .resultados-grid-top,
  .resultados-grid-bottom {
    grid-template-columns: 1fr;
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

  .hero-search {
    flex-direction: column;
    max-width: 100%;
    margin-top: 24px;
  }

  .hero-search-btn,
  .hero-search-input {
    width: 100%;
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

  .modulo-card {
    min-height: 200px;
  }

  .modulo-body {
    padding: 80px 12px 12px;
  }

  .modulo-title {
    font-size: 14px;
    margin-bottom: 6px;
  }

  .modulo-desc {
    font-size: 11px;
    margin-bottom: 10px;
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
    padding: 0 18px 16px;
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

  .footer {
    margin-top: 40px;
  }

  .footer-grid {
    padding: 28px 16px;
    gap: 24px;
  }

  .footer-title {
    font-size: 14px;
    margin-bottom: 12px;
  }

  .footer-text,
  .footer-link {
    font-size: 12px;
    margin-bottom: 6px;
  }
}
</style>