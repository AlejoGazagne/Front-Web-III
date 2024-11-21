<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
});

const getStatusColor = (status: string) => { // acomodar para los estados de la base de datos
  switch (status) {
    case 'Pending':
      return 'blue';
    case 'Received':
      return 'green';
    case 'Completed':
      return 'Red';
    default:
      return 'grey';
  }
};
</script>

<template>
  <div class="d-flex align-center  justify-space-between order px-6 object">
      <!-- Order ID -->
      <div class="col">
        <p class="item" >Id Order</p>
        <strong>#94268346</strong>
      </div>

      <!-- Order assigned to -->
      <div class="col">
        <p class="item" >Producto</p>
        Lisa Collins
      </div>

      <!-- Pickup address -->
      <div class="col">
        <p class="item" >Fecha entrada</p>
        Lyon, FR
      </div>

      <!-- Delivery address -->
      <div class="col">
        <p class="item" >Cliente</p>
        Milan, IT
      </div>

      <!-- Expire at -->
      <div class="col">
        <p class="item" >Fecha Finalización</p>
        18 Sep, 2024
      </div>

      <!-- Status -->
      <div class="d-flex flex-column align-center col">
        <p class="item">Estado</p>
        <v-chip :color="getStatusColor(order.status)" text-color="white">
          {{ order.status }}
        </v-chip>
      </div>

      <!-- See more button -->
      <div class="text-right col">
        <v-btn text color="primary">
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
}
</style>