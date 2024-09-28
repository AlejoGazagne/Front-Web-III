<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const valid = ref(false);
const router = useRouter();

const load = ref(false)

const emailRules = [
  (v: string) => !!v || 'Email es requerido',
  (v: string) => /.+@.+\..+/.test(v) || 'Email debe ser válido'
];

const passwordRules = [
  (v: string) => !!v || 'Contraseña es requerida',
  (v: string) => v.length >= 6 || 'Contraseña debe tener al menos 6 caracteres'
];

const submit = async () => {
  load.value = true
  if (valid.value) {
    try {
      const response = await fetch(`http://localhost:5000/users?email=${email.value}&password=${password.value}&_limit=1`);
      if (!response.ok) {
        throw new Error('Error en la petición');
      }
      const user = await response.json();
      console.log(user);
      setTimeout(() => {
        load.value = false;
        if (user.length > 0) {
         
          localStorage.setItem('token', `${user[0].role},${user[0].id}`);          
          router.push({ name: 'Home' });
        }
      }, 1000)
    } catch (error) {
      console.error(error);
      load.value = false;
    }
  }
};

const goToRegister = () => {
  router.push('/register');
};
</script>

<template>
<v-container class="d-flex flex-column justify-center align-center" style="height: 100vh;">
    <v-card :disabled="load" :isLoading="load" class="pa-6" width="500" elevation="4">
      <template v-slot:loader="{ isActive }">
            <v-progress-linear :active="isActive" color="deep-purple" height="7" indeterminate></v-progress-linear>
        </template>
      <v-card-title>Login</v-card-title>
      
      <v-card-text>
        <v-form ref="loginForm" v-model="valid" lazy-validation>
          
          <v-text-field
            v-model="email"
            label="Email"
            :rules="emailRules"
            required
            class="mb-4"
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            :rules="passwordRules"
            required
          ></v-text-field>

        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" @click="submit" :disabled="!valid">Login</v-btn>
      </v-card-actions>

      <v-card-subtitle class="mt-2">
        <small>No tienes una cuenta? <v-btn text="" class="ml-7 rgt" @click="goToRegister">Registrarse</v-btn></small>
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