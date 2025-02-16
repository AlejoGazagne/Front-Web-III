<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useAlarmStore } from '@/stores/useAlarmStore';
import { formatDate } from '@/utils/formatDate';

const alarmsStore = useAlarmStore();

// Variables reactivas
const page = ref(1);
const alarms = computed(() => alarmsStore.alerts);
const itemsPerPage = computed(() => alarmsStore.pageSize);
const totalPages = computed(() => alarmsStore.totalPages);

const headers = ref([
  { align: 'start' as const, key: 'dateOccurrence', sortable: false, title: 'Fecha Alarma', width: '20rem'},
  { title: 'Producto', key: 'productName', sortable: false, width: '15rem' },
  { title: 'Cliente', key: 'clientName', sortable: false, width: '15rem' },
  { title: 'Operador', key: 'userName', sortable: false, width: '15rem' },
  { title: '', key: 'actions', sortable: false, width: '10rem' },
]);

const handleViewMore = (item: { id: any }) => {
  console.log('Ver más de la orden:', item.id);
};

onMounted(() => {
  alarmsStore.fetchAlerts(page.value);
})

watch(page, (newPage) => {
  alarmsStore.fetchAlerts(newPage);
})
</script>

<template>
  <v-data-table
    v-model:page="page"
    :headers="headers"
    :items="alarms"
    :items-per-page="itemsPerPage"
  >
    <!-- Personalizar la columna 'dateOccurrence' -->
    <template v-slot:item.dateOccurrence="{ item }">
      {{ formatDate(item.dateOccurrence) }}
    </template>

    <!-- personalizar la última columna -->
    <template v-slot:item.actions="{ item }">
      <div>
        <v-btn
          color="primary"
          variant="outlined"
          @click="handleViewMore(item)"
        >
          Ver más
        </v-btn>
      </div>
    </template>

    <template v-slot:bottom>
      <div class="text-center pt-2">
        <v-pagination v-model="page"  size="small" class="custom-pagination"></v-pagination>
      </div>
    </template>
  </v-data-table>
</template>

<style scoped>
</style>
