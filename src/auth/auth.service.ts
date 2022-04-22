import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtLogin } from './dto/jwt-login.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private httpService: HttpService,
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

  kakaoLogin(code: string): Observable<AxiosResponse<any, any>> {
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
    return this.httpService
      .request(config)
      .pipe(map((response) => response.data));
  }
}
