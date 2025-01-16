<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { fetchCountAllClients } from '@/services/orderService';
import { theme } from '@/assets/theme';

// Colores utilizados en el gráfico
const colors = [
  theme.colors.option3, theme.colors.option4, theme.colors.option5, theme.colors.option6,
  theme.colors.option7, theme.colors.option8, theme.colors.option9, theme.colors.option10
];

// Datos del gráfico
const series = ref<{ data: number[] }[]>([
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
    categories: [] as string[],
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
  <div class="custom-card">
    <h3 class="text-h5">Clientes con más ordenes</h3>
    <apexchart type="bar" height="300" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<style scoped>
.custom-card{
  border: 1px solid var(--v-theme-light-line);
  background-color: var(--v-theme-light-background);
  padding: 1rem;
  border-radius: 10px;
}
</style>