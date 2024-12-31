import { defineStore } from 'pinia';
import type { Order } from '@/types/order';
import { fetchOrders, fetchOrderById, fetchDetailsOrder, fetchCountOrders } from '@/services/orderService';
import { mapOrderFromResponse } from '@/types/mappers/orderMapper';

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    orders: [] as Order[],
    countOrders: {
      received: 0,
      weighed: 0,
      charged: 0,
      finished: 0,
      totalOrders: 0,
    },
    currentPage: 1,
    pageSize: 7,
    currentFilter: '' as string | null,
  }),
  actions: {
    async fetchOrders(page: number, filter: string | null) {
      try {
        console.log('Filter: ', filter);
        const response = await fetchOrders(page - 1, this.pageSize, filter);
        console.log(response)

        this.orders = response.content.map(mapOrderFromResponse);

        this.countOrders.totalOrders = response.totalElements;
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

        this.orders.push(order);

        return order;
      } catch (error) {
        console.error('Error al buscar la orden en el backend:', error);
        throw error;
      }
    },

    async fetchDetailOrder(orderId: string){
      const response = await fetchDetailsOrder(orderId);
      return response;
    },

    async fetchCountOrders() {
      const response = await fetchCountOrders();
    
      const countOrders = {};
      response.states.forEach((stateObj) => {
        countOrders[stateObj.state] = stateObj.count;
      });
    
      this.countOrders = {
        ...countOrders,
        totalOrders: response.total,
      };
    
      return response;
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
      const order = state.orders.find((order) => order.externalId === orderId);
    
      if (!order) {
        console.warn(`Order with ID ${orderId} not found in store.`);
        return null;
      }
    
      return order;
    },
  
    getOrdersByStatus: (state) => (status: string) => {
      return state.orders.filter((order) => order.status === status);
    },

    totalPages: (state) => Math.ceil(state.countOrders.totalOrders / state.pageSize),
  },
});