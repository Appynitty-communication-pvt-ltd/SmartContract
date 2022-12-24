import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { BasicStrategy } from './basic.strategy';

@Module({
  imports: [PassportModule],
  providers: [AuthService, BasicStrategy],
})
export class AuthModule {}
