import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/ProductDetail/:id',
      name: 'ProductDetail',
      component: () => import('../views/ProductDetailView.vue')
    },
    {
      path: '/addProduct',
      name: 'AddProduct',
      component: () => import('../views/AddProductView.vue')
    }
  ]
})

export default router
