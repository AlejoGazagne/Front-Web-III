<script lang="ts" setup>
import Header from '@/components/layout/Header.vue';
import Menu from '@/components/layout/Menu.vue';
import LoadingTruck from '@/components/common/LoadingTruck.vue';
import { computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useOrdersStore } from '@/stores/useOrdersStore';

const route = useRoute();
const ordersStore = useOrdersStore();
const idOrder = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;

// Computed property que obtiene la orden del store
const order = computed(() => ordersStore.getOrderById(idOrder));

onMounted(async () => {
  if (!order.value) {
    console.log(`La orden con ID ${idOrder} no se encuentra en el store.`);
    console.log('Se procederá a buscar la orden en el backend.');
    try {
      // Obtener la orden del backend y actualizar el store
      const fetchedOrder = await ordersStore.fetchById(idOrder);
      if (fetchedOrder) {
        // Suponiendo que 'fetchById' devuelve la orden que deseas
        ordersStore.setOrders([fetchedOrder]); // Actualiza el store con la nueva orden
      }
    } catch (error) {
      console.error('Error al buscar la orden en el backend:', error);
    }
  }
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

// Datos de la línea de tiempo desde el backend
const timeline = ref([
  { label: 'Recepción', date: '2024-11-11 23:09:35' },
  { label: 'Primer Pesaje', date: '2024-11-11 23:15:45' },
  { label: 'Carga Inicial', date: '2024-11-11 23:18:04' },
  { label: 'Carga Final', date: '2024-11-11 23:19:40' },
  { label: 'Pesaje Final', date: '2024-11-11 23:31:50' },
]);

// Formatear las fechas
const formatDate = (date: string | null) => {
  if (!date) return 'N/A';
  const parsedDate = new Date(date);
  return parsedDate.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const parameters = ref([
  {label: 'Densidad promedio', value: '2.5'},
  {label: 'Temperatura promedio', value: '25'},
  {label: 'Caudal promedio', value: '10'},
])

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Uso de la función delay
async function exampleFunction() {
  console.log('Esperando 3 segundos...');
  await delay(3000); // Espera 3 segundos
  console.log('3 segundos han pasado.');
  console.log(order)
}

exampleFunction();
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
        <v-btn height="50px" class="mr-6">
          <Icon icon="material-symbols:arrow-back-rounded" height="24px" />
        </v-btn>
        <p class="text-green">Order / Order Details</p>
      </v-row>

      <div v-if="order && order.value">
        <div class="border">
        <v-row class="align-center justify-space-between">
          <v-col cols="12" md="6" lg="8">
            <h3 class="mb-1">Order# {{ idOrder }}</h3>
            <!-- <v-chip :color="getStatusColor(order.state)" text-color="white">
              {{ order.state }}
            </v-chip> -->
          </v-col>

          <v-col cols="12" md="6" lg="4" class="text-right">
            <v-btn color="green" dark>
              <Icon icon="mdi:file-download-outline" class="mr-2" height="20px" />
              Descargar conciliación
            </v-btn>
          </v-col>
        </v-row>

        <div>
          <p><strong>Contraseña:</strong> {{ order?.password }}</p>
          <p><strong>Preset:</strong> 1500</p>
        </div>

        <v-row class="mt-4">
          <v-col cols="12" md="3">
            <p class="text-subtitle-2">Fecha Entrada: </p>
            <p class="text-body-1">2024-02-13, 12:56</p>
          </v-col>
          <v-col cols="12" md="3">
            <p class="text-subtitle-2">Fecha Fin:</p>
            <p class="text-body-1">2024-02-13, 12:56</p>
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
          <p><strong>Nombre:</strong> Ana Nancy</p>
          <p><strong>Email:</strong> example536@gmail.com</p>
          <p><strong>Teléfono:</strong> +88016638579934</p>
        </div>
      </v-col>

      <!-- Camión -->
      <v-col cols="12" md="3" class="pa-2">
        <div class="custom-box border">
          <h3 class="mb-3">Camión</h3>
          <p><strong>Modelo:</strong> Volvo FH16</p>
          <p><strong>Placa:</strong> ABC-1234</p>
          <p><strong>Tara:</strong> 2022</p>
          <p><strong>Peso final:</strong> 2022</p>
        </div>
      </v-col>

      <!-- Chofer -->
      <v-col cols="12" md="3" class="pa-2">
        <div class="custom-box border">
          <h3 class="mb-3">Chofer</h3>
          <p><strong>Nombre:</strong> Juan Pérez</p>
          <p><strong>Licencia:</strong> #475849293</p>
          <p><strong>Teléfono:</strong> +123456789</p>
        </div>
      </v-col>

      <!-- Producto -->
      <v-col cols="12" md="3" class="pa-2">
        <div class="custom-box border">
          <h3 class="mb-3">Producto</h3>
          <p><strong>Nombre:</strong> Cemento Portland</p>
          <p><strong>Cantidad:</strong> 20 toneladas</p>
          <p><strong>Categoría:</strong> Construcción</p>
        </div>
      </v-col>
    </v-row>
      </div>

      <!-- FECHAS -->
      <div class="mb-10 border">
        <h3 class="mb-4">Hitorial de fechas</h3>
        <v-timeline direction="horizontal">
          <v-timeline-item v-for="index in timeline">
            <template v-slot:opposite>
              <strong>{{ index.label }}</strong>
            </template>
            <div>
              {{ index.date }}
            </div>
          </v-timeline-item>
        </v-timeline>
      </div>

      <!-- Datos de carga -->
        <v-row class="mb-10">
          <v-col class="mr-3 border">
            <h3 class="mb-3">Datos de carga</h3>
            <p class="mb-3">Fecha de inicio de carga: 2024-11-11 23:31:50</p>

            <v-table>
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
                  <td>2024-11-11 23:31:50</td>
                </tr>
              </tbody>
            </v-table>
          </v-col>

          <v-col class="border" cols="4">
            
            <h3 class="mb-4">Información de último registro</h3>
            
            <div class="custom-box">
              <p><strong>Peso Final de Carga:</strong> 0.0</p>
              <p><strong>Última Masa Acumulada:</strong> 15020.9</p>
              <p><strong>Última Densidad:</strong> 39.5093</p>
              <p><strong>Última Temperatura:</strong> 0.0</p>
              <p><strong>Último Caudal:</strong> 7.5696</p>
              <p><strong>Última Fecha:</strong> 2024-11-11 23:19:02</p>
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
  border: 2px solid #1f1f1f;
  border-radius: 20px;
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