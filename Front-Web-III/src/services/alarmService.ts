import axios from 'axios';
import type { Alert } from '../types/alert';

const API_BASE_URL = 'http://localhost:8080/api/v1'; //TODO: agregar en variable de entorno

export const fetchCountAlarms = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/alarms/count`, {
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

export const fetchAcceptedAlarm = async (alarm: Alert) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/alarms/accepted`, JSON.stringify(alarm), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    });
    
    return response;
  } catch (error) {
    handleError(error);
    throw error;
  }
}

export const fetchAlerts = async (page: number, size: number) => {
  try {
    const params: Record<string, number> = {
      page: page,
      size: size,
    };

    const response = await axios.get(`${API_BASE_URL}/alarms/`, {
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

export const fetchAlertsCountByMonth = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/alarms/count/month`, {
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

export const fetchOrderAlarms = async (externalIdOrder: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/alarms/order/${externalIdOrder}`, {
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