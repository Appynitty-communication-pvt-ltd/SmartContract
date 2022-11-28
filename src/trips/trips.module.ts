import { Module } from '@nestjs/common';
import { TripsController } from './trips.controller';
import { TripsService } from './trips.service';
import { SmartContractsService } from '../smartcontracts/smartcontracts.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [TripsController],
  providers: [TripsService, SmartContractsService],
})
export class TripsModule {}
