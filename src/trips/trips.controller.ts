import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { TripsService } from './trips.service';
import { SmartcontractsService } from '../smartcontracts/smartcontracts.service';
import {
  AddHouseHoldAggreegateWasteDto,
  AddDumpyardWasteDto,
} from './trips.dto';
import { TripcontractAbi } from '../constants/abis/tripcontract.abi';
import { TRIP_CONTRACT_ADDRESS } from '../constants/index';
@Controller('trips')
export class TripsController {
  constructor(
    private tripsService: TripsService,
    private smartcontractsService: SmartcontractsService,
  ) {}
  @Post('/:tripid/households')
  async addHouseHoldAggregatedData(
    @Param('tripid') tripid: string,
    @Body() addHouseHoldAggreegateWasteDto: AddHouseHoldAggreegateWasteDto,
  ) {
    const wasteParams = {
      ...addHouseHoldAggreegateWasteDto,
      tripId: tripid,
    };
    const tripContract = await this.smartcontractsService.getContract(
      TRIP_CONTRACT_ADDRESS,
      TripcontractAbi,
    );
    console.log({ tripContract });
    return this.tripsService.addHouseHoldAggregatedData(wasteParams);
  }
  @Post('/:tripid/dumpyard')
  addDumpyardWasteData(
    @Param('tripid') tripid: string,
    @Body() addDumpyardWasteDto: AddDumpyardWasteDto,
  ) {
    const wasteParams = {
      ...addDumpyardWasteDto,
      tripId: tripid,
    };
    return this.tripsService.addDumpyardWasteData(wasteParams);
  }
  @Get('/:tripid')
  getVrificationStatus(@Param('tripid') tripid: string) {
    return this.tripsService.getVrificationStatus(tripid);
  }
}
