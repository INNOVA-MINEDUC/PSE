<!-- src/views/LoginView.vue -->
<template>
  <main class="login-page">
    <div class="login-card">
      <!-- LOGO -->
      <div class="login-logo">
        <img :src="logoMinisterio" alt="Ministerio de Educación" />
      </div>

      <h1 class="login-title">Iniciar sesión</h1>

      <!-- MENSAJE DE ERROR -->
      <p v-if="error" class="login-error">
        {{ error }}
      </p>

      <!-- FORMULARIO -->
      <form class="login-form" @submit.prevent="handleSubmit">
        <div class="field">
          <label for="email">Correo electrónico</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="admin@mineduc.edu.gt"
            required
          />
        </div>

        <div class="field">
          <label for="password">Contraseña</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="••••••••"
            required
          />
        </div>

        <button type="submit" class="btn-login" :disabled="loading">
          {{ loading ? "Ingresando..." : "Ingresar" }}
        </button>

        <p class="hint">
          Usuario de prueba: <strong>admin@mineduc.edu.gt</strong> / Contraseña:
          <strong>admin123</strong>
        </p>
      </form>

      <p class="login-footer">
        © 2025 Ministerio de Educación de Guatemala – Portal de Salud Escolar
      </p>
    </div>
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

const handleSubmit = async () => {
  error.value = "";
  loading.value = true;

  try {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value.trim(),
        password: password.value.trim(),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      error.value = data.message || "Correo o contraseña incorrectos.";
      return;
    }

    // Guardar sesión (temporal)
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    // Si venía redirigido desde una ruta protegida, volver allí.
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
  background: #f5f7fb;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.login-card {
  width: 100%;
  max-width: 420px;
  background: #ffffff;
  border-radius: 18px;
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.18);
  padding: 32px 32px 24px;
  text-align: center;
}

.login-logo img {
  max-width: 200px;
  margin-bottom: 12px;
}

.login-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 18px;
  color: #111827;
}

.login-error {
  background: #fee2e2;
  color: #b91c1c;
  border-radius: 12px;
  padding: 8px 10px;
  font-size: 0.8rem;
  margin-bottom: 14px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.field {
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.field label {
  font-size: 0.8rem;
  color: #4b5563;
}

.field input {
  padding: 9px 12px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  font-size: 0.85rem;
  outline: none;
}

.field input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.2);
}

.btn-login {
  margin-top: 4px;
  padding: 10px 14px;
  border-radius: 999px;
  border: none;
  background: #2563eb;
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease, transform 0.1s ease;
}

.btn-login:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
}

.btn-login:disabled {
  opacity: 0.65;
  cursor: not-allowed;
  transform: none;
}

.hint {
  font-size: 0.7rem;
  color: #6b7280;
  margin-top: 8px;
}

.login-footer {
  margin-top: 16px;
  font-size: 0.68rem;
  color: #9ca3af;
}
</style>