export type WhereOption = {
  function?: Function;
};

export class MetadataArgsStorage {
  protected tables: {
    target: Function;
    columns: {
      key?: string;
    };
  }[] = [];

  public addColumn(target, key, options: WhereOption = {}) {
    let table = this.getTarget(target);
    if (!table) {
      table = { target, columns: {} };
      this.tables.push(table);
    }
    if (!options.function) {
      options.function = (val) => val;
    }
    table.columns[key] = options;
  }
  public getTarget(target: Function) {
    return this.tables.find(({ target: tar }) => tar == target);
  }
}

export const getMetadataArgsStorage = () => {
  if (!global._MetadataArgsStorage) {
    global._MetadataArgsStorage = new MetadataArgsStorage();
  }

  return global._MetadataArgsStorage;
};
