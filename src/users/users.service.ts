import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';

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

  async createWithoutCheck(userDto) {
    return await this.usersRepository.save(userDto);
  }

  findOne(username: string) {
    return this.usersRepository.findOne({
      where: {
        username,
      },
    });
  }

  findBy(where: unknown) {
    return this.usersRepository.findOne({
      where,
    });
  }

  async update(loginedUser: User, userProfileDto: UpdateUserProfileDto) {
    const user = await this.findOne(loginedUser.username);
    const updatedUser = await this.usersRepository.save({
      ...user,
      thumnail: userProfileDto.thumnail,
    });
    delete updatedUser.password;
    return updatedUser;
  }

  async findOneWithoutPassword(id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = await this.usersRepository.findOne(id);
    return { ...rest };
  }
}
