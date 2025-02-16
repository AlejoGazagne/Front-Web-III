import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/useAuthStore';
import Layout from '@/components/layout/Layout.vue';

const routes = [
  // Rutas de autenticación
  {
    path: '/login',
    component: () => import('../views/auth/LoginView.vue'),
  },
  // Rutas del administrador
  {
    path: '/admin/',
    component: Layout,
    // component: () => import('../views/admin/AdminView.vue'), // Cambiar por la primer vista del admin
    meta: { requiresAdmin: true, role: 'ROLE_ADMIN' },
    children: [
      {
        path: 'products',
        component: () => import('../views/admin/AddProductView.vue'),
      },
      {
        path: 'admin-panel',
        component: () => import('../views/admin/ManageUsersView.vue'),
      },
    ],
  },
  // Rutas del Operator

  // Rutas comparidas
  {
    path: '/',
    component: Layout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        component: () => import('../views/shared/HomeView.vue'),
      },
      {
        path: 'dashboard',
        component: () => import('../views/shared/DashboardView.vue'),
      },
      {
        path: 'profile',
        component: () => import('../views/shared/ProfileView.vue'),
      },
      {
        path: 'order/:id',
        name: 'OrderDetail',
        component: () => import('../views/shared/OrderDetailView.vue'),
      },
      {
        path: '/alarms',
        component: () => import('../views/shared/AlarmsView.vue'),
      }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Verificar autenticación
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login'); // Redirigir al login si no está autenticado
    return;
  }

  // Verificar roles
  if (to.meta.role) {
    const userRoles = authStore.userData.roles; // Lista de roles del usuario
    const requiredRole = to.meta.role as string; // Rol requerido por la ruta

    if (!userRoles.includes(requiredRole)) {
      next('/'); // Redirigir si el usuario no tiene el rol requerido
      return;
    }
  }

  next(); // Permitir la navegación
});

export default router;
