<script setup lang="ts">
import { useRouter } from 'vue-router';
import { getStatusColor } from '@/utils/formatState';
import { getStatusLabel } from '@/utils/formatState';

const router = useRouter();

const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
});

const goToOrderDetail = () => {
  router.push({ name: 'OrderDetail', params: { id: props.order.id } });
};

</script>

<template>
  <div class="object d-flex align-center justify-space-between order px-6">
      <!-- Order ID -->
      <div class="col">
        <p class="item" >Id Order</p>
        <strong>{{props.order.id}}</strong>
      </div>

      <!-- Order assigned to -->
      <div class="col">
        <p class="item" >Producto</p>
        {{ props.order.product.name }}
      </div>

      <!-- Pickup address -->
      <div class="col">
        <p class="item" >Fecha Entrada</p>
        {{ new Date(props.order.dateReceived).toLocaleDateString('en-GB') }}
      </div>

      <!-- Delivery address -->
      <div class="col">
        <p class="item" >Cliente</p>
        {{props.order.client.companyName}}
      </div>

      <!-- Expire at -->
      <div class="col">
        <p class="item" >Fecha Fin</p>
        {{ props.order.dateFinalWeighing ? new Date(props.order.dateFinalWeighing).toLocaleDateString('en-GB') : 'N/A' }}
      </div>

      <!-- Status -->
      <div class="d-flex flex-column align-center col">
        <p class="item">Estado</p>
        <v-chip :color="getStatusColor(props.order.status)" text-color="white">
          {{ getStatusLabel(props.order.status) }}
        </v-chip>
      </div>

      <!-- See more button -->
      <div class="text-right col">
        <v-btn text color="primary" @click="goToOrderDetail" >
          Ver más
        </v-btn>
      </div>
    </div>
</template>

<style scoped>
.item {
  margin-bottom: 10px;
  font-weight: bold;
  color: #414141;
}
.col{
  width: 10%;
}
.object{
  width: 98%;
  background-color: var(--v-theme-light-background);
}
.order{
  height: 5rem;
  border-radius: 10px;
  margin-bottom: 1.3rem;
  border: 1px solid var(--v-theme-light-line);
  box-shadow: 0 0 10px var(--v-theme-light-line);
}
</style>