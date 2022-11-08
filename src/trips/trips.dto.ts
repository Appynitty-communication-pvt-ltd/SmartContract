export class AddHouseHoldAggreegateWasteDto {
  tripId: string;
  houseIds: Array<string>;
  userId: string;
  vehicleId: string;
  tripStartTimestamp: string;
}
export class AddDumpyardWasteDto {
  tripId: string;
  dumpyardId: string;
  userId: string;
  vehicleId: string;
  totalCollectedDryWaste: string;
  totalCollectedWetWaste: string;
  totalCollectedWaste: string;
  tripEndTimestamp: string;
}
