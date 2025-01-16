<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '../../stores/useAuthStore';
import type { UserData } from '@/types/user';
import { editarUsuario } from '@/services/userService';
import { formatRoles } from '@/utils/formatRoles';

// Obtener datos del store
const userAuthStore = useAuthStore();
const userData: UserData = userAuthStore.getUserData;

// Estado para mostrar/ocultar contraseña
const showChangePassword = ref(false);

const showSnackbar = ref(false); // Estado para mostrar u ocultar el snackbar
const snackbarMessage = ref(''); // Mensaje a mostrar
const snackbarColor = ref('success'); // Color dinámico del snackbar

// Copia de los datos del usuario para edición
const user = ref({
  id: userData.id,
  name: userData.name,
  mail: userData.mail,
  currentPassword: '',
  newPassword: ''
});

// Computed para verificar si hubo cambios
const hasChanges = computed(() => {
  return (
    userData.name !== user.value.name ||
    userData.mail !== user.value.mail ||
    user.value.newPassword !== ''
  );
});

// Función para guardar cambios
const handleSaveChanges = async () => {
  if (user.value.name === '' || user.value.mail === '' ) {
    alert('Por favor, completa todos los campos correctamente.');
    return;
  }

  const response = await editarUsuario(user.value) as { status: number, data: UserData };

  if (response.status === 200) {
    userAuthStore.setUserData(response.data);
    showChangePassword.value = false;
    
    snackbarMessage.value = '¡Perfil actualizado con éxito!';
    snackbarColor.value = 'success';
    showSnackbar.value = true;
    
  } else {
    snackbarMessage.value = 'Hubo un error al actualizar el perfil. Por favor, intenta nuevamente.';
    snackbarColor.value = 'error';
    showSnackbar.value = true;
  }
  
};
</script>

<template>
  <div class="borde pl-15 pt-8">
    <!-- Cabecera -->
    <v-row class="mb-2">
      <h2>Mi perfil</h2>
    </v-row>

    <!-- Datos del usuario -->
    <v-row class="borde align-center border mr-1 ml-1 pl-7">
      <Icon icon="mdi:account-circle-outline" height="4rem" class="mr-10"/>
      <div>
        <h3 class="text-h5"><strong>{{ userData.name }}</strong></h3>
        <p class="text-body-1 font-weight-bold text-grey-darken-2">{{ userData.mail }}</p>
        <p class="text-body-2 font-weight-bold text-grey-darken-2">{{ formatRoles(userData.roles) }}</p>
      </div>
    </v-row>

    <!-- Información personal -->
    <div class="borde border mt-10 position-relative">
      <div>
        <h2>Información personal</h2>
      </div>
      
      <div>
        <!-- Inputs Minimalistas -->
        <v-col cols="12" md="3">
          <v-text-field
            v-model="user.name"
            label="Nombre"
            type="text"
            prepend-icon="mdi-account-outline"
            variant="underlined"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="user.mail"
            label="Correo Electrónico"
            type="email"
            prepend-icon="mdi-email-outline"
            variant="underlined"
          ></v-text-field>
        </v-col>
        
        <!-- Texto para cambiar contraseña -->
        <v-col cols="12" md="12">
          <p
            class="text-body-2 cursor-pointer"
            @click="showChangePassword = !showChangePassword"
          >
            ¿Queres cambiar tu contraseña?
          </p>
        </v-col>

        <!-- Inputs de cambio de contraseña -->
        <v-col v-if="showChangePassword" cols="12" md="3">
          <v-text-field
            v-model="user.currentPassword"
            type="password"
            label="Contraseña Actual"
            prepend-icon="mdi-lock"
            variant="underlined"
          ></v-text-field>
        </v-col>
        <v-col v-if="showChangePassword" cols="12" md="3">
          <v-text-field
            v-model="user.newPassword"
            type="password"
            label="Nueva Contraseña"
            prepend-icon="mdi-lock"
            variant="underlined"
          ></v-text-field>
        </v-col>
      </div>

      <!-- Botón Guardar cambios -->
      <v-btn
        class="save-button"
        :disabled="!hasChanges"
        color="primary"
        elevation="2"
        @click="handleSaveChanges"
      >
        Guardar cambios
      </v-btn>
    </div>
  </div>
  <v-snackbar v-model="showSnackbar" :color="snackbarColor" timeout="3000">
    {{ snackbarMessage }}
  </v-snackbar>
</template>
<style scoped>
.borde {
  border: 1px solid var(--v-theme-light-line);
  background-color: var(--v-theme-light-background);
  padding: 1rem;
  border-radius: 10px;
}

.position-relative {
  position: relative;
}

.save-button {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>