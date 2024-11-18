<script lang="ts" setup>
import { ref } from 'vue';

// Variables reactivas
const searchQuery = ref<string>(''); // Control del texto de búsqueda
const userName = ref<string>('Darren Saunders'); // Nombre del usuario
const userRole = ref<string>('Admin'); // Rol del usuario

</script>

<template>
  <v-app>
    <v-app-bar app dense flat class="top-bar px-5">
      <v-row class="align-center d-flex justify-space-between" no-gutters>
        <!-- Logo y título -->
        <v-col cols="2" class="d-flex align-center">
          <img src="../assets/sin-fondo.webp" alt="Logo empresa" width="90px">
          <span class="mx-5 text-title-1 font-weight-bold">Nombre empresa</span>
        </v-col>
        <!-- Barra de búsqueda
        <v-col class="d-flex align-center">
          <v-text-field
            v-model="searchQuery"
            label="Search by client name or product"
            outlined
            dense
            hide-details
            clearable
            prepend-icon="mdi-pencil"
            background-color="#f7f7f7"
            class="rounded-lg shadow-lg"
            rounded
          />
        </v-col> -->

        <!-- Perfil del usuario -->
        <div class="d-flex justify-end">
          <v-btn class="text-none" height="50px" stacked>
            <v-badge color="error" content="2">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="currentColor" d="M5 19q-.425 0-.712-.288T4 18t.288-.712T5 17h1v-7q0-2.075 1.25-3.687T10.5 4.2v-.7q0-.625.438-1.062T12 2t1.063.438T13.5 3.5v.7q2 .5 3.25 2.113T18 10v7h1q.425 0 .713.288T20 18t-.288.713T19 19zm7 3q-.825 0-1.412-.587T10 20h4q0 .825-.587 1.413T12 22m-4-5h8v-7q0-1.65-1.175-2.825T12 6T9.175 7.175T8 10z"/></svg>
            </v-badge>
          </v-btn>

          <v-btn height="50px">
            <v-avatar class="mr-3">
              <svg viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="1.008"></g>
                <g id="SVGRepo_iconCarrier">
                  <circle cx="12" cy="9" r="3" stroke="#1C274C" stroke-width="1.08"></circle>
                  <path d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20" stroke="#1C274C" stroke-width="1.08" stroke-linecap="round"></path> 
                  <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#1C274C" stroke-width="1.08" stroke-linecap="round"></path> 
                </g>
              </svg>
            </v-avatar>

            <div class="text-right">
              <div class="text-body-1 font-weight-bold">{{ userName }}</div>
              <div class="text-caption">{{ userRole }}</div>
            </div>
          </v-btn>
        </div>
      </v-row>
    </v-app-bar>
  </v-app>
</template>

<style scoped>
.top-bar {
  background-color: #ffffff;
  border-bottom: 1px solid #e6e6e6;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: #333333;
}

.text-body-1 {
  color: #333333;
}

.text-caption {
  color: #888888;
}
</style>