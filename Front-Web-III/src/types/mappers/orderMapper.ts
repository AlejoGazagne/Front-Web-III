// orderMapper.ts
import type { Order } from '@/types/order';

export function mapOrderFromResponse(order: any): Order {
  return {
    id: order.id,
    externalId: order.externalId,
    password: order.password,
    preset: order.preset,
    tare: order.tare,
    finalWeight: order.finalWeight,
    status: order.state,

    dateReceived: order.dateReceived ? new Date(order.dateReceived) : null,
    dateFirstWeighing: order.dateFirstWeighing ? new Date(order.dateFirstWeighing) : null,
    dateInitialCharge: order.dateInitialCharge ? new Date(order.dateInitialCharge) : null,
    dateFinalCharge: order.dateFinalCharge ? new Date(order.dateFinalCharge) : null,
    dateFinalWeighing: order.dateFinalWeighing ? new Date(order.dateFinalWeighing) : null,
    expectedChargeDate: order.expectedChargeDate ? new Date(order.expectedChargeDate) : null,
    finalChargeWeight: order.finalChargeWeight,

    lastAccumulatedMass: order.lastAccumulatedMass,
    lastDensity: order.lastDensity,
    lastTemperature: order.lastTemperature,
    lastCaudal: order.lastCaudal,
    lastTimestamp: order.lastTimestamp ? new Date(order.lastTimestamp) : null,

    driver: order.driver,
    client: order.client,
    product: order.product,
    truck: order.truck,
  };
}