<script lang="ts" setup>
import { ref } from 'vue';

const series = ref([
  {
    data: [
      { x: 'New Delhi', y: 218 },
      { x: 'Kolkata', y: 149 },
      { x: 'Mumbai', y: 184 },
      { x: 'Ahmedabad', y: 55 },
      { x: 'Bangaluru', y: 84 },
      { x: 'Pune', y: 31 },
      { x: 'Chennai', y: 70 },
      { x: 'Jaipur', y: 30 },
      { x: 'Surat', y: 44 },
      { x: 'Hyderabad', y: 68 },
      { x: 'Lucknow', y: 28 },
      { x: 'Indore', y: 19 },
      { x: 'Kanpur', y: 29 },
    ],
  },
]);

const chartOptions = ref({
  legend: {
    show: false,
  },
  chart: {
    type: 'treemap',
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
});
</script>

<template>
  <div>
    <h3>Productos pedidos</h3>
    <apexchart
      type="treemap"
      height="300"
      width="900"
      :options="chartOptions"
      :series="series"
      class="my-card pl-2 pr-2"
    />
  </div>
</template>

<style scoped>
.my-card {
  border: 1px solid #cfcfcf;
  border-radius: 5px;
}
</style>