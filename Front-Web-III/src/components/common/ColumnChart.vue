<script lang="ts" setup>
import { ref } from 'vue';

// Colores utilizados en el gráfico
const colors = [
  '#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0',
  '#546E7A', '#26A69A', '#D10CE8'
];

// Datos del gráfico
const series = ref([
  {
    data: [21, 22, 10, 28, 16, 21, 13, 30],
  },
]);

// Opciones de configuración del gráfico
const chartOptions = ref({
  chart: {
    height: 300,
    type: 'bar',
    toolbar: {
      show: false, // Esto desactiva el menú contextual
    },
    zoom: {
      enabled: false, // Esto desactiva el zoom
    },
  },
  colors: colors,
  plotOptions: {
    bar: {
      columnWidth: '40%',
      distributed: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  xaxis: {
    categories: [
      ['John', 'Doe'],
      ['Joe', 'Smith'],
      ['Jake', 'Williams'],
      'Amber',
      ['Peter', 'Brown'],
      ['Mary', 'Evans'],
      ['David', 'Wilson'],
      ['Lily', 'Roberts'],
    ],
    labels: {
      style: {
        colors: colors,
        fontSize: '12px',
      },
    },
  },
});
</script>

<template>
  <div>
    <h3>Clientes con más ordenes</h3>
    <apexchart type="bar" height="300" :options="chartOptions" :series="series" class="my-card"></apexchart>
  </div>
</template>

<style scoped>
.my-card {
  border: 1px solid #cfcfcf;
  border-radius: 5px;
}
</style>