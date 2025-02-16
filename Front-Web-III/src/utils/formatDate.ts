// Formatear las fechas
export const formatDate = (date: string | null | undefined | Date): string => {
  if (!date) return 'N/A';

  // Si la fecha viene como un string JSON, intentamos parsearla
  let parsedDate = new Date(date);

  // Verificar si la conversión fue exitosa
  if (isNaN(parsedDate.getTime())) {
    console.warn('⚠️ Fecha inválida recibida:', date);
    return 'Fecha inválida'; // Manejo de error si la conversión falla
  }

  return parsedDate.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};