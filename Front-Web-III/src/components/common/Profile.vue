<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '../../stores/useAuthStore';
import type { UserData } from '@/types/user';

// Obtener datos del store
const userAuthStore = useAuthStore();
const userData: UserData = userAuthStore.getUserData;

// Estado para mostrar/ocultar contraseña
const showPassword = ref(false);

// Copia de los datos del usuario para edición
const user = ref({
  name: userData.name,
  mail: userData.mail,
  password: ''
});

// Computed para verificar si hubo cambios
const hasChanges = computed(() => {
  return (
    user.value.name !== userData.name ||
    user.value.mail !== userData.mail ||
    user.value.password !== ''
  );
});

// Formateo de roles
const formatRoles = (roles: string[]): string => {
  const roleMapping: Record<string, string> = {
    ROLE_ADMIN: 'Administrador',
    ROLE_OPERATOR: 'Operario',
  };

  return roles
    .map(role => roleMapping[role] || role)
    .join(', ');
};

const handleSaveChanges = async () => {
  // Lógica para guardar cambios
  console.log('Guardando cambios...');
};

</script>

<template>
  <div class="borde pl-15 pt-8">
    <!-- Cabecera -->
    <v-row class="mb-2">
      <h2>Mi perfil</h2>
    </v-row>

    <!-- Datos del usuario -->
    <v-row class="borde align-center border mr-1 ml-1">
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
        <v-col cols="12" md="4">
          <v-text-field
            v-model="user.name"
            label="Nombre"
            type="text"
            prepend-icon="mdi-account-outline"
            variant="underlined"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="user.mail"
            label="Correo Electrónico"
            type="email"
            prepend-icon="mdi-email-outline"
            variant="underlined"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="user.password"
            :type="showPassword ? 'text' : 'password'"
            label="Contraseña"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append="showPassword = !showPassword"
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