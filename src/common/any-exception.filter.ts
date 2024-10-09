import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import BusinessException from './BusinessExcption';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException ||
      exception instanceof BusinessException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    let msg = exception.toString();

    if (exception instanceof UnauthorizedException) {
      msg = '未登录';
    }

    // 处理参数类型错误(ValidationPipe)
    if (exception instanceof BadRequestException) {
      const res: any = exception.getResponse();
      const message = res?.message || [];
      msg = message[0] || msg;
    }

    response.status(200).json({
      code: status,
      data: null,
      msg,
    });
  }
}
