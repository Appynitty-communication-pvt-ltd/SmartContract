import { Module } from '@nestjs/common';
import { SmartContractsService } from './smartcontracts.service';

@Module({
  providers: [SmartContractsService],
})
export class SmartContractsModule {}
