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

  async getVerificationStatus(transId: string) {
    const result = await this.smartContractsService.tripInfo(transId);
    if (result.success) {
      return {
        success: true,
        data: {
          transId: result.data.transId,
          tripId: Number(result.data.tripId),
          garbageQuantityVerificationStatus:
            GARBAGE_VERIFICATION_STATUS[
              Number(result.data.garbageQuantityVerificationStatus)
            ],
        },
        error: null,
      };
    } else {
      return result;
    }
  }
}
