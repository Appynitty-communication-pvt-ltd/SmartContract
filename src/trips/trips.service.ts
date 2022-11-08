import { Injectable } from '@nestjs/common';
import { Householdwaste } from './interfaces/householdwaste.interface';
import { Dumpyardwaste } from './interfaces/dumpyardwaste.interface';

@Injectable()
export class TripsService {
  addHouseHoldAggregatedData(householdWaste: Householdwaste) {
    return {
      success: true,
      data: householdWaste,
    };
  }
  addDumpyardWasteData(dumpyardwaste: Dumpyardwaste) {
    return {
      success: true,
      data: dumpyardwaste,
    };
  }
  getVrificationStatus(tripid: string) {
    return {
      success: true,
      data: {
        tripid,
        garbageQuantityVerificationStatus: true,
      },
    };
  }
}
