export interface ITripData {
  tripId: string;
  transId: string;
  startDateTime: string;
  endDateTime: string;
  userId: string;
  dyId: string;
  houseList: Array<string>;
  tripNo: string;
  vehicleNumber: string;
  totalGcWeight: string;
  totalDryWeight: string;
  totalWetWeight: string;
}
