import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1'; //TODO: agregar en variable de entorno

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login?username=${username}&password=${password}`);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    console.error('API Error:', error.response?.data || error.message);
  } else {
    console.error('Unexpected Error:', error);
  }
};
