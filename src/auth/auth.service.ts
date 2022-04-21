import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtLogin } from './dto/jwt-login.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

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
}
