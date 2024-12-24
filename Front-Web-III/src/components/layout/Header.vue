<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/useAuthStore';
import type { UserData } from '@/types/user';

const router = useRouter();
const userAuthStore = useAuthStore();

// Variables
const searchQuery = ref<string>('');
const showMenu = ref<boolean>(false);
const userData: UserData = userAuthStore.getUserData;
const roles = userData.roles.map(role => role.slice(5)).join(', ').toLowerCase();

function goToProfile(){
  router.push('/profile');
}

function handleLogout() {
  userAuthStore.clearAuth();
  router.push('/login');
}

</script>

<template>
  <v-app>
    <v-app-bar app dense flat class="top-bar px-15">
      <v-row class="align-center d-flex justify-space-between" no-gutters>
        <!-- Logo y título -->
        <v-col cols="2" class="d-flex align-center">
          <img src="../../assets/sin-fondo.webp" alt="Logo empresa" width="90px">
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
        <div class="d-flex section-right">
          <v-btn class="text-none btn" height="50px" stacked>
            <v-badge color="error" content="2">
              <Icon icon="iconamoon:notification" height="24px" />
            </v-badge>
          </v-btn>

          <v-menu v-model="showMenu" bottom offset-y >
            <template #activator="{ props }">
              <v-btn height="50px" class="btn d-flex align-center" v-bind="props">
                <v-avatar class="mr-3">
                  <Icon icon="mdi-account-circle-outline" height="50px"/>
                </v-avatar>
                <div class="text-right">
                  <div class="text-body-1 font-weight-bold">{{ userData.name.toUpperCase() }}</div>
                  <div class="text-caption">{{ roles }}</div>
                </div>
              </v-btn>
            </template>

            <v-list>
              <v-list-item link @click="goToProfile">
                <v-list-item-title>Mi Perfil</v-list-item-title>
              </v-list-item>
              <v-list-item link @click="handleLogout">
                <v-list-item-title class="close-session">Cerrar sesión</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-row>
    </v-app-bar>
  </v-app>
</template>

<style scoped>
.prueba {
  width: 10rem;
}

.section-right{
  gap: 1rem;
  justify-content: space-between;
}

.btn{
  border: 1px solid #dddddd;
  box-shadow: 0 0 10px #e0e0e0;
  border-radius: 5px;
}

.top-bar {
  background-color: #ffffff;
  border-bottom: 1px solid #e6e6e6;
  box-shadow: 0 2px 4px #a5a5a51a;
  color: #333333;
}

.close-session {
  font-weight: bold;
  color: #b10000;
}

.text-body-1 {
  color: #333333;
}

.text-caption {
  color: #888888;
}
</style>