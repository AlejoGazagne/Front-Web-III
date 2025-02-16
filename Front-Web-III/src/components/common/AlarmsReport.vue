<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { theme } from '@/assets/theme';
import { fetchAlertsCountByMonth } from '@/services/alarmService';

const chartOptions1 = computed(() => {
  return {
    chart: {
      type: 'bar',
      height: 360,
      fontFamily: `inherit`,
      foreColor: theme.colors.secondary,
      offsetY: 20,
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      bar: {
        columnWidth: '30%',
        borderRadius: 4
      }
    },
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    colors: [theme.colors.warning, theme.colors.primary, theme.colors.secondary, theme.colors.option3, theme.colors.option5,
      theme.colors.option6, theme.colors.option8, theme.colors.option9, theme.colors.option10
    ],
    stroke: {
      curve: 'smooth',
      width: 6,
      colors: ['transparent']
    },
    fill: {
      opacity: 1
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      markers: {
        width: 15,
        height: 15
      }
    },
    grid: {
      borderColor: theme.colors.lightBorder
    },
    tooltip: {
      fixed: {
        enabled: false
      }
    },
  };
});

// chart 1
const barChart1 = ref({
  series: [
    {
      name: '',
      data: []
    },
  ]
});

// Función para procesar los datos del backend
const processChartData = (data: any[]) => {
  return data.map(product => ({
    name: product.productName, // Nombre del producto
    data: product.data.map((monthData: any) => monthData.totalAlarms) // Total de alarmas por mes
  }));
};

// Cargar datos al montar el componente
onMounted(async () => {
  try {
    const alertsCountByMonth = await fetchAlertsCountByMonth();

    // Procesar datos y actualizar gráfico
    barChart1.value.series = processChartData(alertsCountByMonth);
    //console.log('Datos procesados para ApexCharts:', barChart1.value.series);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
});

</script>

<template>
  <v-card class="title-card custom-card" variant="text" rounded="md">
    <v-card-item class="pb-2 px-0 pt-0">
      <div class="d-flex justify-space-between">
        <v-card-title class="text-h5">Reporte de alertas</v-card-title>
      </div>
    </v-card-item>
    <v-card-text variant="outlined" class="rounded-md">
      <apexchart type="bar" height="360" class="salesReport" :options="chartOptions1" :series="barChart1.series"> </apexchart>
    </v-card-text>
  </v-card>
</template>
<style scoped>
.salesReport {
  margin-top: -50px;
  .apexcharts-legend {
    .apexcharts-legend-series {
      display: flex !important;
      align-items: center;
    }
  }
}
.probando {
  width: 100%;
  padding: 0;
}
.custom-card{
  border: 1px solid var(--v-theme-light-line);
  background-color: var(--v-theme-light-background);
  padding: 1rem;
  border-radius: 10px;
  width: 100%;
}
</style>