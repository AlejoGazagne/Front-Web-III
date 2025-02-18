<script lang="ts" setup>
import { computed, ref, onMounted, watch } from 'vue';
import { useOrdersStore } from '@/stores/useOrdersStore';
import { useRoute, useRouter } from 'vue-router';
import { fetchOrderAlarms } from '@/services/alarmService';
import { fetchOrderConciliation } from '@/services/orderService';
import { getStatusLabel, getStatusColor } from '@/utils/formatState';
import { formatDate } from '@/utils/formatDate';
import type { Order } from '@/types/Order';
import type { Alert } from '@/types/Alert';

const route = useRoute();
const router = useRouter();
const ordersStore = useOrdersStore();
const idOrder = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
const order = ref<Order | null>(null);
const detailsOrder = ref(null);

// Lista de alertas HARDCODEADAS
const alerts = ref([] as Alert[]);

onMounted(async () => {
  try {
    // Obtener la orden del backend y actualizar el store
    const fetchedOrder = await ordersStore.fetchById(idOrder);
    order.value = fetchedOrder;

    const fetchedDetails = await ordersStore.fetchDetailOrder(idOrder);
    detailsOrder.value = fetchedDetails;

    const fetchedAlarm = await fetchOrderAlarms(idOrder);
    alerts.value = fetchedAlarm;

    // Actualizar el timeline
    if (order.value) {
      timeline.value = [
        { label: 'Recepción', date: formatDate(order.value.dateReceived ? order.value.dateReceived.toISOString() : null) },
        { label: 'Primer Pesaje', date: formatDate(order.value.dateFirstWeighing ? order.value.dateFirstWeighing.toISOString() : null) },
        { label: 'Carga Inicial', date: formatDate(order.value.dateInitialCharge ? order.value.dateInitialCharge.toISOString() : null) },
        { label: 'Carga Final', date: formatDate(order.value.dateFinalCharge ? order.value.dateFinalCharge.toISOString() : null) },
        { label: 'Pesaje Final', date: formatDate(order.value.dateFinalWeighing ? order.value.dateFinalWeighing.toISOString() : null) },
      ];
    } else {
      timeline.value = [];
    }

    // Actualizar los parámetros
    if (detailsOrder.value) {
      parameters.value = [
        { label: 'Densidad promedio', value: Number(detailsOrder.value.avgDensity) },
        { label: 'Temperatura promedio', value: Number(detailsOrder.value.avgTemperature) },
        { label: 'Caudal promedio', value: Number(detailsOrder.value.avgCaudal) },
      ];
    } else {
      parameters.value = [];
    }
  } catch (error) {
    console.error('Error al obtener la orden:', error);
  }
});

// Inicializar timeline vacío
const timeline = ref<{ label: string; date: string }[]>([]);

const parameters = ref<{ label: string; value: number }[]>([]);

// Función para navegar a la página de origen
const goBack = () => {
  const previousRoute = route.query.from || '/';
  router.push({ path: previousRoute as string });
};

const downloadConciliation = async () => {
  try {
    if (order.value) {
      const conciliation = await fetchOrderConciliation(order.value.externalId);
      console.log('Conciliación:', conciliation);
    }
  } catch (error) {
    console.error('Error al descargar la conciliación:', error);
  }
};
</script>

