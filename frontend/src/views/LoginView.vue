<template>
  <main class="login-page">
    <div class="login-overlay"></div>

    <ToastNotification />

    <section class="login-wrapper">

      <!-- CARD -->
      <div class="login-card">
        <!-- LOGO dentro de la card -->
        <div class="login-brand">
          <img src="/Home/LOGOS/logo-tras.webp" alt="Ministerio de Educación / MSPAS" class="brand-logo" />
        </div>

        <div class="card-header">
          <h1 class="login-title">Iniciar sesión</h1>
          <p class="login-subtitle">Portal de Salud Escolar</p>
        </div>

        <form class="login-form" @submit.prevent="handleSubmit">

          <!-- EMAIL -->
          <div class="input-group">
            <label for="email">Correo electrónico</label>
            <div class="input-wrap">
              <span class="input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </span>
              <input
                id="email"
                v-model="email"
                type="email"
                placeholder="usuario@mineduc.edu.gt"
                autocomplete="username"
                required
              />
            </div>
          </div>

          <!-- PASSWORD -->
          <div class="input-group">
            <label for="password">Contraseña</label>
            <div class="input-wrap">
              <span class="input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </span>
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                autocomplete="current-password"
                required
              />
              <button type="button" class="toggle-password" @click="showPassword = !showPassword" :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'">
                <svg v-if="!showPassword" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- SUBMIT -->
          <button type="submit" class="btn-login" :disabled="loading">
            <span v-if="loading" class="spinner"></span>
            {{ loading ? "Validando..." : "Ingresar" }}
          </button>

          <!-- FORGOT -->
          <button type="button" class="forgot-link">
            ¿Olvidó su contraseña?
          </button>

        </form>

        <p class="login-footer">
          © 2025 Ministerio de Educación de Guatemala – Portal de Salud Escolar
        </p>
      </div>

    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useToast } from "@/composables/useToast";
import ToastNotification from "@/components/ToastNotification.vue";

const API_URL = import.meta.env.VITE_API_URL

const router = useRouter();
const route  = useRoute();
const toast  = useToast();

const email        = ref("");
const password     = ref("");
const loading      = ref(false);
const showPassword = ref(false);

onMounted(() => {
  if (route.query.expired) {
    toast.show("Su sesión ha expirado. Inicie sesión nuevamente.", "warning");
  }
});

const handleSubmit = async () => {
  loading.value = true;

  try {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        correoElectronico: email.value.trim(),
        clave: password.value.trim(),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.show(data.error || "Usuario o contraseña incorrectos.", "error");
      return;
    }

    localStorage.setItem("token", data.token);
    toast.show("Bienvenido al sistema.", "success", 2000);

    const redirect = route.query.redirect || "/admin";
    setTimeout(() => router.push(redirect), 1500);

  } catch {
    toast.show("No se pudo conectar con el servidor.", "error");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* ── PAGE ────────────────────────────────────────────── */
.login-page {
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  font-family: "Montserrat", sans-serif;
  background-image: url('/login/login-fondo.png');
  background-size: cover;
  background-position: center;
}

.login-overlay {
  position: absolute;
  inset: 0;
  background: rgba(7, 26, 64, 0.22);
}

/* ── WRAPPER ─────────────────────────────────────────── */
.login-wrapper {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}

/* ── CARD ────────────────────────────────────────────── */
.login-card {
  width: 100%;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(7, 26, 64, 0.3);
  padding: 32px 36px 28px;
}

/* ── LOGO (dentro de la card) ────────────────────────── */
.login-brand {
  display: flex;
  justify-content: center;
  margin-bottom: 22px;
}

.brand-logo {
  width: auto;
  max-width: 320px;
  max-height: 60px;
  object-fit: contain;
}

.card-header {
  text-align: center;
  margin-bottom: 24px;
  padding-bottom: 18px;
  border-bottom: 1px solid #e8ecf4;
}

.login-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: #071a40;
  margin: 0 0 4px;
}

.login-subtitle {
  margin: 0;
  font-size: 0.8rem;
  color: #17c4e8;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

/* ── FORM ────────────────────────────────────────────── */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.input-group label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #4b5675;
  letter-spacing: 0.02em;
}

.input-wrap {
  display: flex;
  align-items: center;
  border: 1.5px solid #d7dce5;
  border-radius: 10px;
  background: #f4f7fd;
  height: 50px;
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input-wrap:focus-within {
  border-color: #17c4e8;
  box-shadow: 0 0 0 3px rgba(23, 196, 232, 0.15);
  background: #fff;
}

.input-icon {
  width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  flex-shrink: 0;
}

.input-wrap input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 0.92rem;
  font-family: "Montserrat", sans-serif;
  color: #0f172a;
  padding-right: 8px;
}

.input-wrap input::placeholder { color: #b0b8c8; }

/* ── TOGGLE ──────────────────────────────────────────── */
.toggle-password {
  width: 46px;
  height: 100%;
  border: none;
  border-left: 1.5px solid #e2e8f0;
  background: #fff;
  cursor: pointer;
  color: #94a3b8;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.15s, color 0.15s;
}
.toggle-password:hover { background: #f0f9ff; color: #17c4e8; }

/* ── SUBMIT ──────────────────────────────────────────── */
.btn-login {
  margin-top: 8px;
  height: 48px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, #071a40 0%, #0e2a5c 100%);
  color: white;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  letter-spacing: 0.03em;
  box-shadow: 0 4px 16px rgba(7, 26, 64, 0.3);
}
.btn-login:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
.btn-login:disabled { opacity: 0.65; cursor: not-allowed; }

/* ── FORGOT ──────────────────────────────────────────── */
.forgot-link {
  margin: 4px auto 0;
  border: 1px solid #e5e7eb;
  background: white;
  color: #0e2a5c;
  border-radius: 10px;
  padding: 8px 18px;
  font-size: 0.82rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.forgot-link:hover { background: #f0f9ff; color: #17c4e8; border-color: #17c4e8; }

/* ── FOOTER ──────────────────────────────────────────── */
.login-footer {
  text-align: center;
  margin-top: 24px;
  font-size: 0.75rem;
  color: #94a3b8;
}

/* ── SPINNER ─────────────────────────────────────────── */
@keyframes spin { to { transform: rotate(360deg); } }
.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.35);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  flex-shrink: 0;
}
</style>
