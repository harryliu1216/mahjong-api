import { IsNotEmpty, IsOptional } from 'class-validator';
import { BaseQueryDto } from 'src/common/dto/queryDto';
import { Condition } from 'src/common/typeorm/FindConditions/decorator/FindConditions';
import { Like } from 'typeorm';

export class UserCreateDto {
  @IsNotEmpty()
  nickname: string;

  @IsNotEmpty()
  phone: string;

  @IsOptional()
  balance: number;
}

export class UserUpdateDto extends UserCreateDto {
  @IsNotEmpty()
  id: number;

  @IsOptional()
  nickname: string;

  @IsOptional()
  phone: string;
}

export class UserQueryDto extends BaseQueryDto {
  @Condition({
    function: (val) => Like(`%${val}%`),
  })
  nickname: string;

  @IsOptional()
  phone: string;
}
