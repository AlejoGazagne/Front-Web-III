<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { fetchAllOrdersCount } from '@/services/orderService';

const primaryColor = '#4caf50';
const darkPrimaryColor = '#388e3c';
const lightBorderColor = '#e0e0e0';

const chartOptions = computed(() => ({
  chart: {
    type: 'area',
    height: 450,
    fontFamily: `inherit`,
    foreColor: '#a1aab2',
    toolbar: false,
    zoom: {
      enabled: false,
    }
  },
  colors: [primaryColor, darkPrimaryColor],
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.4,
      stops: [0, 100]
    }
  },
  grid: {
    borderColor: lightBorderColor
  },
  xaxis: {
    axisBorder: {
      show: true,
      color: lightBorderColor
    },
    axisTicks: {
      color: lightBorderColor
    }
  },
  legend: {
    show: true
  },
  tooltip: {
    theme: 'dark'
  }
}));

// Datos del gráfico
const areaChart = ref({
  series: [
    {
      name: 'Ordenes registradas',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  ]
});

const getMonthIndex = (monthName) => {
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo',
    'Junio', 'Julio', 'Agosto', 'Septiembre',
    'Octubre', 'Noviembre', 'Diciembre'
  ];
  return monthNames.indexOf(monthName);
};

const processOrderData = (data) => {
  const monthOrderCounts = Array(12).fill(0);

  data.forEach((item) => {
    const monthIndex = getMonthIndex(item.month);
    if (monthIndex !== -1) {
      monthOrderCounts[monthIndex] = item.count;
    }
  });

  return monthOrderCounts;
};

const loadChartData = async () => {
  try {
    const data = await fetchAllOrdersCount();
    const processedData = processOrderData(data);

    areaChart.value.series[0].data = processedData;
  } catch (error) {
    console.error('Error al cargar los datos del gráfico:', error);
  }
};

// Llama a la función al montar el componente
onMounted(() => {
  loadChartData();
});

const tab = ref(1);
</script>

<template>
  <v-card class="title-card" variant="text">
    <v-card-item class="pb-2 px-0 pt-0">
      <div class="d-flex justify-space-between">
        <v-card-title class="text-h5">Ordenes recibidas por mes</v-card-title>
        <div class="d-flex flex-wrap">
          <v-tabs v-model="tab" color="primary" class="tabBtn" density="compact" hide-slider>
            <v-tab value="one" class="mr-1" variant="outlined" rounded="md"> Month </v-tab>
            <!-- <v-tab value="two" variant="outlined" rounded="md"> Week </v-tab> -->
          </v-tabs>
        </div>
      </div>
    </v-card-item>
    <v-card-text class="rounded-md overflow-hidden border">
      <v-window v-model="tab">
        <v-window-item value="one">
          <apexchart type="area" height="350" :options="chartOptions" :series="areaChart.series"></apexchart>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.border{
  border: 1px solid #000000;
  border-radius: 5px;
}
</style>