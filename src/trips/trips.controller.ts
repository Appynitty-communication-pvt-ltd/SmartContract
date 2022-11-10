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
  async addHouseHoldAggregatedData(
    @Param('tripid') tripid: string,
    @Body() addHouseHoldAggreegateWasteDto: AddHouseHoldAggreegateWasteDto
  ) {
    const wasteParams = {
      ...addHouseHoldAggreegateWasteDto,
      tripId: tripid,
    };
    const addHouseHoldAggregatedData =
      await this.tripsService.addHouseHoldAggregatedData(wasteParams);
    return addHouseHoldAggregatedData;
  }
  @Post('/:tripid/dumpyard')
  async addDumpyardWasteData(
    @Param('tripid') tripid: string,
    @Body() addDumpyardWasteDto: AddDumpyardWasteDto,
  ) {
    const wasteParams = {
      ...addDumpyardWasteDto,
      tripId: tripid,
    };
    const addDumpyardWasteData = await this.tripsService.addDumpyardWasteData(
      wasteParams,
    );
    return addDumpyardWasteData;
  }
  @Get('/:tripid')
  getVrificationStatus(@Param('tripid') tripid: string) {
    return this.tripsService.getVrificationStatus(tripid);
  }
}
