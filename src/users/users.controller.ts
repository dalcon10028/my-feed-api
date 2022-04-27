import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Redirect,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { JwtLogin } from 'src/auth/dto/jwt-login.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 201,
    description: '회원가입 성공',
    type: UserDto,
  })
  @Post()
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: '이메일 로그인' })
  @Post('login')
  logIn(@Body() jwtLogin: JwtLogin) {
    return this.authService.jwtLogin(jwtLogin);
  }

  @ApiOperation({ summary: '카카오 로그인' })
  @Get('kakao/login')
  kakaoLogIn(@Res() res) {
    const hostName = 'kauth.kakao.com';
    const clientId = process.env.KAKAO_REST_API_KEY;
    const redirectUri = process.env.KAKAO_REDIRECT_URL;
    const url = `https://${hostName}/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
    return res.redirect(url);
  }

  @ApiOperation({ summary: '카카오 로그인 리다이렉트' })
  @Get('kakao/redirect')
  async kakaoRedirect(@Query('code') code, @Res() res) {
    const { token } = await this.authService.kakaoLogin(code);
    // return token;
    return res.redirect(`${process.env.CLIENT_URL}?token=${token}`);
  }

  @ApiOperation({ summary: '유저 정보' })
  @ApiResponse({
    status: 200,
    description: '유저 정보 받기 성공',
    type: UserDto,
  })
  @ApiResponse({
    status: 401,
    description: '인가 오류',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getCurrentUser(@CurrentUser() user) {
    return user;
  }

  @ApiOperation({ summary: '프로필 사진 업로드' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('upload/thumnail')
  uploadThumnail() {
    return 'upload thumnail';
  }
}
