<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchCountClients } from '@/services/clientService';
import { fetchCountOrders } from '@/services/orderService';

const fivecards = ref([
  {
    name: 'Clientes totales',
    earn: '0',
    color: 'primary',
    icon: 'mdi-account-tag-outline',
    fetchData: fetchCountClients,
    mapData: (data) => ({ earn: data.totalClients.toString() }),
  },
  {
    name: 'Ordenes terminadas',
    earn: '0',
    percent: '',
    color: 'success',
    icon: 'mdi-package-variant-closed-check',
    fetchData: fetchCountOrders, // No procesamos total ni states aquí
  },
  // {
  //   name: 'Total Order',
  //   earn: '18,800',
  //   percent: '27.4%',
  //   color: 'warning',
  //   icon: 'mdi-cart-outline',
  //   text: '1,943'
  // },
  // {
  //   name: 'Total Sales',
  //   earn: '$35,078',
  //   percent: '27.4%',
  //   color: 'error',
  //   icon: 'mdi-currency-usd',
  //   text: '$20,395'
  // }
]);

const updateCards = async () => {
  for (const card of fivecards.value) {
    try {
      const data = await card.fetchData();

      if (card.name === 'Ordenes terminadas') {
        const total = data.total;
        const finishedState = data.states.find((state) => state.state === 'finished');
        const finishedCount = finishedState ? finishedState.count : 0;

        card.earn = finishedCount.toString();
        card.percent = total > 0 ? ((finishedCount / total) * 100).toFixed(1) + '%' : '0%';
      } else if (card.name === 'Clientes totales') {
        card.earn = data.totalClients.toString();
      }
    } catch (error) {
      console.error(`Error al actualizar la tarjeta "${card.name}":`, error);
    }
  }
};

onMounted(() => {
  updateCards();
});
</script>

<template>
  <v-row>
    <v-col cols="12" sm="6" md="3" v-for="(card5, i) in fivecards" :key="i" :value="card5">
      <v-card elevation="0">
        <v-card variant="outlined" class="my-card">
          <v-card-text>
            <div class="d-flex align-items-center justify-space-between">
              <div class="probando">
                <h6 class="text-h6 text-lightText mb-1">{{ card5.name }}</h6>
                <h4 class="text-h4 d-flex align-center justify-space-between mb-0">
                  {{ card5.earn }}
                  <v-chip :color="card5.color" :border="`${card5.color} solid thin opacity-50`" class="ml-2" size="small" label>
                    <template v-slot:prepend>
                      <v-icon :class="'mr-1 text-' + card5.color" :style="{ fontSize: '12px' }">{{ card5.icon }}</v-icon>
                    </template>
                    {{ card5.percent }}
                  </v-chip>
                </h4>
                <!-- <span class="text-lightText text-caption pt-5 d-block">
                  You made an extra <span :class="'text-' + card5.color">{{ card5.text }}</span> this year
                </span> -->
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-card>
    </v-col>
  </v-row>
</template>
<style>
.my-card {
  border-color: #cfcfcf;
}

.probando{
  width: 100%;
}
</style>