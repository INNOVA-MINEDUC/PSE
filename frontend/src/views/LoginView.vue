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
                required
              />

              <button
                type="button"
                class="toggle-password"
                @click="showPassword = !showPassword"
              >
                {{ showPassword ? "x" : "👁" }}
              </button>
            </div>
          </div>

          <!-- BUTTON -->
          <button type="submit" class="btn-login" :disabled="loading">
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
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import logoMinisterio from "@/assets/logo-ministerio.png";

const router = useRouter();
const route = useRoute();

const email = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);
const showPassword = ref(false);

const handleSubmit = async () => {
  error.value = "";
  loading.value = true;

  try {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
  } catch (e) {
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
.login-brand {
  margin-bottom: 26px;
}

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

/* INPUTS */
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
}

.input-icon {
  width: 46px;
  text-align: center;
  color: #7b8794;
  font-size: 1rem;
}

.input-wrap input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 0.95rem;
  padding-right: 10px;
}

.input-wrap:focus-within {
  border-color: #4b82ea;
  box-shadow: 0 0 0 2px rgba(75, 130, 234, 0.15);
}

/* PASSWORD BTN */
.toggle-password {
  width: 48px;
  border: none;
  background: #fff;
  border-left: 1px solid #d7dce5;
  cursor: pointer;
  font-size: 1rem;
}

/* BUTTON */
.btn-login {
  margin-top: 10px;
  height: 46px;
  border: none;
  border-radius: 10px;
  background: #4b82ea;
  color: white;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s;
}

.btn-login:hover {
  background: #3d73da;
}

.btn-login:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* FORGOT */
.forgot-link {
  margin: 6px auto 0;
  border: 1px solid #e5e7eb;
  background: white;
  color: #4b82ea;
  border-radius: 10px;
  padding: 8px 16px;
  font-size: 0.84rem;
  cursor: pointer;
  box-shadow: 0 3px 8px rgba(15, 23, 42, 0.06);
}

/* FOOTER */
.login-footer {
  text-align: center;
  margin-top: 28px;
  font-size: 0.8rem;
  color: #6b7280;
}
</style>