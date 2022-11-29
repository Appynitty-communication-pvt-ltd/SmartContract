import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { SmartContractsService } from '../smartcontracts/smartcontracts.service';
import { GARBAGE_VERIFICATION_STATUS } from '../utils/constants/index';
import { AddTripDataDto } from './dtos/trips.dto';

@Injectable()
export class TripsService {
  constructor(private smartContractsService: SmartContractsService) {}

  public async addTripData(tripData: AddTripDataDto) {
    try {
      return await this.smartContractsService.addTripData(tripData);
    } catch (error) {
      throw new HttpException(
        { success: false, error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getVerificationStatus(tripid: string) {
    const contractInteractions = await this.smartContractsService.tripInfo(
      tripid,
    );
    if (contractInteractions.success) {
      return {
        success: true,
        data: {
          tripId: Number(contractInteractions.data.tripId),
          garbageQuantityVerificationStatus:
            GARBAGE_VERIFICATION_STATUS[
              Number(
                contractInteractions.data.garbageQuantityVerificationStatus,
              )
            ],
        },
        error: null,
      };
    } else {
      return contractInteractions;
    }
  }
}
