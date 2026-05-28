<template>
  <main class="login-page">
    <section class="login-wrapper">

      <!-- LOGO -->
      <div class="login-brand">
        <img
          :src="logoMinisterio"
          alt="Ministerio de Educación"
          class="brand-logo"
        />
      </div>

      <!-- CARD -->
      <div class="login-card">
        <h1 class="login-title">Iniciar sesión</h1>

        <div v-if="sessionExpired" class="login-expired">
          Tu sesión ha expirado. Por favor inicia sesión nuevamente.
        </div>

        <div v-if="error" class="login-error">
          {{ error }}
        </div>

        <form class="login-form" @submit.prevent="handleSubmit">

          <!-- EMAIL -->
          <div class="input-group">
            <label for="email">Correo electrónico</label>
            <div class="input-wrap">
              <span class="input-icon">✉</span>
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
              <span class="input-icon">🔒</span>
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                autocomplete="current-password"
                required
              />
              <button
                type="button"
                class="toggle-password"
                @click="showPassword = !showPassword"
              >
                {{ showPassword ? "✕" : "👁" }}
              </button>
            </div>
          </div>

          <!-- SUBMIT -->
          <button type="submit" class="btn-login" :disabled="loading">
            <span v-if="loading" class="spinner"></span>
            {{ loading ? "Ingresando..." : "Ingresar" }}
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
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import logoMinisterio from "@/assets/logo-ministerio.png";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const router = useRouter();
const route  = useRoute();

const email        = ref("");
const password     = ref("");
const error        = ref("");
const loading      = ref(false);
const showPassword = ref(false);
const sessionExpired = computed(() => !!route.query.expired);

const handleSubmit = async () => {
  error.value   = "";
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
      error.value = data.error || "Correo o contraseña incorrectos.";
      return;
    }

    localStorage.setItem("token", data.token);
    const redirect = route.query.redirect || "/admin";
    router.push(redirect);

  } catch {
    error.value = "No se pudo conectar con el servidor.";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  font-family: "Montserrat", sans-serif;
}

.login-wrapper {
  width: 100%;
  max-width: 560px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* LOGO */
.login-brand { margin-bottom: 26px; }

.brand-logo {
  width: 260px;
  max-width: 100%;
}

/* CARD */
.login-card {
  width: 100%;
  background: #ffffff;
  border: 1px solid #d9dee8;
  border-radius: 14px;
  box-shadow: 0 8px 25px rgba(15, 23, 42, 0.08);
  padding: 34px 36px 28px;
}

.login-title {
  text-align: center;
  font-size: 1.1rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 22px;
  padding-bottom: 14px;
  border-bottom: 1px solid #e5e7eb;
}

/* SESIÓN EXPIRADA */
.login-expired {
  background: #fef3c7;
  color: #92400e;
  border-radius: 10px;
  padding: 10px;
  font-size: 0.84rem;
  margin-bottom: 14px;
}

/* ERROR */
.login-error {
  background: #fee2e2;
  color: #b91c1c;
  border-radius: 10px;
  padding: 10px;
  font-size: 0.84rem;
  margin-bottom: 14px;
}

/* FORM */
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
  font-size: 0.82rem;
  font-weight: 600;
  color: #6b7280;
}

.input-wrap {
  display: flex;
  align-items: center;
  border: 1px solid #d7dce5;
  border-radius: 10px;
  background: #eef3fb;
  height: 50px;
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input-wrap:focus-within {
  border-color: #4b82ea;
  box-shadow: 0 0 0 2px rgba(75, 130, 234, 0.15);
}

.input-icon {
  width: 46px;
  text-align: center;
  color: #7b8794;
  font-size: 1rem;
  flex-shrink: 0;
}

.input-wrap input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 0.95rem;
  font-family: "Montserrat", sans-serif;
  color: #1f2937;
  padding-right: 10px;
}

.input-wrap input::placeholder { color: #9ca3af; }

/* PASSWORD TOGGLE */
.toggle-password {
  width: 48px;
  height: 100%;
  border: none;
  border-left: 1px solid #d7dce5;
  background: #fff;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.15s;
}
.toggle-password:hover { background: #f3f6fb; }

/* SUBMIT */
.btn-login {
  margin-top: 10px;
  height: 46px;
  border: none;
  border-radius: 10px;
  background: #4b82ea;
  color: white;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.btn-login:hover    { background: #3d73da; }
.btn-login:disabled { opacity: 0.7; cursor: not-allowed; }

/* FORGOT */
.forgot-link {
  margin: 6px auto 0;
  border: 1px solid #e5e7eb;
  background: white;
  color: #4b82ea;
  border-radius: 10px;
  padding: 8px 16px;
  font-size: 0.84rem;
  font-family: "Montserrat", sans-serif;
  cursor: pointer;
  box-shadow: 0 3px 8px rgba(15, 23, 42, 0.06);
  transition: background 0.15s, box-shadow 0.15s;
}
.forgot-link:hover {
  background: #f0f6ff;
  box-shadow: 0 4px 12px rgba(75,130,234,0.12);
}

/* FOOTER */
.login-footer {
  text-align: center;
  margin-top: 28px;
  font-size: 0.8rem;
  color: #6b7280;
}

/* SPINNER */
@keyframes spin { to { transform: rotate(360deg); } }
.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.4);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  flex-shrink: 0;
}
</style>