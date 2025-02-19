import { theme } from '../assets/theme';

export const getStatusColorAlarm = (status: string) => {
  switch (status) {
    case 'RESOLVED':
      return theme.colors.success;
    case 'CRITICAL':
      return theme.colors.error;
    case 'PENDING':
      return theme.colors.warning;
    default:
      return 'grey';
  }
}

export const getStatusLabelAlarm = (status: string) => {
  switch (status) {
    case 'RESOLVED':
      return 'Resuelto';
    case 'CRITICAL':
      return 'Crítico';
    case 'PENDING':
      return 'Pendiente';
    default:
      return 'Desconocido';
  }
}