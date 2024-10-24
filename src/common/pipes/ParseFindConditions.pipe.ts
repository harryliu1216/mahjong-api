import { Injectable, PipeTransform, Optional, ArgumentMetadata } from '@nestjs/common';
import { ClassConstructor, plainToClass } from 'class-transformer';

export interface ParseFindConditionsPipeOptions<T> {
  // constructor: ClassConstructor<T>;
}

/**
 * Usage
 * @Query(new ParseFindConditions() query:Entity)
 *
 * 这里会返回Entity的实例 配合后面findAll，过滤掉不在column中的字段，避免出现
 * 查询时报错：`No entity column \"xxx\" was found.`
 */
@Injectable()
export class ParseFindConditions<T> implements PipeTransform<T, Promise<T>> {
  constructor(@Optional() private options?: ParseFindConditionsPipeOptions<T>) { }
  async transform(value, { metatype }: ArgumentMetadata) {
    console.log('-metatype', metatype)
    return plainToClass(metatype, value) as T;
  }
}
