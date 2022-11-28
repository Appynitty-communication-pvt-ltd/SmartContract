import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TripsService } from './trips.service';
import { AddTripDataDto } from './dtos/trips.dto';

@Controller('trips')
@UseGuards(AuthGuard('local'))
export class TripsController {
  constructor(private tripsService: TripsService) {}

  @Post('/:tripId/tripdata')
  public async addTripData(
    @Param('tripId') tripId: string,
    @Body() addTripDataDto: AddTripDataDto,
  ) {
    return this.tripsService.addTripData({
      ...addTripDataDto,
      tripId,
    });
  }

  @Get('/:tripId')
  public async getVerificationStatus(@Param('tripId') tripId: string) {
    return this.tripsService.getVerificationStatus(tripId);
  }
}
