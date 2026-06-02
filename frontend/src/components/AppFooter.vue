<template>
  <footer class="pse-footer">

    <!-- FRANJA DE LOGOS — tope del footer -->
    <div class="footer-logo-band">
      <img
        :src="logoFranja"
        alt="Portal de Salud Escolar — MSPAS, Ministerio de Educación, DIGIKAL, DCE"
        class="footer-franja-img"
        loading="lazy"
        decoding="async"
      />
    </div>

    <div class="footer-inner">

      <div class="footer-grid">

        <!-- COL 1: IDENTIDAD INSTITUCIONAL -->
        <div class="footer-col footer-col-brand">

          <p class="footer-portal-name">Portal de Salud Escolar</p>

          <p class="footer-brand-desc">
            Servicio institucional del Ministerio de Educación de Guatemala
            para fortalecer la salud integral de los estudiantes del sistema
            educativo nacional.
          </p>

        </div>

        <!-- COL 2: NAVEGACIÓN -->
        <div class="footer-col">
          <p class="footer-col-title">Navegación rápida</p>
          <nav class="footer-nav">
            <RouterLink to="/" class="footer-link">Inicio</RouterLink>
            <RouterLink to="/promocion" class="footer-link">Promoción y Prevención</RouterLink>
            <RouterLink to="/atencion" class="footer-link">Atención a Enfermedades</RouterLink>
            <RouterLink to="/medicamentos" class="footer-link">Suministro de Medicamentos</RouterLink>
            <RouterLink to="/llamadas" class="footer-link">Centro de Llamadas 1528</RouterLink>
            <RouterLink to="/funerarios" class="footer-link">Apoyo Funerario</RouterLink>
          </nav>
        </div>

        <!-- COL 3: INFORMACIÓN INSTITUCIONAL -->
        <div class="footer-col">
          <p class="footer-col-title">Información institucional</p>
          <div class="footer-info">
            <a href="mailto:saludescolar@mineduc.gob.gt" class="footer-link">
              saludescolar@mineduc.gob.gt
            </a>
            <a href="#" class="footer-link">Aviso de privacidad</a>
            <a href="#" class="footer-link">Términos de uso</a>
          </div>
        </div>

        <!-- COL 4: MARCO LEGAL -->
        <div class="footer-col">
          <p class="footer-col-title">Marco legal</p>
          <div class="footer-info">
            <span class="footer-legal-item">Acuerdo Gubernativo 36-2024</span>
            <span class="footer-legal-item">Acuerdo Ministerial 815-2024</span>
          </div>
        </div>

      </div>

      <div class="footer-bottom">
        © {{ year }} Ministerio de Educación de Guatemala – Portal de Salud Escolar
      </div>

    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const logoFranja = '/Home/LOGOS/logo-tras.webp'
const year = new Date().getFullYear()
</script>

<style scoped>
.pse-footer {
  background: #062b4f;
  color: #ffffff;
  border-top: 4px solid #17c4e8;
  font-family: 'Montserrat', 'Segoe UI', system-ui, sans-serif;
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 52px 32px 28px;
}

/* GRID */
.footer-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 0.85fr;
  gap: 56px;
  padding-bottom: 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 22px;
  align-items: start;
}

/* FRANJA DE LOGOS */
.footer-logo-band {
  background: rgba(255, 255, 255, 0.04);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  padding: 22px 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-franja-img {
  height: 48px;
  width: auto;
  max-width: 640px;
  object-fit: contain;
  display: block;
  filter: brightness(0) invert(1);
  opacity: 0.85;
}

/* COL 1 — IDENTIDAD */
.footer-portal-name {
  margin: 0 0 10px;
  font-size: 1rem;
  font-weight: 800;
  color: #ffffff;
  line-height: 1.2;
}

.footer-brand-desc {
  margin: 0;
  font-size: 0.82rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.52);
  max-width: 340px;
}

/* COLS 2, 3 y 4 */
.footer-col-title {
  margin: 0 0 16px;
  font-size: 0.66rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #60d5f3;
}

.footer-nav,
.footer-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-link {
  font-size: 0.84rem;
  color: rgba(255, 255, 255, 0.68);
  text-decoration: none;
  transition: color 0.15s;
  line-height: 1.4;
}

.footer-link:hover {
  color: #ffffff;
}

.footer-legal-item {
  display: block;
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.5;
}

/* COPYRIGHT */
.footer-bottom {
  font-size: 0.74rem;
  color: rgba(255, 255, 255, 0.32);
  text-align: center;
}

/* RESPONSIVE */
@media (max-width: 1100px) {
  .footer-grid {
    grid-template-columns: 1.3fr 1fr 1fr;
    gap: 36px;
  }

  .footer-col:last-child {
    grid-column: 2 / span 2;
  }
}

@media (max-width: 760px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 28px;
  }

  .footer-col-brand {
    grid-column: 1 / -1;
  }

  .footer-col:last-child {
    grid-column: unset;
  }

  .footer-brand-desc {
    max-width: 100%;
  }
}

@media (max-width: 580px) {
  .footer-logo-band {
    padding: 18px 20px;
  }

  .footer-franja-img {
    height: 34px;
  }

  .footer-inner {
    padding: 40px 20px 24px;
  }

  .footer-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .footer-bottom {
    text-align: left;
  }
}
</style>
