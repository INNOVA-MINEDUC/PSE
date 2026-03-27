<template>
  <div class="app-shell">
    <header class="header">
      <div class="header-inner">
        <div class="header-left">
          <img class="logo" :src="logoMineduc" alt="Ministerio de Educación" />
        </div>

        <nav class="header-nav" aria-label="Navegación principal">
          <RouterLink class="nav-link" to="/" exact-active-class="is-active">Inicio</RouterLink>
          <RouterLink class="nav-link" to="/promocion" exact-active-class="is-active">
            Promoción y Prevención
          </RouterLink>
          <RouterLink class="nav-link" to="/atencion" exact-active-class="is-active">
            Atención a Enfermedades
          </RouterLink>
          <RouterLink class="nav-link" to="/medicamentos" exact-active-class="is-active">
            Suministro de medicamentos
          </RouterLink>
          <RouterLink class="nav-link" to="/llamadas" exact-active-class="is-active">
            Centro de llamadas 1528
          </RouterLink>
          <RouterLink class="nav-link" to="/funerarios" exact-active-class="is-active">
            Apoyo Funerario
          </RouterLink>
        </nav>

        <RouterLink class="header-login" to="/login">
          <span class="login-text">Iniciar Sesión</span>
          <span class="login-avatar" aria-hidden="true">👤</span>
        </RouterLink>
      </div>
    </header>

    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
const logoMineduc = '/Home/LOGOS/logo-mineduc.png'
</script>

<style>
*,
*::before,
*::after { box-sizing: border-box; }

body{
  margin: 0;
  font-family: Montserrat, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  background: #ffffff;
}

.app-shell{
  min-height: 100vh;
  background: #ffffff;
}

/* =========================
   HEADER
========================= */
.header{
  background: #ffffff;
  border-bottom: 1px solid rgba(15, 23, 42, 0.10);
}

/* ✅ menos margen lateral y más “a las esquinas” */
.header-inner{
  max-width: 100%;
  margin: 0 auto;
  padding: 0 18px;                 /* antes 48px */
  height: 96px;                    /* ✅ más alto */
  display: grid;
  grid-template-columns: 320px 1fr 260px; /* ✅ más espacio a logo y login */
  align-items: center;
  gap: 16px;
}

/* ✅ logo más grande */
.logo{
  height: 64px;                    /* ✅ grande */
  width: auto;
  object-fit: contain;
}

/* nav centrado */
.header-nav{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 22px;
  flex-wrap: nowrap;
  min-width: 0;
}

.nav-link{
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  color: rgba(11, 27, 43, 0.78);
  white-space: nowrap;
  padding: 10px 10px;
  border-radius: 10px;
  transition: background .2s ease, color .2s ease;
}

.nav-link:hover{
  background: rgba(11, 27, 43, 0.06);
  color: rgba(11, 27, 43, 1);
}

.is-active{
  background: rgba(11, 27, 43, 0.10);
  color: rgba(11, 27, 43, 1);
}

/* ✅ login pegado a la derecha */
.header-login{
  justify-self: end;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  font-weight: 800;
  color: rgba(11, 27, 43, 0.92);
  white-space: nowrap;
  padding-right: 4px; /* micro ajuste a la esquina */
}

.login-avatar{
  width: 42px;                     /* un poco más grande */
  height: 42px;
  border-radius: 999px;
  background: rgba(11, 27, 43, 0.10);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* =========================
   Laptop / Tablet (scroll nav)
========================= */
@media (max-width: 1200px){
  .header-inner{
    height: 82px;
    grid-template-columns: 260px 1fr 220px;
    padding: 0 14px;
  }

  .logo{ height: 54px; }

  .header-nav{
    justify-content: flex-start;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .header-nav::-webkit-scrollbar{ display:none; }

  .nav-link{ font-size: 13.5px; padding: 8px 10px; }
}

/* =========================
   Móvil: 2 filas
========================= */
@media (max-width: 768px){
  .header-inner{
    height: auto;
    padding: 10px 12px;
    grid-template-columns: 1fr auto;
    grid-template-areas:
      "logo login"
      "nav  nav";
    row-gap: 10px;
    column-gap: 10px;
  }

  .header-left{ grid-area: logo; }
  .header-nav{ grid-area: nav; }
  .header-login{ grid-area: login; }

  .logo{ height: 44px; }

  .header-nav{
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: 6px;
    gap: 14px;
  }

  .login-text{ display: none; }
  .login-avatar{ width: 40px; height: 40px; }
}

@media (max-width: 420px){
  .logo{ height: 40px; }
  .nav-link{ font-size: 12.5px; }
  .login-avatar{ width: 38px; height: 38px; }
}
</style>