<template>
    <v-container>
      <div class="p-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="[externalId, updates] in sortedOrders" :key="externalId" class="bg-white shadow-lg p-4 rounded mb-4">
            <h3 class="font-semibold text-lg mb-2">Orden #{{ externalId }}</h3>
              <ul class="text-sm">
                <li v-for="(update, index) in updates" :key="index" class="mb-2" style="list-style-type: none;">
                  <strong>Masa:</strong> {{ update.accumulatedMass }} kg <br />
                  <strong>Caudal:</strong> {{ update.caudal }} L/s <br />
                  <strong>Temperatura:</strong> {{ update.temperature }} °C <br />
                  <strong>Fecha:</strong> {{ formatDate(update.timestampLoad) }} <br />
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

    const props = defineProps({
      orderId: Number,
      currentMass: {
        type:Number,
      },
    });
    const handleMessage = (message) => {
      console.log("sexo9");
      console.log(message);
      console.log(message.externalId);
      console.log(message.orderId);
      console.log("sexo10");
      try {
        const externalId = message.externalId;
        console.log("aber");
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

    onMounted(() => {
      subscribe(topicOrder, handleMessage);

    });

    // Convert object to an array for rendering
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

       /*onUnmounted(() => {
      unsubscribe(topic);
    });*/
  </script>
  
  <style>
  body {
    font-family: Arial, sans-serif;
  }
  </style>