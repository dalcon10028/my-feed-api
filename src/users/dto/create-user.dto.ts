import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { UserProvider } from '../user.entity';

export class CreateUserDto {
  @ApiProperty({
    example: 'dalcon',
    description: '아이디',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: '1028',
    description: '비밀번호',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
    description: '프로필 이미지 주소',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  thumnail: string;

  @ApiProperty({
    example: 'KAKAO',
    description: '계정 유형 - sns',
    required: false,
    default: 'DEFAULT',
  })
  @IsEnum(UserProvider)
  @IsOptional()
  provider: UserProvider;
}
