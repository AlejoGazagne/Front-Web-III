import { theme } from '../assets/theme';

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'RECEIVED':
      return theme.colors.received;
    case 'FIRST_WEIGHING':
      return theme.colors.firstWeighing;
    case 'CHARGED':
      return theme.colors.charged;
    case 'FINAL_WEIGHING':
      return theme.colors.finalWeighing;
    default:
      return 'grey';
  }
};

export const getStatusLabel = (status: string) => {
  switch (status) {
    case 'RECEIVED':
      return 'Recibido';
    case 'FIRST_WEIGHING':
      return 'Pesados';
    case 'CHARGED':
      return 'Cargado';
    case 'FINAL_WEIGHING':
      return 'Completado';
    default:
      return 'Desconhecido';
  }
};