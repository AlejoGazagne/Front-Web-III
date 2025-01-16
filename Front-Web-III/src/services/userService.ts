import axios from 'axios';
import type { UserData } from '../types/user';

const API_BASE_URL = 'http://localhost:8080/api/v1'; //TODO: agregar en variable de entorno

export const fetchRoles = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/roles`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });

    console.log(response.data)
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
}

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });

    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
}

export const editUser = async (user: any) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/users/${user.id}`, user, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });

    return response.status;
  } catch (error) {
    handleError(error);
    throw error;
  }
}

export const addUser = async (user: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/add`, user, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
  
    return response.status;
  } catch (error) {
    handleError(error);
    throw error;
  }
}

export const editarUsuario = async (user: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/profile/${user.id}`, user, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });

    return response;
  } catch (error) {
    handleError(error);
    return error;
  }
}

const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    console.error('API Error:', error.response?.data || error.message);
  } else {
    console.error('Unexpected Error:', error);
  }
};