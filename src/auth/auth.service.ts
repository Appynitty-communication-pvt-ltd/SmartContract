/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, Logger } from '@nestjs/common';
const btoa = require('btoa');
const crypto = require('crypto');

@Injectable()
export class AuthService {
  private logger = new Logger('HTTP');
  async validateUser(username: string, pass: string): Promise<any> {
    const gnPassowrd = btoa(
      crypto.pbkdf2Sync(pass, process.env.PASSWORD_SALT, 1000, 32, 'sha256'),
    );
    if (username === 'adminuser' && gnPassowrd === process.env.PASSWORD_HASH) {
      this.logger.log('api request is authenticated');
      return true;
    } else {
      this.logger.error(`username and password are incorrect`);
      return null;
    }
  }
}
