import { defineStore } from 'pinia';
import type { UserData } from '../types/user';

export const useAuthStore = defineStore('auth', {

  state: () => ({
    token: localStorage.getItem('token') || null ,
    userRole: localStorage.getItem('userRole') || null,
    userData: JSON.parse(localStorage.getItem('userData') || '{}') as UserData,
  }),

  actions: {
    setToken(token: string) {
      this.token = token;
      this._syncLocalStorage('token', token);
    },

    setUserRole(role: string) {
      this.userRole = role;
      this._syncLocalStorage('userRole', role);
    },

    setUserData(userData: UserData) {
      this.userData = userData;
      this._syncLocalStorage('userData', JSON.stringify(userData));
    },

    loadFromLocalStorage() {
      try {
        this.token = localStorage.getItem('token');
        this.userRole = localStorage.getItem('userRole');
        this.userData = JSON.parse(localStorage.getItem('userData') || '{}') as UserData;
      } catch (error) {
        console.error('Error al cargar datos de localStorage:', error);
        this.clearAuth();
      }
    },

    clearAuth() {
      this.token = null;
      this.userRole = null;
      this.userData = {} as UserData;
      this._clearLocalStorage();
    },

    _syncLocalStorage(key: string, value: string) {
      localStorage.setItem(key, value);
    },

    _clearLocalStorage() {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userData');
    },
  },

  getters: {
    isAuthenticated: (state) => !!state.token, // true si el usuario está autenticado
    getRole: (state) => state.userRole,
    getUserData: (state) => state.userData,
  },

});