<template>
  <v-row class="mb-6 align-center">
    <v-btn height="50px" class="mr-6" @click="goBack">
      <Icon icon="material-symbols:arrow-back-rounded" height="24px" />
    </v-btn>
    <p class="text-green">Order / Order Details</p>
  </v-row>

  <div v-if="order">
    <div class="borde">
      <v-row class="align-center justify-space-between mb-3">
        <v-col cols="12" md="6" lg="8">
          <h3 class="mb-1">Order #{{ order.externalId }}</h3>
          <v-chip :color="getStatusColor(order.status as string)" text-color="white" tile>
            {{ getStatusLabel(order.status as string) }}
          </v-chip>
        </v-col>

        <v-col cols="12" md="6" lg="4" class="text-right">
          <v-btn :disabled="order.status !== 'FINAL_WEIGHING'" color="green" dark @click="downloadConciliation">
            <Icon icon="mdi:file-download-outline" class="mr-2" height="20px" />
            Descargar conciliación
          </v-btn>
        </v-col>
      </v-row>

      <div>
        <span class="text-subtitle-2">Contraseña: </span><strong>{{ order.password }}</strong><br>
        <span class="text-subtitle-2">Preset: </span><strong>{{ order.preset }} kg</strong>
      </div>

      <v-row class="mt-4">
        <v-col cols="12" md="3">
          <p class="text-subtitle-2">Fecha Entrada: </p>
          <p class="text-body-2"> <strong>{{ formatDate(order.dateReceived?.toISOString()) }}</strong></p>
        </v-col>
        <v-col cols="12" md="3">
          <p class="text-subtitle-2">Fecha Fin:</p>
          <p class="text-body-2"> <strong>{{ formatDate(order.dateFinalWeighing?.toISOString()) }}</strong></p>
        </v-col>
      </v-row>
    </div>

    <div class="mb-4">
      <v-row class="mt-4" dense>
        <!-- Cliente -->
        <v-col cols="12" md="3" class="pa-2">
          <div class="custom-box borde">
            <div class="d-flex align-center mb-3">
              <Icon icon="mdi-account" class="mr-2" height="20px"/>
              <h3>Cliente</h3>
            </div>
            <span>id: <strong>{{ order.client.id }}</strong></span>
            <span>Nombre: <strong>{{ order.client.companyName }}</strong></span>
          </div>
        </v-col>

        <!-- Camión -->
        <v-col cols="12" md="3" class="pa-2">
          <div class="custom-box borde">
            <div class="d-flex align-center mb-3">
              <Icon icon="mdi:tanker-truck" class="mr-2" height="20px"/>
              <h3>Camión</h3>
            </div>
            <span>id: <strong>{{ order.truck.id }}</strong></span>
            <span>Placa: <strong>{{ order.truck.plate }}</strong></span>
            <span>Tara: <strong>{{ order.tare }} kg</strong></span>
            <span>Peso final: <strong>{{ order.finalWeight }} kg</strong></span>
          </div>
        </v-col>

        <!-- Chofer -->
        <v-col cols="12" md="3" class="pa-2">
          <div class="custom-box borde">
            <div class="d-flex align-center mb-3">
              <Icon icon="mdi:steering" class="mr-2" height="20px"/>
              <h3>Chofer</h3>
            </div>
            <span>id: <strong>{{ order.driver.id }}</strong></span>
            <span>Nombre: <strong>{{ order.driver.name }}</strong></span>
            <span>Teléfono: <strong>{{ order.driver.lastname }}</strong></span>
            <span>Documento: <strong>{{ order.driver.document }}</strong></span>
          </div>
        </v-col>

        <!-- Producto -->
        <v-col cols="12" md="3" class="pa-2">
          <div class="custom-box borde">
            <div class="d-flex align-center mb-3">
              <Icon icon="mdi:package-variant-closed" class="mr-2" height="20px"/>
              <h3>Producto</h3>
            </div>
            <span>id: <strong>{{ order.product.id }}</strong></span>
            <span>Nombre: <strong>{{ order.product.name }}</strong></span>
            <span>Temperatura máxima: <strong>{{ order.product.limit_temperature }} °C</strong></span>
          </div>
        </v-col>
      </v-row>
    </div>

    <!-- Fechas -->
    <div v-if="order" class="borde mb-8">
      <h3 class="mb-3">Historial de fechas</h3>
      <div class="progress-bar">
        <div
          v-for="(item, index) in timeline"
          :key="index"
          class="progress-step mr-3"
          :class="{ active: item.date && item.date !== 'N/A' }">
    
          <!-- Etiqueta del paso -->
          <span class="step-label mb-5">{{ item.label }}</span>

          <!-- Línea de progreso -->
          <div class="step-line mt-2"></div>

          <!-- Fecha del paso -->
          <span class="step-date">
            {{ item.date && item.date !== '' ? item.date : 'N/A' }}
          </span>
        </div>
      </div>
    </div>

    <!-- Alertas -->
    <v-row class="mb-5 mr-1 ml-1" v-if="alerts.length > 0">
      <v-col class="borde">
        <div class="d-flex align-center mb-3">
          <Icon icon="mdi-alert-outline" class="mr-2" height="20px"/>
          <h3>Alertas registradas</h3>
        </div>

        <div
          v-for="(alert, index) in alerts"
          :key="index"
          class="alert-item"
          :class="{ resolved: alert.status === 'RESOLVED', pending: alert.status === 'PENDING', critical: alert.status === 'CRITICAL' }" >
          <div class="d-flex justify-space-between align-center">
            <span><strong>Fecha de registro: </strong>{{ formatDate(alert.dateOccurrence) }}</span>
            <span class="alert-status" :class="{ resolved: alert.status === 'RESOLVED', pending: alert.status === 'PENDING', }">
              {{ alert.status === 'RESOLVED' ? 'Resuelta' : alert.status === 'PENDING' ? 'Pendiente' : 'Crítica' }}
            </span>

          </div>

          <p v-if="alert.dateResolved" class="alert-resolved d-flex align-center mt-2 mb-2">
            <Icon icon="mdi:checkbox-marked-outline" class="mr-2" height="20px"/>
            <strong>Resuelta el: </strong>{{ formatDate(alert.dateResolved) }}
          </p>

          <p class="alert-description mt-2 mb-2"><strong>Descripción:</strong> {{ alert.observation }}</p>
          <p class="alert-temp mt-2 mb-2"><strong>Temperatura:</strong> {{ alert.temperature }}°C</p>

          <div v-if="alert.userName">
            <p class="alert-user mt-2 mb-2"><strong>Registrado por:</strong> {{ alert.userName }}</p>
          </div>
        </div>
          
      </v-col>
    </v-row>

    <!-- Datos de carga -->
    <v-row class="mb-5 mr-1 ml-1 mb-15">
      <v-col class="mr-3 borde">
        <h3 class="mb-3">Datos de carga</h3>
        <p class="mb-3">Fecha de inicio de carga: {{ order.dateInitialCharge ? formatDate(order.dateInitialCharge.toISOString()) : 'N/A' }}</p>

        <v-table class="border-table">
          <thead class="header-table">
            <tr>
              <th class="text-left"><strong>Parámetro de carga</strong></th>
              <th class="text-left"><strong>Valor</strong></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in parameters" :key="item.label" >
              <td>{{ item.label }}</td>
              <td>{{ item.value }}</td>
            </tr>
            <tr>
              <td class="text-right"> <strong>Fecha final de carga:</strong></td>
              <td>{{ order.dateFinalCharge ? formatDate(order.dateFinalCharge.toISOString()) : 'N/A' }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-col>

      <v-col class="borde" cols="4">
        <div class="d-flex align-center mb-3">
          <Icon icon="mdi:clipboard-text-multiple-outline" class="mr-2" height="20px"/>
          <h3>Información de último registro</h3>
        </div>
            
        <div class="custom-box">
          <!-- <p>Peso Final de Carga: <strong>{{ order.finalChargeWeight }} kg</strong></p> -->
          <p>Última Masa Acumulada: <strong>{{ order.lastAccumulatedMass }} kg</strong></p>
          <p>Última Densidad: <strong>{{ order.lastDensity }} g/cm³</strong></p>
          <p>Última Temperatura: <strong>{{ order.lastTemperature }}°C</strong></p>
          <p>Último Caudal: <strong>{{ order.lastCaudal }} g/s</strong></p>
          <p>Última Fecha carga: <strong>{{ order.lastTimestamp ? formatDate(order.lastTimestamp.toISOString()) : 'N/A' }}</strong></p>
        </div>
      </v-col>
    </v-row>

        <!-- <LoadingTruck class="borde load" v-bind:preset=5000 /> -->
  </div>
</template>

<style scoped>
.header-table{
  background-color: #1f1f1f;
  color: #cecece;
}
.border-table{
  border: 2px solid #e5e7eb;
  border-radius: 20px;
}
.border-table th,
.border-table td {
  border-right: 1px solid #ddd;
}

.border-table th:last-child,
.border-table td:last-child {
  border-right: none;
}

.border-table {
  border-collapse: collapse;
  width: 100%;
}

.borde{
  border: 1px solid var(--v-theme-light-line);
  background-color: var(--v-theme-light-background);
  padding: 1rem;
  border-radius: 10px;
}

.load {
  width: 100%;
  height: 9rem;
  margin-bottom: 10rem;
}

.custom-box {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

h3 {
  font-weight: bold;
}

.text-right {
  text-align: right;
}

/* probando */
.progress-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
}

.step-label {
  margin-bottom: 8px;
  font-size: 14px;
}

.step-line {
  height: 5px;
  width: 100%;
  background-color: #e0e0e0;
  position: absolute;
  top: 18px;
  z-index: 1;
}

.progress-step.active .step-line {
  background-color: var(--v-theme-light-blue);
}

.progress-step.active .step-label {
  color: var(--v-theme-light-blue);
}

.alert-item {
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  background: #f9f9f9;
  border-left: 5px solid #ffcc00;
}

.alert-item.resolved {
  border-left: 5px solid #4caf50;
}

.alert-item.pending {
  border-left: 5px solid #ffcc00;
}

.alert-status {
  padding: 0.3rem 0.6rem;
  border-radius: 5px;
  font-size: 0.9rem;
}

.alert-status.pending {
  background-color: #ffcc00;
  color: #000;
}

.alert-status.resolved {
  background-color: #4caf50;
  color: #fff;
}
</style>