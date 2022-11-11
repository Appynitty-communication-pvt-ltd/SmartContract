import { Module } from '@nestjs/common';
import { TripsController } from './trips.controller';
import { TripsService } from './trips.service';
import { SmartcontractsService } from '../smartcontracts/smartcontracts.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [TripsController],
  providers: [TripsService, SmartcontractsService],
})
export class TripsModule {}
