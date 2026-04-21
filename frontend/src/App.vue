<template>
  <div class="app-shell">
    <header class="header" :class="{ scrolled: isScrolled }">

      <div class="header-inner">

        <!-- LOGO -->
        <div class="header-left">
          <img class="logo" :src="logoMineduc" alt="Ministerio de Educación" />
        </div>

        <!-- NAV DESKTOP -->
        <nav class="header-nav" aria-label="Navegación principal">
          <RouterLink
            v-for="item in navItems"
            :key="item.to"
            class="nav-link"
            :to="item.to"
            exact-active-class="is-active"
          >
            <span class="nav-label">{{ item.label }}</span>
            <span class="nav-underline"></span>
          </RouterLink>
        </nav>

        <!-- LOGIN + HAMBURGER -->
        <div class="header-right">
          <RouterLink class="header-login" to="/login">
            <span class="login-text">Iniciar Sesión</span>
            <span class="login-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                <polyline points="10 17 15 12 10 7"/>
                <line x1="15" y1="12" x2="3" y2="12"/>
              </svg>
            </span>
          </RouterLink>

          <button class="hamburger" @click="menuOpen = !menuOpen" :class="{ open: menuOpen }" aria-label="Menú">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <!-- NAV MÓVIL -->
      <Transition name="drawer">
        <nav v-if="menuOpen" class="mobile-nav" aria-label="Navegación móvil">
          <RouterLink
            v-for="item in navItems"
            :key="item.to"
            class="mobile-link"
            :to="item.to"
            exact-active-class="is-active"
            @click="menuOpen = false"
          >
            {{ item.label }}
          </RouterLink>
          <RouterLink class="mobile-login" to="/login" @click="menuOpen = false">
            Iniciar Sesión
          </RouterLink>
        </nav>
      </Transition>
    </header>

    <RouterView />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const logoMineduc = '/Home/LOGOS/logo-mineduc.png'
const menuOpen   = ref(false)
const isScrolled = ref(false)

const navItems = [
  { to: '/',             label: 'Inicio' },
  { to: '/promocion',    label: 'Promoción y Prevención' },
  { to: '/atencion',     label: 'Atención a Enfermedades' },
  { to: '/medicamentos', label: 'Suministro de medicamentos' },
  { to: '/llamadas',     label: 'Centro de llamadas 1528' },
  { to: '/funerarios',   label: 'Apoyo Funerario' },
]

