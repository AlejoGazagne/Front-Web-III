import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1'; //TODO: agregar en variable de entorno

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/`, {
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

export const fetchProduct = async (product: any) => {
  try {
    console.log(product);
    console.log(JSON.stringify(product))
    const response = await axios.post(`${API_BASE_URL}/products/add`, JSON.stringify(product), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })

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