<template>
  <div>
    <h2 class="mb-2">Ordenes</h2>
    <div class="border">
      <apexchart
        type="donut"
        height="380"
        :options="chartOptions"
        :series="series"
      />
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
  
// Datos para el gráfico
const series = ref([44, 55, 13, 43]); // Porcentajes de cada segmento
const chartOptions = ref({
    chart: {
      width: 380,
      type: 'donut',
    },
    labels: ['Apple', 'Mango', 'Banana', 'Pineapple'], // Etiquetas de cada segmento
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
    colors: ['#b62100', '#078f02', '#00177e', '#00a5b1'], // Colores de los segmentos
    legend: {
      position: 'bottom',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '60%', // Ajusta el tamaño del agujero del donut
        },
      },
    },
  });
</script>
  
<style scoped>
.border{
  border: 1px solid #000000;
  border-radius: 5px;
}
.probando{
  background-color: #b62100;
  background-color: #078f02;
  background-color: #00177e;
  background-color: #00a5b1;
}
</style>