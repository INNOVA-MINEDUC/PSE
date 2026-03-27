// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { isAuthenticated } from '@/helpers/useAuth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // PÁGINA PÚBLICA
    { path: '/', name: 'home', component: HomeView },

    // Páginas públicas de los módulos
    {
      path: '/promocion',
      name: 'promocion',
      component: () => import('../views/PromocionView.vue')
    },
    {
      path: '/atencion',
      name: 'atencion',
      component: () => import('../views/AtencionView.vue')
    },
    {
      path: '/medicamentos',
      name: 'medicamentos',
      component: () => import('../views/MedicamentosView.vue')
    },
    {
      path: '/llamadas',
      name: 'llamadas',
      component: () => import('../views/CentroLlamadasView.vue')
    },
    {
      path: '/funerarios',
      name: 'funerarios',
      component: () => import('../views/FunerariosView.vue')
    },

    // LOGIN (pública)
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },

    // ADMIN (protegida)
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminDashboardView.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

/**
 * ⛔ Guard global de navegación
 * - Si la ruta requiere auth y no está logueado → lo manda a /login
 * - Si ya está logueado e intenta ir a /login → lo manda a /admin
 */
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({
      name: 'login',
      query: { redirect: to.fullPath }
    })
    return
  }

  if (to.name === 'login' && isAuthenticated.value) {
    next({ name: 'admin' })
    return
  }

  next()
})

export default router
