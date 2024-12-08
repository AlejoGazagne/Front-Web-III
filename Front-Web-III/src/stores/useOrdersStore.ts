import { defineStore } from 'pinia';
import type { Order } from '@/types/order';
import { fetchOrders, fetchOrderById } from '@/services/ordersService';
import { mapOrderFromResponse } from '@/types/mappers/orderMapper';

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    orders: [] as Order[],
    totalOrders: 0,
    currentPage: 1,
    pageSize: 10,
    currentFilter: '' as string | null,
  }),
  actions: {
    async fetchOrders(page: number = 1, filter: string | null) {
      try {
        const response = await fetchOrders(page, this.pageSize, filter);

        this.orders = response.map(mapOrderFromResponse);

        this.totalOrders = response.total;
        this.currentPage = page;
        this.currentFilter = filter || null;
      } catch (error) {
        console.error('Error al cargar las ordenes:', error);
        throw error;
      }
    },

    async fetchById(orderId: string) {
      try {
        const response = await fetchOrderById(orderId);

        const order = mapOrderFromResponse(response);

        // this.orders.push(order);

        return order;
      } catch (error) {
        console.error('Error al cargar la orden:', error);
        throw error;
      }
    },

    async filterByStatus(status: string) {
      await this.fetchOrders(1, status);
    },

    async goToPage(page: number) {
      await this.fetchOrders(page, this.currentFilter);
    },

    setOrders(newOrders: Order[]) {
      this.orders = newOrders;
    },
  },
  
  getters: {
    getAllOrders: (state) => state.orders,
  
    getOrderById: (state) => (orderId: string) => {
      if (state.orders.length === 0) {
        console.warn('No orders in the store.');
        return null;
      }
    
      console.log('Searching for order ID:', orderId);
      const order = state.orders.find((order) => order.id === orderId);
    
      if (!order) {
        console.warn(`Order with ID ${orderId} not found in store.`);
        return null;
      }
    
      return order;
    },
  
    getOrdersByStatus: (state) => (status: string) => {
      return state.orders.filter((order) => order.status === status);
    },

    totalPages: (state) => Math.ceil(state.totalOrders / state.pageSize),
  },
});