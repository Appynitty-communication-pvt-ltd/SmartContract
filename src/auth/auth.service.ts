/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, Logger } from '@nestjs/common';
import Config from 'src/config/configuration';
const btoa = require('btoa');
const crypto = require('crypto');

@Injectable()
export class AuthService {
  private logger = new Logger('HTTP');
  async validateUser(username: string, pass: string): Promise<any> {
    const { passwordSalt, passwordHash, adminUsername } = Config().auth;
    const gnPassword = btoa(
      crypto.pbkdf2Sync(pass, passwordSalt, 1000, 32, 'sha256'),
    );
    if (username === adminUsername && gnPassword === passwordHash) {
      this.logger.log('api request is authenticated');
      return true;
    } else {
      this.logger.error(`username and password are incorrect`);
      return null;
    }
  }
}
