<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useOrdersStore } from '@/stores/useOrdersStore';

const ordersStore = useOrdersStore();

const countOrders = computed(() => ordersStore.countOrders);
  
const series = computed(() => [
  countOrders.value?.received || 0,
  countOrders.value?.weighed || 0,
  countOrders.value?.charged || 0,
]);

const chartOptions = ref({
  chart: {
    width: 380,
    type: 'donut',
  },
  labels: ['Recibidos', 'Primer pesaje', 'Cargados'],
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
  colors: ['#b62100', '#078f02', '#00177e'],
  legend: {
    position: 'bottom',
  },
  plotOptions: {
    pie: {
      donut: {
        size: '60%',
      },
    },
  },
});

// const loadChartData = async () => {
//   try {
//     const data = await fetchCountOrders();

//   } catch (error) {
//     console.error('Error al cargar los datos del gráfico:', error);
//   }
// };

onMounted(() => {
  // loadChartData();
  ordersStore.fetchCountOrders();
});

</script>
  
<template>
  <div>
    <h2 class="mb-2 text-h5">Ordenes en curso</h2>
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