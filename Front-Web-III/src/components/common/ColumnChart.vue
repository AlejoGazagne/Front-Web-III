<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { fetchCountAllClients } from '@/services/orderService';

// Colores utilizados en el gráfico
const colors = [
  '#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0',
  '#546E7A', '#26A69A', '#D10CE8'
];

// Datos del gráfico
const series = ref([
  {
    data: [],
  },
]);

// Opciones de configuración del gráfico
const chartOptions = ref({
  chart: {
    height: 300,
    type: 'bar',
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
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
      
    ],
    labels: {
      style: {
        colors: colors,
        fontSize: '12px',
      },
    },
  },
});

const updateSeries = async () => {
  try {
    const data = await fetchCountAllClients();
    
    for (const client of data) {
      series.value[0].data.push(client.count);
      chartOptions.value.xaxis.categories.push(client.clientName);
    }

  } catch (error) {
    console.error('Error al actualizar el gráfico de columnas:', error);
  }
}

onMounted(() =>{
  updateSeries();
});
</script>

<template>
  <div>
    <h3 class="text-h5">Clientes con más ordenes</h3>
    <apexchart type="bar" height="300" :options="chartOptions" :series="series" class="my-card"></apexchart>
  </div>
</template>

<style scoped>
.my-card {
  border: 1px solid #cfcfcf;
  border-radius: 5px;
}
</style>