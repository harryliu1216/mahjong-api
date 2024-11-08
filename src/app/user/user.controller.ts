import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { UserCreateDto, UserQueryDto, UserUpdateDto } from './user.dto';
import BusinessException from 'src/common/BusinessExcption';

@UseGuards(AuthGuard('jwt'))
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  getUser(@Query() payload: UserQueryDto) {
    return this.userService.findAll(payload);
  }

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

  @Patch('/')
  async updateUser(@Body() payload: UserUpdateDto) {
    return await this.userService.save(payload);
  }
}
