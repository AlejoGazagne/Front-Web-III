<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { fetchProductsCount } from '@/services/orderService';

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
  <div>
    <h3 class="text-h5">Productos más pedidos</h3>
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