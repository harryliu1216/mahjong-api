import { Injectable, ArgumentMetadata, PipeTransform, Optional } from '@nestjs/common';
import { ListRequestParams } from '../../app/data';

export interface ParseFindOptionsPipeOptions {}

/**
 * Usage
 * @Query(new ParseFindOptions() findOptions)
 *
 * 自动从query中，获取page pageSize，并拆分到findOption中
 */
@Injectable()
export class ParseFindOptions
  implements PipeTransform<{ [key: string]: string | number | any[] }, Promise<ListRequestParams>>
{
  constructor(@Optional() private options?: ParseFindOptionsPipeOptions) {}
  async transform(value): Promise<ListRequestParams> {
    const { pageSize = 10, page = 1 } = value;

    const findOptions: ListRequestParams = {
      pageSize: pageSize ? parseInt(pageSize) : 10,
      page: page ? parseInt(page) : 1
      // skip: (page - 1) * pageSize
    };
    return findOptions;
  }
}
