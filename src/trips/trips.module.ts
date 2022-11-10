import { Module } from '@nestjs/common';
import { TripsController } from './trips.controller';
import { TripsService } from './trips.service';
import { SmartcontractsService } from '../smartcontracts/smartcontracts.service';

@Module({
  controllers: [TripsController],
  providers: [TripsService, SmartcontractsService],
})
export class TripsModule {}
