<script lang="ts" setup>
import Header from '@/components/layout/Header.vue';
import Menu from '@/components/layout/Menu.vue';
import LoadingTruck from '@/components/common/LoadingTruck.vue';

import { computed, ref, onMounted, watch } from 'vue';
import { useOrdersStore } from '@/stores/useOrdersStore';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const ordersStore = useOrdersStore();
const idOrder = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;

// Computed property que obtiene la orden del store
const order = computed(() => ordersStore.getOrderById(idOrder));

// Inicializar detalles de la orden vacío
const detailsOrder = ref(null);

onMounted(async () => {
  if (!order.value) {
    // Obtener la orden del backend y actualizar el store
    await ordersStore.fetchById(idOrder);
  }
  const fetchedDetails = await ordersStore.fetchDetailOrder(idOrder);
  detailsOrder.value = fetchedDetails;
});

const getStatusColor = (status: string) => {
  switch (status) {
    case 'RECEIVED':
      return 'blue';
    case 'FIRST_WEIGHING':
      return 'yellow';
    case 'CHARGED':
      return 'orange';
    case 'FINAL_WEIGHING':
      return 'green';
    default:
      return 'grey';
  }
};

// Formatear las fechas
const formatDate = (date: string | null | undefined) => {
  if (!date) return 'N/A';
  const parsedDate = new Date(date);
  return parsedDate.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

// Inicializar timeline vacío
const timeline = ref<{ label: string; date: string }[]>([]);

// Observar cambios en order y actualizar timeline
watch(
  order,
  (newOrder) => {
    if (newOrder) {
      timeline.value = [
        { label: 'Recepción', date: formatDate(newOrder.dateReceived.toISOString()) },
        { label: 'Primer Pesaje', date: formatDate(newOrder.dateFirstWeighing.toISOString()) },
        { label: 'Carga Inicial', date: formatDate(newOrder.dateInitialCharge.toISOString()) },
        { label: 'Carga Final', date: formatDate(newOrder.dateFinalCharge.toISOString()) },
        { label: 'Pesaje Final', date: formatDate(newOrder.dateFinalWeighing.toISOString()) },
      ];
    } else {
      timeline.value = [];
    }
  },
  { immediate: true } // Para actualizar inmediatamente al montar el componente
);

const parameters = ref<{ label: string; value: number }[]>([]);

watch(detailsOrder, (newDetailsOrder) => {
  if (newDetailsOrder) {
    parameters.value = [
      { label: 'Densidad promedio', value: Number(newDetailsOrder.avgDensity) },
      { label: 'Temperatura promedio', value: Number(newDetailsOrder.avgTemperature) },
      { label: 'Caudal promedio', value: Number(newDetailsOrder.avgCaudal) },
    ];
  } else {
    parameters.value = [];
  }
});

// Función para navegar a la página de inicio
const goHome = () => {
  router.push('/');
};

</script>

<template>
  <v-app>
    <v-app-bar app clipped >
      <Header />
    </v-app-bar>
    
    <Menu />

    <!-- Contenido principal -->
    <v-main class="mt-10 ml-15 mr-15">
      <v-row class="mb-6 align-center">
        <v-btn height="50px" class="mr-6" @click="goHome">
          <Icon icon="material-symbols:arrow-back-rounded" height="24px" />
        </v-btn>
        <p class="text-green">Order / Order Details</p>
      </v-row>

      <div v-if="order">
        <div class="border">
        <v-row class="align-center justify-space-between mb-3">
          <v-col cols="12" md="6" lg="8">
            <h3 class="mb-1">Order# {{ order.id }}</h3>
            <v-chip :color="getStatusColor(order.status)" text-color="white" tile>
              {{ order.status }}
            </v-chip>
          </v-col>

          <v-col cols="12" md="6" lg="4" class="text-right">
            <v-btn color="green" dark>
              <Icon icon="mdi:file-download-outline" class="mr-2" height="20px" />
              Descargar conciliación
            </v-btn>
          </v-col>
        </v-row>

        <div>
          <p><strong>Contraseña:</strong> {{ order.password }}</p>
          <p><strong>Preset:</strong> {{ order.preset }}</p>
        </div>

        <v-row class="mt-4">
          <v-col cols="12" md="3">
            <p class="text-subtitle-2">Fecha Entrada: </p>
            <p class="text-body-1">{{ formatDate(order.dateReceived?.toISOString()) }}</p>
          </v-col>
          <v-col cols="12" md="3">
            <p class="text-subtitle-2">Fecha Fin:</p>
            <p class="text-body-1"> {{ formatDate(order.dateFinalWeighing?.toISOString()) }}</p>
          </v-col>
          <!-- <v-col cols="12" md="3">
            <p class="text-subtitle-2">Updated:</p>
            <p class="text-body-1">2024-02-13, 12:56</p>
          </v-col> -->
        </v-row>
      </div>

      <div class="mb-4">
        <v-row class="mt-4" dense>
      <!-- Cliente -->
      <v-col cols="12" md="3" class="pa-2">
        <div class="custom-box border">
          <h3 class="mb-3">Cliente</h3>
          <p><strong>id: </strong>{{ order.client.id }}</p>
          <p><strong>Nombre: </strong>{{ order.client.companyName }}</p>
        </div>
      </v-col>

      <!-- Camión -->
      <v-col cols="12" md="3" class="pa-2">
        <div class="custom-box border">
          <h3 class="mb-3">Camión</h3>
          <p><strong>id: </strong>{{ order.truck.id }}</p>
          <p><strong>Placa: </strong>{{ order.truck.plate }}</p>
          <p><strong>Tara: </strong>{{ order.tare }} <span>kg</span></p>
          <p><strong>Peso final: </strong>{{ order.finalWeight }} <span>kg</span></p>
        </div>
      </v-col>

      <!-- Chofer -->
      <v-col cols="12" md="3" class="pa-2">
        <div class="custom-box border">
          <h3 class="mb-3">Chofer</h3>
          <p><strong>id: </strong>{{ order.driver.id }}</p>
          <p><strong>Nombre: </strong>{{ order.driver.name }}</p>
          <p><strong>Teléfono: </strong>{{ order.driver.lastname }}</p>
          <p><strong>Documento: </strong>{{ order.driver.document }}</p>
        </div>
      </v-col>

      <!-- Producto -->
      <v-col cols="12" md="3" class="pa-2">
        <div class="custom-box border">
          <h3 class="mb-3">Producto</h3>
          <p><strong>id: </strong>{{ order.product.id }}</p>
          <p><strong>Nombre: </strong>{{ order.product.name }}</p>
          <p><strong>Temperatura máxima: </strong>{{ order.product.limit_temperature }} <span>°C</span></p>
        </div>
      </v-col>
    </v-row>
      </div>

      <!-- FECHAS -->
      <div v-if="order">
        <div class="mb-10 border">
          <h3 class="mb-4">Historial de fechas</h3>
          <v-timeline direction="horizontal">
            <v-timeline-item v-for="(item, index) in timeline" :key="index">
              <template v-slot:opposite>
                <strong>{{ item.label }}</strong>
              </template>
              <div>
                {{ item.date }}
              </div>
            </v-timeline-item>
          </v-timeline>
        </div>
      </div>

      <!-- Datos de carga -->
        <v-row class="mb-10">
          <v-col class="mr-3 border">
            <h3 class="mb-3">Datos de carga</h3>
            <p class="mb-3">Fecha de inicio de carga: {{ formatDate(order.dateInitialCharge.toISOString()) }}</p>

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
                  <td>{{ formatDate(order.dateFinalCharge.toISOString()) }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-col>

          <v-col class="border" cols="4">
            
            <h3 class="mb-4">Información de último registro</h3>
            
            <div class="custom-box">
              <p><strong>Peso Final de Carga: </strong>{{ order.finalChargeWeight }}</p>
              <p><strong>Última Masa Acumulada: </strong>{{ order.lastAccumulatedMass }}</p>
              <p><strong>Última Densidad: </strong>{{ order.lastDensity }}</p>
              <p><strong>Última Temperatura: </strong>{{ order.lastTemperature }}</p>
              <p><strong>Último Caudal: </strong>{{ order.lastCaudal }}</p>
              <p><strong>Última Fecha carga: </strong>{{ formatDate(order.lastTimestamp.toISOString()) }}</p>
            </div>
          </v-col>
        </v-row>

        <LoadingTruck class="border load" v-bind:preset=5000 />
      </div>
      
    </v-main>
  </v-app>
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
  border-right: 1px solid #ddd; /* Línea divisoria */
}

.border-table th:last-child,
.border-table td:last-child {
  border-right: none; /* Quitar el borde de la última columna */
}

.border-table {
  border-collapse: collapse; /* Asegurar que las líneas sean consistentes */
  width: 100%;
}

.border{
  border: 2px solid #e5e7eb;
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

.text-subtitle-2 {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.2rem;
}

.text-body-1 {
  font-size: 1rem;
  font-weight: bold;
}
</style>