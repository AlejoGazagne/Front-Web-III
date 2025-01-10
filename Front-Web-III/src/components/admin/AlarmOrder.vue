<script lang="ts" setup>
import { ref, computed } from 'vue';

// Variables reactivas
const page = ref(1);
const itemsPerPage = ref(5);

const headers = ref([
  { align: 'start' as const, key: 'name', sortable: false, title: 'Fecha Alarma', width: '20rem'},
  { title: 'Producto', key: 'calories', sortable: false, width: '15rem' },
  { title: 'Cliente', key: 'fat', sortable: false, width: '15rem' },
  { title: 'Operador', key: 'carbs', sortable: false, width: '15rem' },
  { title: '', key: 'actions', sortable: false, width: '10rem' },
]);

const desserts = ref([
  { id: 1, name: 'Frozen Yogurt', calories: 159, fat: 6.0, carbs: 24 },
  { id: 2, name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37 },
  { id: 3, name: 'Eclair', calories: 262, fat: 16.0, carbs: 23 },
  { id: 4, name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67 },
  { id: 5, name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49 },
  { id: 6, name: 'Jelly bean', calories: 375, fat: 0.0, carbs: 94 },
  { id: 7, name: 'Lollipop', calories: 392, fat: 0.2, carbs: 98 },
  { id: 8, name: 'Honeycomb', calories: 408, fat: 3.2, carbs: 87 },
  { id: 9, name: 'Donut', calories: 452, fat: 25.0, carbs: 51 },
  { id: 10, name: 'KitKat', calories: 518, fat: 26.0, carbs: 65 },
]);

const pageCount = computed(() => Math.ceil(desserts.value.length / itemsPerPage.value));

const handleViewMore = (item: { id: any }) => {
  console.log('Ver más de la orden:', item.id);
  
};
</script>

<template>
  <v-data-table
    v-model:page="page"
    :headers="headers"
    :items="desserts"
    :items-per-page="itemsPerPage"
  >
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
        <v-pagination v-model="page" :length="pageCount" size="small" class="custom-pagination"></v-pagination>
      </div>
    </template>
  </v-data-table>
</template>

<style scoped>
</style>
