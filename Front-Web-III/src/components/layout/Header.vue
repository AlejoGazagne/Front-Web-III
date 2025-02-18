<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/useAuthStore';
import type { UserData } from '@/types/user';
import { formatRoles } from '@/utils/formatRoles';

const router = useRouter();
const userAuthStore = useAuthStore();

// Variables
const showMenu = ref<boolean>(false);
const userData: UserData = userAuthStore.getUserData;

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
    <v-app-bar class="top-bar px-15">
      <v-row class="align-center d-flex justify-space-between" no-gutters>
        <!-- Logo y título -->
        <v-col cols="2" class="d-flex align-center">
          <img src="../../assets/sin-fondo.webp" alt="Logo empresa" width="90px">
          <span class="mx-5 text-title-1 font-weight-bold">FleetFill Services</span>
        </v-col>

        <!-- Perfil del usuario -->
        <div class="d-flex section-right">

          <v-menu v-model="showMenu" bottom offset-y >
            <template #activator="{ props }">
              <v-btn height="50px" class="btn d-flex align-center" v-bind="props">
                <v-avatar class="mr-3">
                  <Icon icon="mdi-account-circle-outline" height="50px"/>
                </v-avatar>
                <div class="text-right">
                  <div class="text-body-1 font-weight-bold">{{ userData.name.toUpperCase() }}</div>
                  <div class="text-caption">{{ formatRoles(userData.roles) }}</div>
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
  /* box-shadow: 0 2px 4px #ececec7a;*/
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