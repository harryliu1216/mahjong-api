import { IsNumberString, IsString } from 'class-validator';

export class FindOneParams {
  @IsString({
    message: 'ID不能为空'
  })
  id: string;
}
