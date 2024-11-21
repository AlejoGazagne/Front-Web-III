<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/userAuthStore';
import { login } from '../../services/authService';

const router = useRouter();
const userStore = useAuthStore();

const username = ref('');
const password = ref('');
const valid = ref(false);
const load = ref(false);
const errorMessage = ref('');

/*const emailRules = [
  (v: string) => !!v || 'Email es requerido',
  (v: string) => /.+@.+\..+/.test(v) || 'Email debe ser válido'
];*/

const passwordRules = [
  (v: string) => !!v || 'Contraseña es requerida',
  (v: string) => v.length >= 6 || 'Contraseña debe tener al menos 6 caracteres'
];

const submit = async () => {
  load.value = true;
  errorMessage.value = ''; // Clear any previous error message
  console.log(username);
  console.log(password);
  if (valid.value) {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/login?username=${username.value}&password=${password.value}`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Error en la petición');
      }

      const token = await response.text();
      console.log(token);

      setTimeout(() => {
        load.value = false;
        if (token) {
          //userStore.login(token)
          userStore.setToken(token);
          // TODO: agregar en el back que devuelva el nombre de usuario, nombre, id...
          localStorage.setItem('token', token);
          router.push('/');
        } else {
          errorMessage.value = 'Usuario o contraseña incorrecto, vuelva a intentar';
        }
      }, 1000);
    } catch (error) {
      console.error(error);
      errorMessage.value = 'Usuario o contraseña incorrecto, vuelva a intentar';
      load.value = false;
    }
  }
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
            v-model="username"
            label="Username"
            required
            class="mb-4 input-field"
            test-tag="username-input"
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            :rules="passwordRules"
            required
            class="input-field"
            test-tag="password-input"
          ></v-text-field>

          <v-alert v-if="errorMessage" type="error" class="mt-4">{{ errorMessage }}</v-alert>

        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" @click="submit" :disabled="!valid" test-tag="submit-button">Login</v-btn>
      </v-card-actions>

    </v-card>
  </v-container>
</template>

<style scoped>
.rgt {
  border: 1px solid #dfdfdf;
  border-radius: 5px;
}

.input-field :focus-within {
  background-color: rgb(201, 246, 249) ;
}

</style>