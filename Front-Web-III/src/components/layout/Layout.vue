<script setup lang="ts">
import Header from '@/components/layout/Header.vue';
import Menu from '@/components/layout/Menu.vue';
import AlertContainer from '@/components/common/AlertContainer.vue';
import { onMounted, onUnmounted } from 'vue';
import { connect, disconnect } from '@/services/wsService';

onMounted(() => {
  const token = localStorage.getItem('token');
  console.log(token);
  if (token) {
    connect(token);
  } else {
    console.error('Token is null');
  }
});

onUnmounted(() => {
  disconnect();
});
</script>

<template>
  <v-app>
    <v-app-bar app clipped>
      <Header />
    </v-app-bar>

    <Menu />

    <v-main class="mt-10 ml-15 mr-15">
      <router-view />
      <AlertContainer />
    </v-main>
  </v-app>
</template>