export interface LoadData{
    id: String;
    accumulatedMass: Number;
    density: Number;
    temperature: Number;
    caudal: Number;
    timestampLoad: Date | null;
    externalId: String;
}