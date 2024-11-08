import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomResponseContent } from './CustomResponseContent';

export interface Response<T> {
  code: number;
  data: T;
  msg: string;
}

@Injectable()
export class ExceptionInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    // if (
    //   request.url.includes('/wxServer/wxthread/wxserver/php') ||
    //   request.url.includes('/wechat')
    // ) {
    //   return next.handle().pipe((data) => {
    //     return data;
    //   });
    // }

    return next.handle().pipe(
      map((data) => {
        if (data instanceof CustomResponseContent) {
          return data;
        }

        // 当data结构为{data, msg}时, 使用data中的msg
        if (data && data.data && typeof data.msg === 'string') {
          return { code: 0, data: data.data, msg: data.msg };
        } else {
          return { code: 0, data, msg: 'ok' };
        }
      }),
    );
  }
}
