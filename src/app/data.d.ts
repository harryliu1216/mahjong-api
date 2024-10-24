export type ListResponse<T> = {
  list: T[];
  count: number;
  page: number;
  pageSize: number;
};

export type ListRequestParams = {
  page?: number;
  pageSize?: number;
  // skip?: number;
};

declare interface AnyObject {
  [key: string]: any;
}
