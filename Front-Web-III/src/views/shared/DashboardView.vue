<script lang="ts" setup>
import Header from '@/components/layout/Header.vue';
import Menu from '@/components/layout/Menu.vue';
import UniqueVisitor from '@/components/common/UniqueVisitor.vue';
import WidgetFive from '@/components/common/WidgetFive.vue';
import DonutChart from '@/components/common/DonutChart.vue';
import Treemap from '@/components/common/Treemap.vue';
import ColumnChart from '@/components/common/ColumnChart.vue';
import AlarmsList from '@/components/admin/AlarmsList.vue';
import AlarmsReport from '@/components/admin/AlarmsReport.vue';

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
      <v-row>
        <v-col cols="12" md="8">
          <UniqueVisitor />
        </v-col>
        <v-col cols="12" md="4">
          <DonutChart />
        </v-col>
      </v-row>
      <v-row class="mb-3">
        <v-col>
          <Treemap/>
        </v-col>
        <v-col>
          <ColumnChart/>
        </v-col>

      </v-row>
      <v-row class="mb-3 ml-1 mr-1">
        <AlarmsList />
      </v-row>
      <v-row class="mb-10">
        <v-col cols="8" class="">
          <AlarmsReport />
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<style scoped>
.probando {
  background-color: #081324;
  background-color: #1cb1da;
  background-color: #491873;
  background-color: #525a65;
  background-color: #8f949c;
  background-color: #3f702b;
  background-color: #298095;
  background-color: #f8b482;
  background-color: #b2d8f5;
  background-color: #f4f4f6;
  background-color: #e2e3f5;
  background-color: #5cbfbd;
  background-color: #ff0022;
  background-color: #eaeaee;
  background-color: #fb934a;
  background-color: #1c1b20;
  background-color: #414141;
  background-color: #77c77e;
  background-color: #9878aa;
  background-color: #6a948c;
  background-color: #b8e0a6;
  background-color: #091c47;

  background-color: #2196f3;/*pruebas*/

  background-color: #298095;/*received*/
  background-color: #491873;/*firstWeighing*/
  background-color: #f7b11e;/*charged*/
  background-color: #3f702b;/*finalWeighing*/

}
</style>