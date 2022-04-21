import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { Payload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretkey',
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    const user = await this.usersService.findOneWithoutPassword(payload.sub);

    if (user) {
      return user;
    } else {
      throw new UnauthorizedException('인가 오류');
    }
  }
}
