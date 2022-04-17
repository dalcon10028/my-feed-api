import { Controller, Post, Put } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Post()
  async signup() {
    return 'signup';
  }

  @Post('login')
  login() {
    return 'login';
  }

  @Post('logout')
  logout() {
    return 'logout';
  }

  @Put('upload/thumnail')
  uploadThumnail() {
    return 'upload thumnail';
  }
}
