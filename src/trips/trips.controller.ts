import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { TripsService } from './trips.service';
import {
  AddHouseHoldAggreegateWasteDto,
  AddDumpyardWasteDto,
} from './trips.dto';

@Controller('trips')
export class TripsController {
  constructor(private tripsService: TripsService) {}
  @Post('/:tripid/households')
  addHouseHoldAggregatedData(
    @Param('tripid') tripid: string,
    @Body() addHouseHoldAggreegateWasteDto: AddHouseHoldAggreegateWasteDto,
  ) {
    const wasteParams = {
      ...addHouseHoldAggreegateWasteDto,
      tripId: tripid,
    };
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
