<script setup lang="ts">
import Header from '@/components/layout/Header.vue';
import Menu from '@/components/layout/Menu.vue';
import Order from '@/components/common/Order.vue';
import { onMounted, ref } from 'vue';

// Lista de órdenes
const orders = ref([]);

async function getOrders() {
  const response = await fetch('http://localhost:8080/api/v1/sap/orders', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  orders.value = await response.json();
}

onMounted(() => {
  getOrders();
});

</script>

<template>
  <v-app>
    <v-app-bar app clipped >
      <Header />
    </v-app-bar>
    
    <Menu />

    <!-- Contenido principal -->
    <v-main class="mt-10 ml-15 mr-15">
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
      
      <section class="sections-orders">
        <v-row v-for="order in orders" :key="order.id" >
          <Order class="order" :order="order" />
        </v-row>
      </section>
      
    </v-main>
  </v-app>
</template>

<style scoped>
.bar{
  width: 100%;
}

.options {
  width: 50rem;
  justify-content: space-between;
  align-items: center;
}

.sections-orders{
  margin-top: 2rem;
  width: 100%;
}

.order{
  height: 5rem;
  border-radius: 10px;
  margin-bottom: 1.3rem;
  border: 1px solid #cecece;
  box-shadow: 0 0 10px rgb(212, 212, 212);
}
</style>