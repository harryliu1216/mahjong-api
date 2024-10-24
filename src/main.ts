import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { AllExceptionsFilter } from './common/any-exception.filter';
import { ExceptionInterceptor } from './common/exception.interceptor';
import config from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalInterceptors(new ExceptionInterceptor());

  await app.listen(config.port);
}
bootstrap();
