<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Client } from "@stomp/stompjs";

const props = defineProps({
  preset: {
    type: Number,
    required: true,
  },
});

const currentLoad = ref(0);
const percentageLoad = ref((currentLoad.value / props.preset)*100);

let client;

// onMounted(() => {
//   client = new Client({
//     brokerURL: "http://localhost:8080/realtime-truck-load", // Replace with your backend WebSocket endpoint
//     connectHeaders: {},
//     debug: function (str) {
//       console.log(str);
//     },
//     reconnectDelay: 5000,
//     heartbeatIncoming: 4000,
//     heartbeatOutgoing: 4000,
//   });

//   client.onConnect = () => {
//     // console.log("Connected to WebSocket");
//     client.subscribe("/topic/truckLoad", (message) => {
//       const data = JSON.parse(message.body);
//       currentLoad.value = data.currentLoad;
//     });
//   };

//   client.activate();
// });

// onUnmounted(() => {
//   if (client) client.deactivate();
// });

</script>

<template>
  <div>
    <h3>Loading Truck</h3>
    <div class="bar-container">
      <div
        class="bar"
        :style="{ width: `${(currentLoad / preset) * 100}%` }"
      ></div>
    </div>
    <p>Porcentaje carga: {{ percentageLoad }} %</p>
  </div>
</template>

<style scoped>
.bar-container {
  width: 100%;
  height: 20px;
  background: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  margin: 10px 0;
}
.bar {
  height: 100%;
  background: #76c7c0;
  transition: width 0.5s ease;
}
h3 {
  font-weight: bold;
}
</style>