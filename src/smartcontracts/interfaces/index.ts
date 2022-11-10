export interface Householdwaste {
  tripId: string;
  houseIds: Array<string>;
  userId: string;
  vehicleId: string;
  tripStartTimestamp: string;
}
export interface Dumpyardwaste {
  tripId: string;
  dumpyardId: string;
  userId: string;
  vehicleId: string;
  totalCollectedDryWaste: string;
  totalCollectedWetWaste: string;
  totalCollectedWaste: string;
  tripEndTimestamp: string;
}
