import { IsOptional } from 'class-validator';

export class BaseQueryDto {
  @IsOptional()
  page: number;

  @IsOptional()
  pageSize: number;
}
