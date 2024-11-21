<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const id = ref('');
const tare = ref('');
const successMessage = ref('');
const errorMessage = ref('');
const router = useRouter();
const submitWeighing = async () => {
    successMessage.value = '';
    errorMessage.value = '';

    const response = await fetch(`http://localhost:8080/api/v1/weighing/final/${id.value}?finalWeight=${tare.value}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (response.ok) {
        successMessage.value = 'Final weighing registered successfully!';
    } else {
        errorMessage.value = 'Failed to register the final weighing. Please try again.';
        id.value = '';
        tare.value = '';
        setTimeout(() => {
            errorMessage.value = '';
        }, 3000);
    }

};

const goToHome = () => {
    router.push('/');
};
</script>

<template>
    <v-container>
      <h1>Register Final Weighing</h1>
      <v-form @submit.prevent="submitWeighing">
        <!-- ID Input -->
        <v-text-field
          label="ID"
          v-model="id"
          required
        ></v-text-field>
  
        <!-- Tare Input -->
        <v-text-field
          label="Tare"
          v-model="tare"
          type="number"
          required
        ></v-text-field>
  
        <!-- Submit Button -->
        <v-btn color="primary" type="submit">Register</v-btn>
      </v-form>
      
      <!-- Display Success Message -->
    <div v-if="successMessage" class="success-box">
      {{ successMessage }}
    <v-btn @click="() => { successMessage = ''; goToHome(); }">OK</v-btn>
    </div>
  
    <!-- Display Error Message -->
    <div v-if="errorMessage" class="error-box">
      {{ errorMessage }}
    </div>
    </v-container>
</template>

<style scoped>
.success-box {
  border: 1px solid green;
  padding: 10px;
  margin-top: 10px;
  background-color: #e6ffe6;
}

.error-box {
  border: 1px solid red;
  padding: 10px;
  margin-top: 10px;
  background-color: #ffe6e6;
}
</style>
