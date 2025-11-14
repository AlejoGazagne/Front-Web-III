<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/useAuthStore';

const router = useRouter();
const authStore = useAuthStore();

const username = ref('');
const password = ref('');
const valid = ref(false);
const load = ref(false);
const errorMessage = ref('');

const password = "temporalPass_dev123";

const passwordRules = [
  (v: string) => !!v || 'Contraseña es requerida',
  (v: string) => v.length >= 6 || 'Contraseña debe tener al menos 6 caracteres'
];

const submit = async () => {
  load.value = true;
  errorMessage.value = '';

  if (valid.value) {
    const success = await authStore.login(username.value, password.value);

    if (success) {
      router.push('/');
    } else {
      errorMessage.value = 'Usuario o contraseña incorrecto, vuelva a intentar';
      load.value = false;
    }
  }
};
</script>

<template>
  <div class="d-flex flex-column align-center background">
    <h2 class="title">Ingrese en su cuenta</h2>
    <v-card :disabled="load" :isLoading="load" class="pa-6 probando" width="500" elevation="4">
      <template v-slot:loader="{ isActive }">
        <v-progress-linear :active="isActive" color="deep-black" height="7" indeterminate></v-progress-linear>
      </template>
      <v-card-text>
        <v-form ref="loginForm" v-model="valid" lazy-validation>
          
          <v-text-field
            v-model="username"
            label="Nombre de usuario"
            required
            class="mb-4 input-field"
            test-tag="username-input"
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Contraseña"
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
        <v-btn color="black" @click="submit" :disabled="!valid" test-tag="submit-button"
        :class="valid ? 'btn-enabled' : 'btn-disabled'"
        class="btn" >Login</v-btn>
      </v-card-actions>

    </v-card>
  </div>
</template>

<style scoped>
.title{
  margin: 10% 0 3rem 0 ;
  color: #2c2c2c;
  font-size: 2rem;
}

.probando{
  background-color: #ffffff;
  border-radius: 10px;
}

.btn-enabled {
  width: 100%;
  background-color: #cacaca36 !important;
  color: #0e0e0e !important;
}

.btn-disabled {
  width: 100%;
  background-color: #e4e4e4 !important;
  color: #858585 !important;
  pointer-events: none;
  opacity: 0.7;
}

.btn {
  width: 100%;
  height: 35px;
  font-size: 16px;
  padding: 0 16px;
  border-radius: 8px;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.input-field :focus-within {
  background-color: #e6e6e6 ;
}

.background{
  height: 100vh;
  background-image: url('../../assets/background.webp');
  background-position: center 80%;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
