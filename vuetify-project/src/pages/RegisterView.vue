<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const valid = ref(false);
const router = useRouter();

const nameRules = [
  (v: string) => !!v || 'Nombre es requerido',
  (v: string) => v.length >= 3 || 'El nombre debe tener al menos 3 caracteres'
];

const emailRules = [
  (v: string) => !!v || 'Email es requerido',
  (v: string) => /.+@.+\..+/.test(v) || 'Email debe ser válido'
];

const passwordRules = [
  (v: string) => !!v || 'Contraseña es requerida',
  (v: string) => v.length >= 6 || 'La contraseña debe tener al menos 6 caracteres'
];

const confirmPasswordRules = [
  (v: string) => !!v || 'Confirmar contraseña es requerido',
  (v: string) => v === password.value || 'Las contraseñas no coinciden'
];

const submit = () => {
  if (valid.value) {
    console.log('Nombre:', name.value);
    console.log('Email:', email.value);
    console.log('Password:', password.value);

    router.push('/');
  }
};

// Función para redirigir al formulario de login
const goToLogin = () => {
  router.push('/login');
};
</script>

<template>
    <v-container class="d-flex flex-column justify-center align-center" style="height: 100vh;">
    <v-card class="pa-6" width="500" elevation="4">
      <v-card-title>Registrarse</v-card-title>
      
      <v-card-text>
        <v-form ref="registerForm" v-model="valid" lazy-validation>
          
          <v-text-field
            v-model="name"
            label="Nombre"
            :rules="nameRules"
            required
          ></v-text-field>

          <v-text-field
            v-model="email"
            label="Email"
            :rules="emailRules"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Contraseña"
            type="password"
            :rules="passwordRules"
            required
          ></v-text-field>

          <v-text-field
            v-model="confirmPassword"
            label="Confirmar Contraseña"
            type="password"
            :rules="confirmPasswordRules"
            required
          ></v-text-field>

        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" @click="submit" :disabled="!valid">Registrarse</v-btn>
      </v-card-actions>

      <v-card-subtitle class="mt-2">
        <small>Ya tienes una cuenta? <v-btn class="ml-6 rgt" @click="goToLogin">Iniciar Sesión</v-btn></small>
      </v-card-subtitle>
    </v-card>
  </v-container>
</template>

<style scoped>
.rgt {
    border: 1px solid #dfdfdf;
    border-radius: 5px;
}
</style>