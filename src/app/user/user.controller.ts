import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import type { UserCreateDto, UserQueryDto } from './user.dto';
import BusinessException from 'src/common/BusinessExcption';

@UseGuards(AuthGuard('jwt'))
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  async createUser(@Body() payload: UserCreateDto) {
    try {
      const result = await this.userService.save(payload);
      return result;
    } catch (err) {
      if (err.errno === 1062) {
        throw new BusinessException('该手机号已注册');
      } else {
        throw err;
      }
    }
  }

  @Get('/')
  getUser(@Query() payload: UserQueryDto) {
    return this.userService.findAll(payload);
  }
}
