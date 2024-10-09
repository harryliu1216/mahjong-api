import { getConnection, getManager, ValueTransformer } from "typeorm";

export type Raw2EntityOptions = {
  table: any;
  relations: string[]; // relations 中的会转成嵌套结构，没有的则会忽略前缀，如果存在重复 则不去前缀
};
/* 
    将扁平结构转成嵌套结构
    查询结果key有两种类型
    1. 主表字段为原始字段 eg: name 、id
    2. 主表字段为组合名称 eg: table_name、table_id （出现在createBuilder查询）
*/
export const raw2Entity = (object: { [key: string]: any }, options: Raw2EntityOptions) => {
  const connection = getConnection()
  const metaData = connection.entityMetadatas.find(item => item.tableName == options.table)
  const result = {};
  const tableRegExp = new RegExp(options.table + '_(.*)');
  const relRegExp = new RegExp('(' + options.relations.join('|') + ')_(.*)');
  let m;
  for (let key in object) {
    let value = object[key];
    if ((m = key.match(relRegExp))) {
      // 关联表的字段
      result[m[1]] = typeof result[m[1]] === 'object' && result[m[1]] != null ? result[m[1]] : {};
      result[m[1]][m[2]] = object[key];
    } else {
      // 主表的字段
      m = key.match(tableRegExp)
      let originKey = m ? m[1] : key

      // 跳过关联字段
      if (options.relations.includes(originKey)) {
        continue
      }

      // 查询字段是否有转换逻辑
      const column = metaData.columns.find(item => item.propertyName == originKey)
      if (column && column.transformer) {
        value = (column.transformer as ValueTransformer).from(value)
      }
      result[originKey] = value
    }
  }
  return result;
};
