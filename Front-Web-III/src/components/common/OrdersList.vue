<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue';
import Order from '@/components/common/Order.vue';
import { OrderType } from '@/types/OrderType';
import { useOrdersStore } from '@/stores/useOrdersStore';

const ordersStore = useOrdersStore();

const page = ref(1);
const orders = computed(() => ordersStore.getAllOrders);
const totalPages = computed(() => ordersStore.totalPages);

onMounted(() => {
  ordersStore.fetchOrders(page.value);
});
</script>

<template>
  <section >
    <v-row class="d-flex justify-space-between bar">
      <v-col cols="1">
        <h2>Ordenes</h2>
      </v-col>
      <div class="d-flex justify-lg-space-between options">
        <v-btn outlined color="white">Recibidos
          <v-chip class="ml-2" color="secondary" text-color="white" pill>12</v-chip>
        </v-btn>
        <v-btn outlined color="white">Pesados
          <v-chip class="ml-2" color="secondary" text-color="white" pill>12</v-chip>
        </v-btn>
        <v-btn outlined color="white">Cargados
          <v-chip class="ml-2" color="secondary" text-color="white" pill>12</v-chip>
        </v-btn>
        <v-btn outlined color="white">Completado
          <v-chip class="ml-2" color="secondary" text-color="white" pill>12</v-chip>
        </v-btn>
      </div>
    </v-row>
  </section>
      
  <section class="sections-orders" v-if="orders.length > 0"   >
    <v-row v-for="order in orders" :key="order.id" >
      <Order class="order" :order="order" />
    </v-row>
  </section>

  <div class="text-center">
    <v-pagination
      v-model="page"
      :length="4"
      next-icon="mdi-menu-right"
      prev-icon="mdi-menu-left"
    ></v-pagination>
  </div>

</template>

<style scoped>
.options {
  width: 50rem;
  justify-content: space-between;
  align-items: center;
}

.sections-orders{
  margin-top: 2rem;
  width: 100%;
}

.probando{
  color: #1f1f1f;
  font-weight: bold;
}
</style>