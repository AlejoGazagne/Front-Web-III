<script setup lang="ts">
import { defineProps, defineEmits, ref, computed } from 'vue';
import { useAuthStore } from '../../stores/useAuthStore';
import type { UserData } from '@/types/user';

// Obtener datos del store
const userAuthStore = useAuthStore();
const userData: UserData = userAuthStore.getUserData;

const description = ref('');

const props = defineProps<{
  id: number;
  productName: string;
  limitTemperature: number;
  temperature: number;
  dateOccurrence: Date;
  orderId: number;
}>();

const alarm = ref<{
  id: number;
  dateResolved: Date;
  description: string;
  id_user: string;
}>({
  id: props.id,
  dateResolved: new Date(),
  description: '',
  id_user: userData.id,
});

const emit = defineEmits(['cancel', 'accept', 'critical']);


const cancelNotification = () => {
  emit('cancel', props.id);
};

const ignoreNotification = () => {
  alarm.value.description = description.value;
  emit('accept', alarm.value);
}

const criticalNotification = () => {
  alarm.value.description = description.value;
  emit('critical', alarm.value);
}

// Función para calcular la diferencia de temperatura con dos decimales
const temperatureDifference = computed(() => {
  return (props.temperature - props.limitTemperature).toFixed(2);
});
</script>

<template>
  <v-card class="alert-card pa-4" :class="`border-${'error'}`">
    <!-- Ícono y Botón de Cerrar -->
    <v-card-title class="d-flex align-center">
      <v-icon color="red" class="mr-2">mdi-alert-circle-outline</v-icon>
      <span class="text-h6 font-weight-bold">Alerta: Temperatura máxima superada</span>
      <!-- <v-spacer /> -->
    </v-card-title>

    <!-- Mensaje -->
    <v-card-text class="text-body-1">
      El producto <strong>{{ props.productName }}</strong>, ha superado su temperatura maxima de
      <strong>{{ props.limitTemperature }}°C</strong> por
      <strong>{{ temperatureDifference }}°C</strong>.
      <!-- La temperatura actual es de <strong>{{ props.temperature }}°C</strong>. -->
    </v-card-text>

    <!-- Textarea -->
    <v-card-text>
      <v-textarea
        v-model="description"
        label="Añadir un comentario..."
        variant="outlined"
        rows="2"
        hide-details="auto"
        class="custom-textarea"
      ></v-textarea>
    </v-card-text>

    <!-- Botón de Cerrar -->
    <v-card-actions class="justify-end">
      <v-btn variant="plain" class="white--text" @click="cancelNotification">
        Cerrar
      </v-btn>
      <v-btn color="error" variant="outlined" @click="criticalNotification">
        Cortar suministro
      </v-btn>
      <v-btn color="success" variant="outlined" @click="ignoreNotification">
        Aceptar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.alert-card {
  position: relative;
  border: 2px solid red;
  background-color: #ffffff;
  width: 600px;
  max-width: 80vw;
  margin-bottom: 10px;
}
.custom-textarea {
  font-size: 8px; /* Ajusta el tamaño de la letra */
}
</style>