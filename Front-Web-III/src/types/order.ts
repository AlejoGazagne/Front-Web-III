import type { Client } from './client';
import type { Product } from './product';
import type { Driver } from './driver';
import type { Truck } from './truck';

export interface Order {
  id: String;
  externalId: String;
  password: String;
  preset: Number;
  tare: Number;
  finalWeight: Number;
  status: String;

  dateReceived: Date;
  dateFirstWeighing: Date;
  dateInitialCharge: Date;
  dateFinalCharge: Date;
  dateFinalWeighing: Date;
  expectedChargeDate: Date;

  finalChargeWeight: Number;
  lastAccumulatedMass: Number;
  lastDensity: Number;
  lastTemperature: Number;
  lastCaudal: Number;
  lastTimestamp: Date;

  driver: Driver;
  client: Client
  product: Product;
  truck: Truck;
}