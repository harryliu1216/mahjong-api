export class CustomResponseContent<T> {
  constructor(
    public data: T,
    public msg: string = 'ok',
    public code: number = 0,
  ) {}

  getmsg() {
    return this.msg;
  }

  setmsg(msg) {
    this.msg = msg;
  }

  getData() {
    return this.data;
  }

  setData(data) {
    this.data = data;
  }

  getCode() {
    return this.code || 0;
  }

  setCode(code) {
    this.code = code;
  }
}
