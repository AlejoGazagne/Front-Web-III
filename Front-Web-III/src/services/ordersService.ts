import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1'; //TODO: agregar en variable de entorno

export const fetchOrders = async (currentPage: number, pageSize: number, currentFilter: string | null) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/sap/orders`, {
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

export const fetchOrderById = async (orderId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/sap/order/${orderId}`, {
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

export const fetchDetailsOrder = async (orderId: string) => {
try {
    const response = await axios.get(`${API_BASE_URL}/sap/order/${orderId}/details`, {
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

export const fetchCountOrders = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/sap/orders/count`, {
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

const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    console.error('API Error:', error.response?.data || error.message);
  } else {
    console.error('Unexpected Error:', error);
  }
};