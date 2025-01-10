import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1'; //TODO: agregar en variable de entorno

export const fetchRoles = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/sap/roles`, {
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
    const response = await axios.get(`${API_BASE_URL}/sap/users`, {
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

export const editUser = async (data: any) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/sap/user`, data, {
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

const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    console.error('API Error:', error.response?.data || error.message);
  } else {
    console.error('Unexpected Error:', error);
  }
};