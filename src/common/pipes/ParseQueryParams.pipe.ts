import { Injectable, PipeTransform, Optional, ArgumentMetadata } from '@nestjs/common';
import { AnyObject, ListRequestParams } from 'src/app/data';

export interface QueryOptions<T> {
  query: Partial<T>;
  findOptions: ListRequestParams;
}

/**
 * Usage
 * @Query(new ParseQueryParams<T>() QueryOptions<T>)
 *
 * 从query中解析分页参数及查询参数
 */
@Injectable()
export class ParseQueryParams<T> implements PipeTransform<AnyObject, QueryOptions<T>> {
  constructor(@Optional() private fields?: (keyof T)[]) {}
  transform(value: AnyObject, metaData: ArgumentMetadata): QueryOptions<T> {
    // 分页参数
    const { pageSize = 10, page = 1 } = value;
    const findOptions: ListRequestParams = {
      pageSize: pageSize ? parseInt(pageSize) : 10,
      page: page ? parseInt(page) : 1
    };

    let query = {};

    if (!this.fields) {
      query = value;
    } else {
      // 查询参数
      for (let field in value) {
        if (this.fields.find((i) => i == field)) {
          query[field] = value[field];
        }
      }
    }
    return { query, findOptions };
  }
}
