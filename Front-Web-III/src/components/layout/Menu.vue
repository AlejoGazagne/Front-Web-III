<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '../../stores/useAuthStore';

const router = useRouter();
const route = useRoute(); // Información sobre la ruta actual
const authStore = useAuthStore();

// Estado para el ítem activo
const activeItem = ref('');

// Computed para definir los ítems del menú según roles
const items = computed(() => {
  const roles = authStore.getRoles;
  const commonItems = [
    { text: 'Ordenes', icon: 'mdi-truck', path: '/' },
    { text: 'Dashboard', icon: 'mdi-chart-box-outline', path: '/dashboard' },
  ];

  if (roles.includes('ROLE_ADMIN')) {
    return [
      ...commonItems,
      { text: 'Panel de Usuarios', icon: 'mdi-shield-account', path: '/admin/admin-panel' },
      { text: 'Agregar Producto', icon: 'mdi-plus', path: '/admin/products' },
      { text: 'Carga de camiones', icon: 'mdi-truck', path: '/realtime-truck-loading' },
    ];
  } else if (roles.includes('ROLE_OPERATOR')) {
    return [
      ...commonItems,
      { text: 'Carga de camiones', icon: 'mdi-truck', path: '/realtime-truck-loading' },

    ];
  } else {
    return commonItems;
  }
});

// Método para manejar clics en un ítem
const handleItemClick = (itemPath: string) => {
  activeItem.value = itemPath;
  router.push(itemPath);
};

// Función para sincronizar el ítem activo con la ruta actual
const syncActiveItemWithRoute = () => {
  const currentPath = route.path;
  const matchedItem = items.value.find((item) => item.path === currentPath);
  activeItem.value = matchedItem ? matchedItem.path : '';
};

// Sincronizar cuando cambia la ruta
watch(
  () => route.path,
  () => syncActiveItemWithRoute(),
  { immediate: true } // Ejecutar al montar
);
</script>

<template>
  <div>
    <v-navigation-drawer class="pt-3" app :width="280" permanent>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          class="cursor-pointer"
          :class="{ 'active-item': activeItem === item.path }"
          :clickable="!!item.path"
          @click="handleItemClick(item.path)"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>

          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<style scoped>
.active-item {
  background-color: #091c478a;
  border-radius: 4px;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
