export interface Alert {
  id: number;
  dateOccurrence: Date;
  dateResolved: Date | null;
  limitTemperature: number;
  observation: string;
  orderEId: number;
  status: string;
  temperature: number;
  userId: number;
  productName: string;
  userName?: string;
  clientName?: string;
}