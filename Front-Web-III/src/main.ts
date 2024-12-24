import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

import '@mdi/font/css/materialdesignicons.css';

import VueApexCharts from "vue3-apexcharts";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})

// Iconify
import { Icon } from '@iconify/vue';

const app = createApp(App)

app.component("apexchart", VueApexCharts);
app.component('Icon', Icon);
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')
