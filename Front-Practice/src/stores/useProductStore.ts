import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const useProductStore = defineStore('productStore', {
    state: () => ({
        products: [] as any[], // Provide the correct type for the products array
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

        async fetchProductById(idProduct: string) {
            this.isFinished = false;

            const existingProduct = this.products.find(p => p.id === Number(idProduct));
            if (existingProduct) {
                this.isFinished = true;
                return existingProduct;
            }

            try {
                const response = await fetch(`https://fakestoreapi.com/products/${idProduct}`);
                const responseData = await response.json();
                this.products.push(responseData);
            } catch (error) {
                console.error('Error al obtener productos:', error)
            } finally {
                this.isFinished = true;
            }
        },



        async deleteProduct(id: number) {
            this.products = this.products.filter(product => product.id !== id)
        }

    },

    getters: {
        getProductById: (state) => (id: string) => {
            return state.products.find(product => product.id === Number(id))
        }
    },
});