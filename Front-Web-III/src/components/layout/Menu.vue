<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/userAuthStore';

const router = useRouter();
const authStore = useAuthStore();

const items = computed(() => {
  const role = authStore.userRole;
  const commonItems = [
    { text: 'Orders', icon: 'mdi-truck', action: () => router.push('/'), },
    { text: 'Dashboard', icon: 'mdi-view-dashboard', action: () => router.push('/dashboard'), },
  ];

  if (role === 'Admin') {
    return [
      ...commonItems,
      { text: 'Admin Panel', icon: 'mdi-shield-account', action: () => router.push('/admin'), },
    ];
  } else if (role === 'User') {
    return [
      ...commonItems,
      { text: 'Profile', icon: 'mdi-account', action: () => router.push('/profile'), },// TODO: agregar ruta y componente
    ];
  } else {
    return commonItems;
  }
});

</script>

<template>
  <div>
    <v-navigation-drawer class="pt-3" app :width="325" permanent>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" class="cursor-pointer"
          :clickable="!!item.action" @click="item.action && item.action()" >

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

</style>