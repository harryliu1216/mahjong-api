import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as md5 from 'md5';
import * as dayjs from 'dayjs';

import BusinessException from '../../common/BusinessExcption';
import { AccountService } from '../account/account.service';
import { SLAT, expiresIn } from 'src/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
  ) {}

  async accountLogin(username, password) {
    const result = await this.accountService.findOne(
      {
        username,
        password: md5(password + SLAT),
        status: '1',
      },
      {
        relations: ['role'],
      },
    );

    if (result) {
      return {
        token: this.jwtService.sign({ ...result }),
        expires: dayjs().add(parseInt(expiresIn), 'h'),
      };
    } else {
      throw new BusinessException('用户名或密码错误');
    }
  }

  validateToken(token) {
    return this.jwtService.verify(token);
  }
}
