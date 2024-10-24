import { Module, type ModuleMetadata } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { AccountEntity } from './account/account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './account/role.entity';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/user.entity';

dotenv.config({
  path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : undefined,
});

const imports: ModuleMetadata['imports'] = [
  AccountModule,
  AuthModule,
  UserModule,
];
const entities = [AccountEntity, RoleEntity, UserEntity];

if (process.env.host) {
  const { database, username, password, host, databasePort } = process.env;

  imports.push(
    TypeOrmModule.forRoot({
      type: 'mysql',
      synchronize: true,
      database,
      username,
      password,
      host,
      port: Number(databasePort),
      entities,
    }),
  );
}

@Module({
  imports,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
