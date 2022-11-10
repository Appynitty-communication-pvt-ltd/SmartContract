import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AuthenticaitonMiddleware } from './common/middleware/authentication.middleware';
import { TripsController } from './trips/trips.controller';
import { TripsService } from './trips/trips.service';
import { TripsModule } from './trips/trips.module';
import { SmartcontractsController } from './smartcontracts/smartcontracts.controller';
import { SmartcontractsService } from './smartcontracts/smartcontracts.service';

@Module({
  imports: [TripsModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController, TripsController, SmartcontractsController],
  providers: [AppService, TripsService, SmartcontractsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, AuthenticaitonMiddleware)
      .forRoutes('trips');
  }
}
