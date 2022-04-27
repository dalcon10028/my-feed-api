import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtLogin } from './dto/jwt-login.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import axios, { AxiosRequestConfig } from 'axios';
import { KakaoLoginDto } from './dto/kakao-login.dto';
import { KakaoUserDto } from './dto/kakao-user.dto';
import { UserProvider } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async jwtLogin({ username, password }: JwtLogin) {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new UnauthorizedException('아이디나 비밀번호를 확인해주세요');
    }

    // 패스워드 검증
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException('아이디나 비밀번호를 확인해주세요');
    }

    const payload = { username, sub: user.id };
    return { username, token: this.jwtService.sign(payload) };
  }

  async kakaoLogin(code: string) {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: 'https://kauth.kakao.com/oauth/token',
      params: {
        grant_type: 'authorization_code',
        client_id: process.env.KAKAO_REST_API_KEY,
        redirect_uri: process.env.KAKAO_REDIRECT_URL,
        code,
      },
    };
    const { access_token } = (await axios
      .request(config)
      .then((res) => res.data)) as KakaoLoginDto;

    const { properties, id } = (await axios
      .get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      })
      .then((res) => res.data)) as KakaoUserDto;

    let user = await this.usersService.findBy({
      username: `KAKAO#${id}`,
      provider: UserProvider.KAKAO,
    });

    if (!user) {
      user = await this.usersService.createWithoutCheck({
        username: `KAKAO#${id}`,
        nickname: properties.nickname,
        password: Date.now(),
        provider: UserProvider.KAKAO,
        thumnail: properties.thumbnail_image,
      });
    }
    const payload = { username: user.username, sub: user.id };
    return { username: user.username, token: this.jwtService.sign(payload) };
  }
}
