<script setup>
  import { ref, onMounted, onUnmounted, computed } from "vue";
  import { subscribe, unsubscribe } from "@/services/wsService.ts";
  import ProgressBar from "@/components/common/ProgressBar.vue";
  import { useOrdersStore } from "@/stores/useOrdersStore";
  import { formatDate } from "@/utils/formatDate";

  const data = ref(null);
  const topicData = "/topic/loadTruck/data";
  const topicOrder = "/topic/loadTruck";

  const ordersStore = useOrdersStore();

  const countdowns = ref({});
  const orders = ref({});
  const expandByIndex = ref({});
  const expandedOrder = ref({});
  const sortedOrders = computed(() => Object.entries(orders.value));

  const props = defineProps({
    orderId: Number,
    currentMass: {
      type:Number,
    },
  });

  const handleMessage = (message) => {
    try {
      const externalId = message.externalId;
      if (!orders.value[externalId]) {
        orders.value[externalId] = [];
      }
      const existingOrderIndex = orders.value[externalId].findIndex(order => order.externalId === message.externalId);
      if (existingOrderIndex !== -1) {
        orders.value[externalId][existingOrderIndex] = message;
      } else {
        orders.value[externalId].push(message);
      }

      updateCountdown(externalId, message);
    } catch (error) {
      console.error("Error parsing WebSocket message:", error);
    }
  };

  onMounted(() => {
    subscribe(topicOrder, handleMessage);
  });

  const viewMore = async (externalId, index) => {
    if (expandByIndex.value[externalId] === index) {
      delete expandByIndex.value[externalId];
      delete expandedOrder.value[externalId];
      return;
    }

    expandByIndex.value[externalId] = index;
    expandedOrder.value[externalId] = null;

    try {
      const response = await ordersStore.fetchById(externalId);
      expandedOrder.value[externalId] = response;
      updateCountdown(externalId, orders.value[externalId][index]);
    } catch (error) {
      console.error("Error fetching order details:", error);
      expandedOrder.value[externalId] = { error: "Failed to load details" };
    }
  };

  // const calculateETA = (order, loadData) => {
  //   if (!order || !loadData) {
  //     return "N/A";
  //   }

  //   const remainingMass = order.preset - loadData.accumulatedMass;
  //   const remainingTime = remainingMass / loadData.caudal;
  //   const currentTimestamp = new Date(loadData.timestampLoad);
  //   const eta = new Date(currentTimestamp.getTime() + remainingTime * 1000);

  //   return eta;
  // };

// Función para calcular y actualizar el cronómetro
const updateCountdown = (externalId, loadData) => {
  if (!expandedOrder.value[externalId] || !loadData) {
    countdowns.value[externalId] = "N/A";
    return;
  }

  const order = expandedOrder.value[externalId];
  const remainingMass = order.preset - loadData.accumulatedMass;
  const remainingTime = Math.max(remainingMass / loadData.caudal, 0);

  // Guardar el tiempo restante en segundos
  countdowns.value[externalId] = Math.floor(remainingTime);
};

// Función para actualizar cada segundo los contadores
const startCountdown = () => {
  setInterval(() => {
    Object.keys(countdowns.value).forEach((externalId) => {
      if (countdowns.value[externalId] > 0) {
        countdowns.value[externalId]--;
      }
    });
  }, 1000);
};

const formatCountdown = (seconds) => {
  return seconds > 0 ? formatTime(seconds) : "Finalizado";
};

onMounted(startCountdown)
</script>

<template>
    <div class="p-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" style="width:85%;">
        <div v-if="sortedOrders.length === 0" class="ml-3 text-lg text-gray-500">
          No hay registro de camiones que se estén cargando.
        </div>
          <div v-for="[externalId, updates] in sortedOrders" :key="externalId" class="bg-white shadow-lg p-4 rounded-lg mb-4">
          <h3 class="text-h6 mb-2 pt-2 pl-2 pr-2 border-b-lg border-info border-opacity-75 font-weight-black font-italic text-decoration-underline" style="text-align: center;">Orden #{{ externalId }}</h3>
            <ul class="text-sm">
              <li v-for="(update, index) in updates" :key="index" class="mb-2" style="list-style-type: none;">
                <strong class="ml-6 mdi mdi-circle" style="font-size: medium;"> Masa:</strong> <span>{{ update.accumulatedMass }} kg</span> <br />
                <strong class="ml-6 mdi mdi-pipe" style="font-size: medium;"> Caudal:</strong> <span>{{ update.caudal }} L/s</span> <br />
                <strong class="ml-6 mdi mdi-thermometer" style="font-size: medium;"> Temperatura:</strong> <span>{{ update.temperature }} °C</span> <br />
                <strong class="ml-6 mdi mdi-calendar" style="font-size: medium;"> Fecha actual:</strong> <span>{{ formatDate(update.timestampLoad) }}</span> <br />
                <div><strong class="mdi-timer mdi">Tiempo de finalización aproximado:</strong> <span>{{ formatCountdown(countdowns[externalId]) }}</span> </div>
                
                <v-btn small class="ml-6 mt-2" color="primary" @click="viewMore(update.externalId, index)">
                  {{ expandByIndex[externalId] === index ? "Quitar detalles" : "Ver Más" }}
                </v-btn>

                <div v-if="expandByIndex[externalId] === index" class="mt-2 ml-6">
                    <div style="display: flex; flex-direction: column;">
                    <div style="display: flex; justify-content: space-around; margin-bottom: 10px;">
                      <div>
                      <strong class="mdi mdi-domain"> Cliente:</strong>
                      <li class="ml-6" style="list-style-type: disc;">
                        <strong> Nombre:</strong> <span>{{ expandedOrder[externalId]?.client.companyName || "N/A" }}</span>
                      </li>
                      </div>
                      <div>
                      <strong class="mdi mdi-truck"> Camión:</strong>
                        <ul class="ml-6">
                          <li style="list-style-type: disc;">
                            <strong>Patente:</strong> <span>{{ expandedOrder[externalId]?.truck.plate || "N/A" }}</span>
                          </li>
                          <li style="list-style-type: disc;">
                            <strong>Conductor:</strong> <span>{{ expandedOrder[externalId]?.driver.name || "N/A" }} {{ expandedOrder[externalId].driver.lastname }}</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <strong class="mdi mdi-package"> Producto:</strong>
                        <ul class="ml-6">
                          <li style="list-style-type: disc;">
                            <strong>Nombre:</strong> <span>{{ expandedOrder[externalId]?.product.name || "N/A" }}</span>
                          </li>
                          <li style="list-style-type: disc;">
                            <strong>Temperatura Límite:</strong> <span>{{ expandedOrder[externalId]?.product.limit_temperature || "N/A" }}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    </div>
                <br />
                  
                </div>
                <v-card-text>
                  <ProgressBar :currentMass="update.accumulatedMass" :externalId="update.externalId" />
                </v-card-text>
              </li>
            </ul>
          </div>
      </div>
    </div>
</template>

<style>
</style>