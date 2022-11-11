import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import BigNumber from 'bignumber.js';
import { Householdwaste } from './interfaces/householdwaste.interface';
import { Dumpyardwaste } from './interfaces/dumpyardwaste.interface';
import { SmartcontractsService } from '../smartcontracts/smartcontracts.service';
import { GARBAGE_VERIFICATION_STATUS } from '../constants/index';

@Injectable()
export class TripsService {
  constructor(private smartcontractsService: SmartcontractsService) {}
  async addHouseHoldAggregatedData(householdWaste: Householdwaste) {
    if (
      householdWaste.houseIds &&
      householdWaste.houseIds.length > 0 &&
      householdWaste.tripStartTimestamp &&
      householdWaste.tripId &&
      householdWaste.userId &&
      householdWaste.vehicleId &&
      parseFloat(householdWaste.tripStartTimestamp) > 0 &&
      parseFloat(householdWaste.tripId) > 0 &&
      parseFloat(householdWaste.userId) > 0 &&
      parseFloat(householdWaste.vehicleId) > 0
    ) {
      const tripInfo = await this.smartcontractsService.tripInfo(
        householdWaste.tripId,
      );
      if (tripInfo.success) {
        if (
          tripInfo.data.userId === '0' &&
          tripInfo.data.vehicleId === '0' &&
          tripInfo.data.tripStartTimestamp === '0'
        ) {
          const contractInteractions =
            await this.smartcontractsService.addAggregatedHouseholdTripData(
              householdWaste,
            );
          return contractInteractions;
        } else {
          throw new HttpException(
            { success: false, error: 'Already Present' },
            HttpStatus.CONFLICT,
          );
        }
      } else {
        throw Error(tripInfo.error);
      }
    } else {
      throw new HttpException(
        { success: false, error: 'Required Input parameteres are missing' },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
  async addDumpyardWasteData(dumpyardwaste: Dumpyardwaste) {
    if (
      dumpyardwaste.dumpyardId &&
      dumpyardwaste.tripId &&
      dumpyardwaste.totalCollectedWaste &&
      dumpyardwaste.tripEndTimestamp &&
      parseFloat(dumpyardwaste.tripEndTimestamp) > 0 &&
      parseFloat(dumpyardwaste.tripId) > 0 &&
      parseFloat(dumpyardwaste.totalCollectedWaste) > 0 &&
      parseFloat(dumpyardwaste.dumpyardId) > 0
    ) {
      const tripInfo = await this.smartcontractsService.tripInfo(
        dumpyardwaste.tripId,
      );
      if (tripInfo.success) {
        if (
          tripInfo.data.dumpyardId === '0' &&
          tripInfo.data.totalCollectedWaste === '0' &&
          tripInfo.data.tripEndTimestamp === '0'
        ) {
          const wasteParams = {
            ...dumpyardwaste,
            totalCollectedDryWaste: new BigNumber(
              dumpyardwaste.totalCollectedDryWaste,
            )
              .multipliedBy(1000000)
              .multipliedBy(10 ** 12)
              .toString(),
            totalCollectedWetWaste: new BigNumber(
              dumpyardwaste.totalCollectedWetWaste,
            )
              .multipliedBy(1000000)
              .multipliedBy(10 ** 12)
              .toString(),
            totalCollectedWaste: new BigNumber(
              dumpyardwaste.totalCollectedWaste,
            )
              .multipliedBy(1000000)
              .multipliedBy(10 ** 12)
              .toString(),
          };
          const contractInteractions =
            await this.smartcontractsService.addDumpyardTripData(wasteParams);
          return contractInteractions;
        } else {
          throw new HttpException(
            { success: false, error: 'Already Present' },
            HttpStatus.CONFLICT,
          );
        }
      } else {
        throw Error(tripInfo.error);
      }
    } else {
      throw new HttpException(
        { success: false, error: 'Required Input parameteres are missing' },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
  async getVrificationStatus(tripid: string) {
    const contractInteractions = await this.smartcontractsService.tripInfo(
      tripid,
    );
    if (contractInteractions.success) {
      return {
        success: true,
        data: {
          tripId: contractInteractions.data.tripId,
          userId: contractInteractions.data.userId,
          vehicleId: contractInteractions.data.vehicleId,
          tripStartTimestamp: contractInteractions.data.tripStartTimestamp,
          dumpyardId: contractInteractions.data.dumpyardId,
          totalCollectedWaste: contractInteractions.data.totalCollectedWaste,
          tripEndTimestamp: contractInteractions.data.tripEndTimestamp,
          garbageQuantityVerificationStatus:
            GARBAGE_VERIFICATION_STATUS[
              contractInteractions.data.garbageQuantityVerificationStatus
            ],
        },
        error: null,
      };
    } else {
      return contractInteractions;
    }
  }
}
