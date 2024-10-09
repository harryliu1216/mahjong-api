import { getMetadataArgsStorage } from '../MetadataArgsStorage';

export type PlaintoFindConditionsptions = {
  containsEmpty?: Boolean;
};

export const plaintoFindConditions = (
  target,
  object = {},
  options: PlaintoFindConditionsptions = { containsEmpty: false }
) => {
  const table = getMetadataArgsStorage().getTarget(target) || {};

  const where = {};
  if (table && table.columns) {
    const fieldMap = {};
    for (let key in table.columns) {
      if (table.columns[key].field) {
        fieldMap[table.columns[key].field] = key;
      }
    }
    for (let key in object) {
      const value = object[key];
      let col = table.columns[key];
      let whereKey = key;
      if (!col) {
        col = table.columns[fieldMap[key]];
        whereKey = fieldMap[key];
      }
      if (col) {
        if (
          options.containsEmpty ||
          (!options.containsEmpty && value !== '' && value !== undefined)
        ) {
          const func = col.function;
          where[whereKey] = func(value, object, key);
        }
      } else {
        console.warn('对应字段没有设置查询无法自动关联，默认忽略了此字段:', key);
      }
    }
  } else {
    // 没有配置查询字段返回空，则视为无查询条件
    console.log('没有找到对应的实体，无法转换查询条件', target, table);
    return {};
  }
  return where;
};
