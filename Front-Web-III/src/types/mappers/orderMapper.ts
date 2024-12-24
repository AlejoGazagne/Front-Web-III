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

    dateReceived: new Date(order.dateReceived),
    dateFirstWeighing: new Date(order.dateFirstWeighing),
    dateInitialCharge: new Date(order.dateInitialCharge),
    dateFinalCharge: new Date(order.dateFinalCharge),
    dateFinalWeighing: new Date(order.dateFinalWeighing),
    expectedChargeDate: new Date(order.expectedChargeDate),
    finalChargeWeight: order.finalChargeWeight,

    lastAccumulatedMass: order.lastAccumulatedMass,
    lastDensity: order.lastDensity,
    lastTemperature: order.lastTemperature,
    lastCaudal: order.lastCaudal,
    lastTimestamp: new Date(order.lastTimestamp),

    driver: order.driver,
    client: order.client,
    product: order.product,
    truck: order.truck,
  };
}