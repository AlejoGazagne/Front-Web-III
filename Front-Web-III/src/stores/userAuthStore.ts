import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {

  state: () => ({
    token: localStorage.getItem('token') || null ,
    userRole: localStorage.getItem('userRole') || null,
    userData: JSON.parse(localStorage.getItem('userData') || '{}'),
  }),

  actions: {
    setToken(token: string) {
      this.token = token;
      localStorage.setItem('token', token);
    },

    setUserRole(role: string) {
      this.userRole = role;
      localStorage.setItem('userRole', role);
    },

    setUserData(data: Record<string, any>) {
      this.userData = data;
      localStorage.setItem('userData', JSON.stringify(data));
    },

    clearAuth() {
      this.token = null;
      this.userRole = null;
      this.userData = {};
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userData');
    },
  },
  
});