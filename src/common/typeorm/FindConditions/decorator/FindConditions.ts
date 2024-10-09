import { getMetadataArgsStorage } from '../../MetadataArgsStorage';

export interface ConditionOptions {
  function: Function;
  defaultValue?: any;
  validate?: Function[];
  field?: string;
}

/**
 * @example
 *
 * @Condition({
 *    function:(val,allValues,fieldKey)=>Like(`%${val}%`),
 *    defaultValue:'',
 *    field: '', // 可以使用不同于列名字段
 *    validate:[InNotNull('不能为空'),Max(6,'长度不能超过6')]
 * })
 */
export function Condition(options?: ConditionOptions) {
  return (object, propertyName) => {
    getMetadataArgsStorage().addColumn(object.constructor, propertyName, options || {});
  };
}
