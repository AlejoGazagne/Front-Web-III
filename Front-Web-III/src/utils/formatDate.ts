// Formatear las fechas
export const formatDate = (date: string | null | undefined) => {
  if (!date) return 'N/A';
  const parsedDate = new Date(date);
  return parsedDate.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};