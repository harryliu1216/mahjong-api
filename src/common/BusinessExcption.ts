const isProduction = process.env.NODE_ENV === 'production';

export default class BusinessException extends Error {
  message: string;
  status: number;
  constructor(message, status = -1) {
    super();
    this.message = BusinessException.getMessage(message);
    this.status = status;
  }
  getMessage() {
    return this.message;
  }
  toString() {
    return this.getMessage();
  }
  getStatus() {
    return this.status;
  }
  static getMessage(message) {
    if (message instanceof Error) {
      // 如果是生产将错误隐藏
      if (isProduction) {
        return message.message;
      } else {
        return message;
      }
    }
    return message;
  }
}
