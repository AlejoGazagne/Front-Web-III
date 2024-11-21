import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/validate-password',
      name: 'validate-password',
      component: () => import('../views/ValidatePasswordView.vue'),
    },
    {
      path: '/register-first-weighing',
      name: 'register-first-weighing',
      component: () => import('../views/RegisterFirstWeighingView.vue'),
    },
    {
      path: '/load-truck',
      name: 'load-truck',
      component: () => import('../views/LoadTruckView.vue'),
    },
    {
      path: '/register-final-weighing',
      name: 'register-final-weighing',
      component: () => import('../views/RegisterFinalWeighingView.vue'),
    },
    {
      path: '/close-order',
      name: 'close-order',
      component: () => import('../views/CloseOrderView.vue'),
    }

  ],
})

export default router
