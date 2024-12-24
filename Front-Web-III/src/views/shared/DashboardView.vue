<script lang="ts" setup>
import Header from '@/components/layout/Header.vue';
import Menu from '@/components/layout/Menu.vue';
import UniqueVisitor from '@/components/common/UniqueVisitor.vue';
import WidgetFive from '@/components/common/WidgetFive.vue';
import DonutChart from '@/components/common/DonutChart.vue';
import Treemap from '@/components/common/Treemap.vue';
import ColumnChart from '@/components/common/ColumnChart.vue';

</script>

<template>
  <v-app>
    <v-app-bar app clipped >
      <Header />
    </v-app-bar>
    
    <Menu />

    <!-- Contenido principal -->
    <v-main class="mt-10 ml-15 mr-15">
      <v-row>
        <WidgetFive />
      </v-row>
      <v-row class="">
        <v-col cols="12" md="8">
          <UniqueVisitor />
        </v-col>
        <v-col cols="12" md="4">
          <DonutChart />
        </v-col>
      </v-row>
      <v-row class="mb-10">
        <v-col>
          <Treemap/>
        </v-col>
        <v-col>
          <ColumnChart/>
        </v-col>

      </v-row>
    </v-main>
  </v-app>
</template>

<style scoped>
</style>