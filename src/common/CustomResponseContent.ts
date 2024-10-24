export class CustomResponseContent {
  constructor(
    private data,
    private message: string = 'ok',
    private code: number = 0,
  ) {}

  getMessage() {
    return this.message;
  }

  setMessage(message) {
    this.message = message;
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
