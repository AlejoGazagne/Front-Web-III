<script lang="ts" setup>
import Header from '@/components/layout/Header.vue';
import Menu from '@/components/layout/Menu.vue';
import UsersList from '@/components/admin/UsersList.vue';
</script>

<template>
  <v-app>
    <v-app-bar app clipped >
      <Header />
    </v-app-bar>
    
    <Menu />

    <!-- Contenido principal -->
    <v-main class="mt-10 mr-15 ml-15">
      <div class="custom-card">
        <v-row>
          <UsersList />
        </v-row>
        <!-- <v-divider :thickness="2" class="mt-4 mb-4"></v-divider>
        <v-row>
          <ClientList />
        </v-row> -->
      </div>
      
    </v-main>
  </v-app>
</template>

<style scoped>
.probando {
  padding: 0;
}
.custom-card{
  border: 1px solid var(--v-theme-light-line);
  background-color: var(--v-theme-light-background);
  padding: 1rem;
  border-radius: 10px;
}
</style>