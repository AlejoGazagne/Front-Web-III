import type { Alert } from "../alert";

export function mapAlertFromResponse(alert: any): Alert {
    return {
        id: alert.alarmId,
        observation: alert.description,
        dateOccurrence: alert.dateOccurrence,
        dateResolved: alert.dateResolved? new Date(alert.dateResolved) : null,
        productName: alert.productName,
        temperature: alert.temperature,
        limitTemperature: alert.limitTemperature,
        status: alert.status,
        userId: alert.user,
        orderId: alert.order,
        userName: alert.userName,
        clientName: alert.clientName
    };
}