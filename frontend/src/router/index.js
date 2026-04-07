// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuth } from '@/helpers/useAuth'

const { isAuthenticated } = useAuth()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },

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

    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },

    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminDashboardView.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

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