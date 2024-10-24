import { BaseEntity, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import * as dayjs from 'dayjs';

export const transformer = {
  from(value) {
    if (value) {
      return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
    }
    return value;
  },
  to(value) {
    return value;
  },
};

export abstract class BaseEntityAbstract extends BaseEntity {
  @CreateDateColumn({
    transformer,
  })
  createAt?: Date;
  @UpdateDateColumn({
    transformer,
    select: false,
  })
  updateAt?: Date;
}
