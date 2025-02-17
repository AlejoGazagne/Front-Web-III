<template>
  <v-container>
    <div class="p-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" style="width:40%">
          <div v-for="[externalId, updates] in sortedOrders" :key="externalId" class="bg-white shadow-lg p-4 rounded-lg mb-4">
          <h3 class="text-h6 mb-2 pt-2 pl-2 pr-2 border-b-lg border-opacity-75 font-weight-black font-italic text-decoration-underline">Orden #{{ externalId }}</h3>
            <ul class="text-sm">
              <li v-for="(update, index) in updates" :key="index" class="mb-2" style="list-style-type: none;">
                <strong class="ml-6 text-body-1">Masa:</strong> <span class="text-body-1">{{ update.accumulatedMass }} kg</span> <br />
                <strong class="ml-6 text-body-1">Caudal:</strong> <span class="text-body-1">{{ update.caudal }} L/s</span> <br />
                <strong class="ml-6 text-body-1">Temperatura:</strong> <span class="text-body-1">{{ update.temperature }} °C</span> <br />
                <strong class="ml-6 text-body-1">Fecha actual:</strong> <span class="text-body-1">{{ formatDate(update.timestampLoad) }}</span> <br />

                <v-btn small class="ml-6 mt-2" color="primary" @click="viewMore(update.externalId, index)">
                  {{ expandedIndex === index ? "Quitar detalles" : "Ver Más" }}
                </v-btn>

                <div v-if="expandedIndex === index" class="mt-2 ml-6">
                  <strong>Patente de camión:</strong> <span>{{ expandedOrder?.truck.plate || "N/A" }}</span> <br />
                  <strong>Producto:</strong> <span>{{ expandedOrder?.product.name || "N/A" }}</span> <br />
                  <strong>Conductor:</strong> <span>{{ expandedOrder?.driver.name || "N/A" }} {{ expandedOrder?.driver.lastname || "N/A" }}</span> <br />
                  <strong>Cliente:</strong> <span>{{ expandedOrder?.client.companyName || "N/A" }}</span> <br />
                  <strong>Tiempo de finalización aproximado:</strong> <span>{{ formatDate(calculateETA(expandedOrder, update)) }}</span> <br />
                </div>
                <v-card-text>
                  <ProgressBar :currentMass="update.accumulatedMass" :externalId="update.externalId" />
                </v-card-text>
              </li>
            </ul>
          </div>
      </div>
    </div>
  </v-container>
</template>

<script setup>
  import { ref, onMounted, onUnmounted, computed } from "vue";
  import { subscribe, unsubscribe } from "@/services/wsService.ts";
  const data = ref(null);
  const topicData = "/topic/loadTruck/data";
  const topicOrder = "/topic/loadTruck";
  import ProgressBar from "@/components/common/ProgressBar.vue";
  import { useOrdersStore } from "@/stores/useOrdersStore";

  const ordersStore = useOrdersStore();

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
    } catch (error) {
      console.error("Error parsing WebSocket message:", error);
    }
  };
  const orders = ref({});
  const expandedIndex = ref(null);
  const expandedOrder = ref(null);
  onMounted(() => {
    subscribe(topicOrder, handleMessage);

  });

  const sortedOrders = computed(() => Object.entries(orders.value));
  function formatDate(timestampLoad) {
    const date = new Date(timestampLoad);
    const formattedDate = date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    });
    return formattedDate;
  }

  const viewMore = async (externalId, index) => {
    if (expandedIndex.value === index) {
      expandedIndex.value = null; // Collapse the section
      expandedOrder.value = null;
      return;
    }

    expandedIndex.value = index; // Set expanded index
    expandedOrder.value = null; // Reset data while fetching

    try {
      const response = await ordersStore.fetchById(externalId); // Wait for promise resolution
      expandedOrder.value = response; // Store the resolved object
      console.log("Expanded data:", expandedOrder.value);
    } catch (error) {
      console.error("Error fetching order details:", error);
      expandedOrder.value = { error: "Failed to load details" };
    }
  };

  const calculateETA = (order, loadData) => {
    if (!order || !loadData) {
      return "N/A";
    }

    const remainingMass = order.preset - loadData.accumulatedMass;
    const remainingTime = remainingMass / loadData.caudal;
    const currentTimestamp = new Date(loadData.timestampLoad);
    const eta = new Date(currentTimestamp.getTime() + remainingTime * 1000);
    console.log("y ahora que");
    console.log(remainingMass);
    console.log(remainingTime);
    console.log(currentTimestamp);
    console.log(eta);
    return eta;
    
  };
</script>

<style>
body {
  font-family: Arial, sans-serif;
}


</style>