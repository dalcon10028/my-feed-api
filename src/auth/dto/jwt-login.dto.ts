import { PickType } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';

export class JwtLogin extends PickType(User, [
  'username',
  'password',
] as const) {}
