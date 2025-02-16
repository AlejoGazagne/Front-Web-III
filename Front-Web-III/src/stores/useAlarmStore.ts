import { defineStore } from 'pinia';
import type { Alert } from '@/types/alert';
import { fetchAlerts } from '@/services/alarmService';
import { mapAlertFromResponse } from '@/types/mappers/alertMapper';

export const useAlarmStore = defineStore('alarm', {
  state: () => ({
    alerts: [] as Alert[],
    totalAlerts: 0,
    currentPage: 1,
    pageSize: 7,
  }),

  actions: {
    async fetchAlerts(page: number) {
      try {
        const response = await fetchAlerts(page - 1, this.pageSize);
        const data = response.content.map((item: string) => JSON.parse(item));
        
        this.alerts = data.map(mapAlertFromResponse);

        this.totalAlerts = response.totalElements;
        this.currentPage = page;

      } catch (error) {
        console.error('Error al cargar las alertas:', error);
        throw error;
      }
    }
  },

  getters: {
    getAllAlerts: (state) => state.alerts,

    totalPages: (state) => Math.ceil(state.totalAlerts / state.pageSize),

    getAlertById: (state) => (alertId: string) => {
      if (state.alerts.length === 0) {
        // TODO: hacer fetch al backend
        return null;
      }

      const alert = state.alerts.find((alert) => alert.id === parseInt(alertId));

      if (!alert) {
        // TODO: hacer fetch al backend
        return null;
      }

      return alert;
    }
  },

});