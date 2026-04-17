/**
 * Centralize environment variables access.
 * Fallbacks to import.meta.env if window.APP_CONFIG is not defined (e.g., in local development).
 */

export function getEnv(name) {
  if (window.APP_CONFIG && window.APP_CONFIG[name]) {
    return window.APP_CONFIG[name];
  }
  return import.meta.env[name];
}

export const API_URL = getEnv("VITE_API_URL") || "http://localhost:3000";

export default {
  API_URL,
};
