import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AuthenticaitonMiddleware } from './common/middleware/authentication.middleware';
import { TripsController } from './trips/trips.controller';
import { TripsService } from './trips/trips.service';
import { TripsModule } from './trips/trips.module';

@Module({
  imports: [TripsModule],
  controllers: [AppController, TripsController],
  providers: [AppService, TripsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, AuthenticaitonMiddleware)
      .forRoutes('trips');
  }
}
