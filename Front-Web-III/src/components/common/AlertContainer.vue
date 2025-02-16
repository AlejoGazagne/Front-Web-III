<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { subscribe } from '@/services/wsService';
import Alarm from '@/components/common/Alarm.vue';
import type { Alert } from '@/types/alert';
import { fetchAcceptedAlarm } from '@/services/alarmService';

const topic = '/topic/alarms/reminders';

const notifications = ref<{
  id: number;
  productName: string;
  limitTemperature: number;
  temperature: number;
  dateOccurrence: Date;
  orderId: number;
}[]>([]);

const receivedAlerts = new Set<number>();

// Manejar los mensajes del WebSocket
const handleMessage = (message: Alert) => {
  //console.log('📩 Recibida alerta:', message);

  if (!receivedAlerts.has(message.id)) {
    receivedAlerts.add(message.id);

    notifications.value.push({
      id: message.id,
      productName: message.productName,
      limitTemperature: message.limitTemperature,
      temperature: message.temperature,
      dateOccurrence: message.dateOccurrence,
      orderId: message.orderId,
    });
  }
};

// Suscribirse al WebSocket
onMounted(() => {
  subscribe(topic, handleMessage);
});

// Cerrar notificación
const closeNotification = (id: number) => {
  notifications.value = notifications.value.filter((n) => n.id !== id);
  receivedAlerts.delete(id);
};

// Estados para manejar mensajes de usuario
const feedbackMessage = ref<string | null>(null);
const feedbackColor = ref<string>('green'); // Verde por defecto
const showFeedback = ref(false);

// Aceptar notificación con manejo de error
const acceptNotification = async (alert: Alert) => {
  try {
    const response = await fetchAcceptedAlarm(alert);

    if (response.status === 200) {
      closeNotification(alert.id);
      feedbackColor.value = "green";
      showFeedback.value = true;
      feedbackMessage.value = "Alerta aceptada correctamente";
    } else {
      throw new Error(`Error: No se pudo aceptar la alerta.`);
    }
  } catch (error: any) {
    console.error("❌ Error al aceptar la alerta:", error);
    feedbackMessage.value = error.message || "Error desconocido";
    feedbackColor.value = "red";
    showFeedback.value = true;
    closeNotification(alert.id);
  }
};
</script>

<template>
  <div class="notification-container">
    <Alarm
      v-for="notification in notifications"
      :key="notification.id"
      :id="notification.id"
      :productName="notification.productName"
      :limitTemperature="notification.limitTemperature"
      :temperature="notification.temperature"
      :dateOccurrence="notification.dateOccurrence"
      :orderId="notification.orderId"
      @cancel="closeNotification"
      @accept="acceptNotification"
    />
  </div>

   <!-- Snackbar de feedback -->
   <v-snackbar v-model="showFeedback" :color="feedbackColor" timeout="3000">
    {{ feedbackMessage }}
  </v-snackbar>
</template>

<style scoped>
.notification-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
}
</style>