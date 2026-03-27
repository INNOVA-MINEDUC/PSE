// src/helpers/useAuth.js
import { ref } from "vue";

const isAuthenticated = ref(false);
const user = ref(null);

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

// Al cargar la app, intenta restaurar sesión
const savedToken = localStorage.getItem("pse_token");
const savedUser = localStorage.getItem("pse_user");
if (savedToken) {
  isAuthenticated.value = true;
  user.value = savedUser ? JSON.parse(savedUser) : null;
}

async function login(email, password) {
  try {
    const resp = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await resp.json();

    if (!resp.ok || !data.ok) {
      isAuthenticated.value = false;
      user.value = null;
      localStorage.removeItem("pse_token");
      localStorage.removeItem("pse_user");
      return false;
    }

    // ✅ Guardar sesión
    localStorage.setItem("pse_token", data.token);
    localStorage.setItem("pse_user", JSON.stringify(data.user));

    isAuthenticated.value = true;
    user.value = data.user;

    return true;
  } catch (err) {
    console.error("Login error:", err);
    isAuthenticated.value = false;
    user.value = null;
    return false;
  }
}

function logout() {
  isAuthenticated.value = false;
  user.value = null;
  localStorage.removeItem("pse_token");
  localStorage.removeItem("pse_user");
}

export function useAuth() {
  return { isAuthenticated, user, login, logout };
}

export { isAuthenticated, user };