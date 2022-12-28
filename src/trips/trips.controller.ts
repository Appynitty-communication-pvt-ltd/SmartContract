import { Controller, Post, Body, UseGuards, Get, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TripsService } from './trips.service';
import { AddTripDataDto } from './dtos/trips.dto';

@Controller('trips')
@UseGuards(AuthGuard('basic'))
export class TripsController {
  constructor(private tripsService: TripsService) {}

  @Post('/')
  public async addTripData(@Body() addTripDataDto: AddTripDataDto) {
    return this.tripsService.addTripData(addTripDataDto);
  }

  @Get('/')
  public async getVerificationStatus(@Query('transId') transId: string) {
    console.log(transId);
    return this.tripsService.getVerificationStatus(transId);
  }
}
