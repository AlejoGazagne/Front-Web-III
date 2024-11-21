import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/userAuthStore';

const routes = [
  // Rutas de autenticación
  {
    path: '/login',
    component: () => import('../views/auth/LoginView.vue'),
  },
  // Rutas del administrador
  {
    path: '/admin',
    component: () => import('@/views/admin/AddProductView.vue'), // Cambiar por la vista del admin
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/admin/AlertsView.vue'),
      },
      {
        path: 'manage-users',
        component: () => import('@/views/admin/ManageUsersView.vue'),
      },
    ],
    meta: { requiresAdmin: true, role: 'admin' },
  },
  // Rutas del Operator

  // Rutas comparidas
  {
    path: '/',
    component: () => import('../views/shared/HomeView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/dashboard',
    component: () => import('../views/shared/DashboardView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/profile',
    component: () => import('../views/shared/ProfileView.vue'),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');// ver si se puede cambiar y hacer un log automatico asi no pierde las cosas
  } else if (to.meta.role && to.meta.role !== authStore.userRole) {
    next('/');
  } else {
    next();
  }
});

export default router;
