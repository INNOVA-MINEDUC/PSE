// src/helpers/useAuth.js
import { ref } from "vue";

const isAuthenticated = ref(!!localStorage.getItem("token"));
const user = ref(JSON.parse(localStorage.getItem("user") || "null"));

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  isAuthenticated.value = false;
  user.value = null;
}

export function useAuth() {
  return {
    isAuthenticated,
    user,
    logout,
  };
}

export { isAuthenticated, user };