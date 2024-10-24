import { Injectable, ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { filterEmpty } from 'src/utils';
import { ListRequestParams } from '../../app/data';

export interface ListParmasPipeOtions {
  filterEmpty?: boolean; // 是否过滤空值 空格和undefined
}

/**
 * Usage
 * @UsePipes(new ListParmasPipe())
 */
@Injectable()
export class ListParmasPipe<T>
  implements
    PipeTransform<Record<keyof T & ListRequestParams, string>, Promise<T & ListRequestParams>>
{
  private options = {};
  constructor(options?: ListParmasPipeOtions) {
    this.options = options;
  }
  async transform(value, { metatype }: ArgumentMetadata) {
    value.pageSize = value.pageSize ? parseInt(value.pageSize) : 10;
    value.page = value.page ? parseInt(value.page) : 1;
    value.skip = (value.page - 1) * value.pageSize;
    return value;
    // return this.options?.filterEmpty ? filterEmpty(value) : (value as T);
  }
}
