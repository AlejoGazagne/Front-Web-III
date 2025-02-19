export const formatTime = (seconds: any) => {
  // Si no es un número válido, devuelve "00:00"
  if (!Number.isFinite(seconds)) return "00:00";

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};