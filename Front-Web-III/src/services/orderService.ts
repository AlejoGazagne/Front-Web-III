import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1'; //TODO: agregar en variable de entorno

export const fetchOrders = async (currentPage: number, pageSize: number, currentFilter: string | null) => {
  try {
    const params: Record<string, string | number> = {
      page: currentPage,
      size: pageSize,
    };

    if (currentFilter) {
      params.filter = currentFilter;
    }

    const response = await axios.get(`${API_BASE_URL}/orders/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      params,
    });

    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
}

export const fetchOrderById = async (orderId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/${orderId}`, {
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

export const fetchOrderByInternalId = async (orderId: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/internal/${orderId}`, {
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
    const response = await axios.get(`${API_BASE_URL}/orders/${orderId}/details`, {
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

export const fetchCountOrders = async () => { // TODO: mejorar nombre de la función
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/count`, {
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

export const fetchAllOrdersCount = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/all-orders-count`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });

    return response.data;
  } catch(error) {
    handleError(error);
    throw error;
  }
}

export const fetchProductsCount = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/products-count`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });

    return response.data;
  } catch(error) {
    handleError(error);
    throw error;
  }
}

export const fetchCountAllClients = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/count-all-clients`, {
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

export const fetchOrderConciliation = async (orderId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/conciliation/order/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      responseType: 'blob',
    });

    // Crear un enlace de descarga
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Conciliacion_Orden_${orderId}.pdf`); // Nombre del archivo
    document.body.appendChild(link);
    link.click();

    // Limpiar URL para liberar memoria
    window.URL.revokeObjectURL(url);
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