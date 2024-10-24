import { Global, Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
// import { LocalStrategy } from './local.strategy';
// import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AccountModule } from '../account/account.module';
import { JwtStrategy } from './jwt.strategy';

import * as dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : undefined,
});

const { JWT_SECRET, expiresIn } = process.env;

@Global()
@Module({
  imports: [
    AccountModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
