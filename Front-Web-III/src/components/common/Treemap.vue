<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { fetchProductsCount } from '@/services/orderService';
import { theme } from '@/assets/theme';

const series = ref([
  {
    data: [
      { x: 'No data', y: 1 }
    ],
  },
]);

const chartOptions = ref({
  legend: {
    show: false,
  },
  colors: [ theme.colors.option2 ],
  chart: {
    type: 'treemap',
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: true,
    style: {
      colors: ['#081324'], // Definir el color del texto como negro
    },
  },
});

const updateSeries = async () => {
  try {
    const data = await fetchProductsCount();
    const tmp = [];
    
    for (const product of data) {
      tmp.push({
        x: product.productName,
        y: product.count,
      });
    }
    
    series.value = [{ data: tmp }];
  } catch (error) {
    console.error('Error al actualizar el treemap:', error);
  }
}

onMounted(() => {
  updateSeries();
});
</script>

<template>
  <div class="custom-card">
    <h3 class="text-h5">Productos más pedidos</h3>
    <apexchart
      type="treemap"
      height="300"
      :options="chartOptions"
      :series="series"
      class="pl-2 pr-2"
    />
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