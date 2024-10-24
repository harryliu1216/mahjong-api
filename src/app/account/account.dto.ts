import { IsNotEmpty, IsOptional } from 'class-validator';
import { BaseQueryDto } from 'src/common/dto/queryDto';

export class AccountQueryDto extends BaseQueryDto {
  @IsOptional()
  nickname: string;

  @IsOptional()
  account: string;
}

export class LoginAccountDto {
  @IsNotEmpty({
    message: '账号不能为空',
  })
  readonly username: string;

  @IsNotEmpty({
    message: '密码不能为空',
  })
  password: string;
}
