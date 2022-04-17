import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    const isUserExist = await this.usersRepository.findOne({
      where: {
        username,
      },
    });
    if (isUserExist)
      throw new UnauthorizedException('해당 유저가 이미 존재합니다.');

    const saltOrRounds = 7;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const user = await this.usersRepository.save({
      ...createUserDto,
      password: hashedPassword,
    });
    return { ...user, password: null };
  }
}
