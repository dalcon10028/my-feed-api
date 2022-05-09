import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtLogin } from './dto/jwt-login.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { UserProvider } from 'src/users/user.entity';
import {
  KakaoLoginResponseDto,
  KakaoUserAccount,
  KakaoUserProfile,
} from 'src/users/dto/kakao-profile.dto';
import { UserDto } from 'src/users/dto/user.dto';

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

  async kakaoLogin(userProfile: KakaoUserProfile): Promise<UserDto> {
    let isNewbie = false;
    let user = await this.usersService.findBy({
      username: `KAKAO#${userProfile.id}`,
      provider: UserProvider.KAKAO,
    });

    if (!user) {
      user = await this.usersService.createWithoutCheck({
        username: `KAKAO#${userProfile.id}`,
        nickname: userProfile.kakao_account.profile.nickname,
        password: Date.now(),
        provider: UserProvider.KAKAO,
        thumnail: userProfile.kakao_account.profile.profile_image_url,
      });
      isNewbie = true;
    }
    const payload = { username: user.username, sub: user.id };

    delete user.password;
    return {
      ...user,
      newbie: isNewbie,
      token: this.jwtService.sign(payload),
    };
  }
}
