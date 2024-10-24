import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAccountDto } from '../account/account.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() body: LoginAccountDto) {
    const { username, password } = body;
    return this.authService.accountLogin(username, password);
  }
}
