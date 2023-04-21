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
    return this.tripsService.getVerificationStatus(transId);
  }

  //Can be used to send any transaction hash and retrieve its correct status i.e. success/failure/pending
  @Get('transaction/status')
  public async getTransactionStatus(
    @Query('transactionHash') transactionHash: string,
  ) {
    return this.tripsService.getTransactionStatus(transactionHash);
  }
}
