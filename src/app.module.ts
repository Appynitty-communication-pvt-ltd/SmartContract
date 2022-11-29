import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './utils/middleware/logger.middleware';
import { TripsModule } from './trips/trips.module';
import { AuthModule } from './auth/auth.module';
import { SmartContractsModule } from './smartcontracts/smartcontracts.module';
import configuration from './config/configuration';

@Module({
  imports: [
    TripsModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      cache: true,
    }),
    AuthModule,
    SmartContractsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('trips');
  }
}
