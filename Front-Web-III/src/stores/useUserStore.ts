import { defineStore } from "pinia";


export const useUserStore = defineStore('user', {
    state:() => ({
        isLoggedIn: false,
        token: null
       
    }),
    actions: {
        login(token){
            this.isLoggedIn = true;
            this.token = token;
            localStorage.setItem('token', `${token}`);               
        },
        logout(){
            this.isLoggedIn = false;
            this.token = null;

            localStorage.removeItem('token');
        },
        isLoggedInCheck(): boolean {
            return localStorage.getItem('token') !== null;
        }

    }
})