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
    case 'RECEIVED':
      return 'blue';
    case 'FIRST_WEIGHING':
      return 'green';
    case 'CHARGED':
      return 'orange';
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
        <v-chip :color="getStatusColor(props.order.state)" text-color="white">
          {{ props.order.state }}
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