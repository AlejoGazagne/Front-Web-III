<script lang="ts" setup>
import { onMounted, ref, computed, watch } from 'vue';
import Order from '@/components/common/Order.vue';
import { useOrdersStore } from '@/stores/useOrdersStore';

const ordersStore = useOrdersStore();

const page = ref(1);
const orders = computed(() => ordersStore.orders);
const totalPages = computed(() => ordersStore.totalPages);
const countOrders = computed(() => ordersStore.countOrders);
const status = ref<string | null>(null);

const toggleStatus = (newStatus: string | null) => {
  if (status.value === newStatus) {
    status.value = null;
  } else {
    status.value = newStatus;
  }
  page.value = 1;
  ordersStore.fetchOrders(page.value, status.value);
};

onMounted(() => {
  ordersStore.fetchOrders(page.value, status.value);
  ordersStore.fetchCountOrders()
});

watch(page, (newPage) => {
  ordersStore.fetchOrders(newPage, status.value);
});
</script>

<template>
  <section>
    <v-row class="d-flex justify-space-between bar">
      <v-col cols="1">
        <h2 class="text-h5">Ordenes</h2>
      </v-col>
      <div class="d-flex justify-lg-space-between options">
        <v-btn
          outlined
          color="white"
          :class="{ 'v-btn--active': status === 'RECEIVED' }"
          @click="toggleStatus('RECEIVED')"
        >
          <p class="text-subtitle-2">Recibidos</p>
          <v-chip class="ml-2" color="received" pill>{{ countOrders.received }}</v-chip>
        </v-btn>
        <v-btn
          outlined
          color="white"
          :class="{ 'v-btn--active': status === 'FIRST_WEIGHING' }"
          @click="toggleStatus('FIRST_WEIGHING')"
        >
          <p class="text-subtitle-2">Pesados</p>
          <v-chip class="ml-2" color="firstWeighing" pill>{{ countOrders.weighed }}</v-chip>
        </v-btn>
        <v-btn
          outlined
          color="white"
          :class="{ 'v-btn--active': status === 'CHARGED' }"
          @click="toggleStatus('CHARGED')"
        >
          <p class="text-subtitle-2">Cargados</p>
          <v-chip class="ml-2" color="charged" pill>{{ countOrders.charged }}</v-chip>
        </v-btn>
        <v-btn
          outlined
          color="white"
          :class="{ 'v-btn--active': status === 'FINAL_WEIGHING' }"
          @click="toggleStatus('FINAL_WEIGHING')"
        >
          <p class="text-subtitle-2">Completado</p>
          <v-chip class="ml-2" color="finalWeighing" pill>{{ countOrders.finished }}</v-chip>
        </v-btn>
      </div>
    </v-row>
  </section>
      
  <section class="sections-orders" v-if="orders.length > 0">
    <v-row v-for="order in orders" :key="order.id" >
      <Order class="order" :order="order" />
    </v-row>
  </section>

  <div class="text-center">
    <v-pagination
      v-model = "page"
      :length = totalPages
      next-icon = "mdi-menu-right"
      prev-icon = "mdi-menu-left"
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
</style>