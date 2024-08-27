import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const useProductStore = defineStore('productStore', {
    state: () => ({
        products: [],
        isFinished: false,
    }),

    actions: {
        async fetchProducts() {
            try {
                const response = await fetch('https://fakestoreapi.com/products')
                const data = await response.json()
                this.products = data
            } catch (error) {
                console.error('Error al obtener productos:', error)
            } finally {
                this.isFinished = true
            }
        },

        async deleteProduct(id: number) {
            this.products = this.products.filter(product => product.id !== id)
        }
    }
});