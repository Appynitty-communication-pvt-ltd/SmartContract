import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TripsService } from './trips.service';
import { AddTripDataDto, GetTripDataDto } from './dtos/trips.dto';

@Controller('trips')
@UseGuards(AuthGuard('basic'))
export class TripsController {
  constructor(private tripsService: TripsService) {}

  @Post('/tripdata')
  public async addTripData(@Body() addTripDataDto: AddTripDataDto) {
    return this.tripsService.addTripData(addTripDataDto);
  }

  @Post('/status')
  public async getVerificationStatus(@Body() getTripDataDto: GetTripDataDto) {
    return this.tripsService.getVerificationStatus(getTripDataDto.transId);
  }
}
