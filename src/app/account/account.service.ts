import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/BaseService';
import { AccountEntity } from './account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

@Injectable()
export class AccountService extends BaseService<AccountEntity> {
  constructor(
    @InjectRepository(AccountEntity)
    protected readonly repository: Repository<AccountEntity>,
  ) {
    super();
  }
}
