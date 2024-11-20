import { defineStore } from "pinia";


export const useOrderStore = defineStore('order', {
    state:() => ({
        orders: [] as any[], // Add type annotation for the products array
        isLoading: false
    }),
    actions: {
        async fetchOrders() {
            this.isLoading = true;
            try {
                const response = await fetch('http://localhost:8080/api/v1/sap/orders');
                const data = await response.json();
                this.products = data;

            } catch (error) {
                console.error('Error al obtener productos:', error);
            } finally {
                this.isLoading = false;
            }
        },

    }
})