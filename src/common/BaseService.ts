import { FindOneOptions, FindOperator, FindManyOptions } from 'typeorm';

import { ListResponse, ListRequestParams } from '../app/data';
import BusinessException from './BusinessExcption';
import { CustomResponseContent } from './CustomResponseContent';
import { plaintoFindConditions } from './typeorm/FindConditions';

export type IdType = { id: string | number };

export type FindOperators<T> = {
  [P in keyof T]?: FindOperator<T[P]> | T[P];
};

export class BaseService<T> {
  protected readonly repository;

  /**
   * 分页查询并返回分页信息
   *
   * params 支持反序列化只有param中被 `@Condtion` 修饰器修饰过的字段才能作为查询条件
   * 否则会忽略此参数进行参数
   *
   * params 为Entity的实例才可以过滤不在实体中的字段。
   */
  async findAll<P extends FindOperators<T>>(
    params?: P | P[],
    options?: FindManyOptions & Partial<ListRequestParams>,
  ): Promise<ListResponse<T>> {
    const { ...others } = params;
    const { page = 1, pageSize = 10, ...otherOpts } = options || {};

    // plaintoFindConditions 只支持就要实体查询，避免出现在非实体
    const where = Array.isArray(params)
      ? params
      : plaintoFindConditions(this.repository.target, others);

    const result = await this.repository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: {
        createAt: 'DESC',
      },
      where,
      ...otherOpts,
    });

    return {
      list: result[0],
      count: result[1],
      page,
      pageSize,
    };
  }

  /**
   * 按分页查询列表数据，不过不返回分页及total信息
   */
  async find<P extends FindOperators<T>>(
    params?: P | P[],
    options?: FindManyOptions &
      Partial<ListRequestParams> & { skipWhereTransform?: boolean },
  ): Promise<T[]> {
    const { ...others } = params;
    const {
      skip,
      page,
      pageSize,
      skipWhereTransform = false,
      ...otherOpts
    } = options || {};

    const where = skipWhereTransform
      ? params
      : Array.isArray(params)
      ? params
      : plaintoFindConditions(this.repository.target, others);

    return await this.repository.find({
      skip,
      take: pageSize,
      order: {
        createAt: 'DESC',
      },
      where,
      ...otherOpts,
    });
  }

  async findOne(
    id:
      | { [key: string]: string | number | FindOperator<any> }
      | string
      | number,
    options: FindOneOptions & { emptyErrorMessage?: string } = {},
  ): Promise<T> {
    let result;
    let where;
    if (typeof id === 'object') {
      where = id;
    } else {
      where = { id };
    }

    result = await this.repository.find({
      where,
      ...options,
      take: 1,
    });

    result = result[0];

    /**
     * emptyErrorMessage 通过id查询没有记录 错误消息
     */
    if (options.emptyErrorMessage && !result) {
      throw new BusinessException(options.emptyErrorMessage);
    }
    return result;
  }

  /**
   * 新增 或 修改
   */
  async save({ id, ...payload }: Partial<T & IdType>) {
    for (const key in payload) {
      if (payload[key] === undefined) {
        delete payload[key];
      }
    }
    if (id) {
      const result = await this.repository.update(id, payload);
      if (result.affected === 0) {
        throw new BusinessException('更新失败');
      }
      return new CustomResponseContent(result.affected, '更新成功');
    }
    const inserResult = await this.repository.save(payload);

    return new CustomResponseContent(
      {
        id: inserResult.id,
      },
      '新增成功',
    );
  }

  async update(
    condition: FindOneOptions<T> | string | number | (string | number)[],
    payload: Partial<T>,
  ) {
    const result = await this.repository.update(condition, payload);
    return new CustomResponseContent(result.affected, '更新成功');
  }

  async delete(
    condition: FindOneOptions<T> | string | number | (string | number)[],
  ) {
    const result = await this.repository.delete(condition);
    return new CustomResponseContent(result.affected, '删除成功');
  }

  /**
   * 软删除
   * 需要entity中包含deleteAt字段才行
   */
  async softDelete(
    condition: FindOneOptions<T> | string | number | (string | number)[],
  ) {
    const result = await this.repository.softDelete(condition);
    return new CustomResponseContent(result.affected, '删除成功');
  }
}