const onScroll = () => { isScrolled.value = window.scrollY > 12 }
onMounted(()  => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style>
*, *::before, *::after { box-sizing: border-box; }

body {
  margin: 0;
  font-family: 'Montserrat', system-ui, sans-serif;
  background: #f8f9fc;
}

:root {
  --navy:       #0b1b2b;
  --navy-80:    rgba(11,27,43,0.80);
  --navy-12:    rgba(11,27,43,0.12);
  --navy-06:    rgba(11,27,43,0.06);
  --blue:       #2563eb;
  --blue-light: #eff4ff;
  --white:      #ffffff;
  --ease:       cubic-bezier(.4,0,.2,1);
}

.app-shell { min-height: 100vh; }

/* ══ HEADER ══ */
.header {
  position: sticky;
  top: 0;
  z-index: 200;
  background: rgba(255,255,255,0.93);
  backdrop-filter: blur(18px) saturate(160%);
  -webkit-backdrop-filter: blur(18px) saturate(160%);
  border-bottom: 1px solid var(--navy-12);
  transition: box-shadow 0.3s var(--ease);
}
.header.scrolled {
  box-shadow: 0 4px 20px rgba(11,27,43,0.10);
  border-bottom-color: transparent;
}


/* ══ INNER ══ */
.header-inner {
  width: 100%;
  padding: 0 24px;
  height: 82px;
  display: flex;
  align-items: center;
  gap: 0;
}

.header-left {
  flex-shrink: 0;
  margin-right: 20px;
}

.logo {
  height: 58px;
  width: auto;
  object-fit: contain;
  display: block;
  transition: opacity 0.2s;
}
.logo:hover { opacity: 0.85; }

/* ══ NAV DESKTOP ══ */
.header-nav {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  gap: 0;
  min-width: 0;
  overflow: hidden;
}

.nav-link {
  position: relative;
  text-decoration: none;
  font-size: 13.5px;
  font-weight: 600;
  letter-spacing: 0.01em;
  color: var(--navy-80);
  white-space: nowrap;
  padding: 9px 11px;
  border-radius: 8px;
  flex-shrink: 0;
  transition: color 0.2s var(--ease), background 0.2s var(--ease);
}

.nav-label { position: relative; z-index: 1; }

.nav-underline {
  position: absolute;
  bottom: 3px;
  left: 11px;
  right: 11px;
  height: 2px;
  background: var(--blue);
  border-radius: 2px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.22s var(--ease);
}

.nav-link:hover { color: var(--navy); background: var(--navy-06); }
.nav-link:hover .nav-underline { transform: scaleX(1); }
.nav-link.is-active { color: var(--blue); background: var(--blue-light); }
.nav-link.is-active .nav-underline { transform: scaleX(1); }

/* ══ DERECHA ══ */
.header-right {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 20px;
}

.header-login {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  font-size: 13.5px;
  font-weight: 700;
  letter-spacing: 0.02em;
  white-space: nowrap;
  color: var(--white);
  background: var(--navy);
  border-radius: 999px;
  padding: 10px 22px;
  transition: background 0.2s var(--ease), transform 0.15s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(11,27,43,0.18);
}
.header-login:hover {
  background: var(--blue);
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(37,99,235,0.28);
}
.login-icon { display: flex; align-items: center; }

/* ══ HAMBURGER ══ */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  background: none;
  border: 1px solid var(--navy-12);
  border-radius: 8px;
  cursor: pointer;
  padding: 8px 10px;
  transition: background 0.2s;
}
.hamburger:hover { background: var(--navy-06); }
.hamburger span {
  display: block;
  width: 20px;
  height: 2px;
  background: var(--navy);
  border-radius: 2px;
  transition: transform 0.25s var(--ease), opacity 0.2s;
  transform-origin: center;
}
.hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; }
.hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* ══ MOBILE DRAWER ══ */
.mobile-nav {
  display: flex;
  flex-direction: column;
  padding: 12px 16px 20px;
  border-top: 1px solid var(--navy-12);
  background: rgba(255,255,255,0.98);
  gap: 2px;
}

.mobile-link {
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  color: var(--navy-80);
  padding: 12px 14px;
  border-radius: 10px;
  transition: background 0.18s, color 0.18s;
}
.mobile-link:hover,
.mobile-link.is-active { background: var(--blue-light); color: var(--blue); }

.mobile-login {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 14px;
  font-weight: 700;
  color: var(--white);
  background: var(--navy);
  border-radius: 999px;
  padding: 12px 20px;
  transition: background 0.2s;
}
.mobile-login:hover { background: var(--blue); }

/* ══ TRANSICIÓN DRAWER ══ */
.drawer-enter-active,
.drawer-leave-active { transition: opacity 0.22s var(--ease), transform 0.22s var(--ease); }
.drawer-enter-from,
.drawer-leave-to     { opacity: 0; transform: translateY(-8px); }

/* ══ BREAKPOINTS ══ */
@media (max-width: 1280px) {
  .header-inner { padding: 0 16px; }
  .nav-link { font-size: 12.5px; padding: 8px 9px; }
  .logo { height: 52px; }
  .header-login { font-size: 13px; padding: 9px 18px; }
}

/* Tablet: hamburguesa */
@media (max-width: 1100px) {
  .header-nav   { display: none; }
  .hamburger    { display: flex; }
  .login-text   { display: none; }
  .header-login { padding: 9px 13px; border-radius: 8px; }
  .header-inner { height: 70px; }
  .logo         { height: 44px; }
}

@media (max-width: 480px) {
  .header-inner { padding: 0 12px; height: 62px; }
  .logo { height: 36px; }
}
</style>