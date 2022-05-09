import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { UserProvider } from '../user.entity';

export class UserDto {
  @ApiProperty({
    example: 'dalcon',
    description: '아이디',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  username: string;

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

  @ApiProperty({
    example: true,
    description: '신규 유저 여부',
  })
  @IsBoolean()
  @IsOptional()
  newbie: boolean;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    description: 'jwt 토큰',
  })
  @IsString()
  @IsOptional()
  token: string;

  @ApiProperty({
    example: '2022-04-17T19:00:52.829Z',
    description: '생성일',
  })
  @IsDate()
  @IsOptional()
  created_at: Date;

  @ApiProperty({
    example: '2022-04-17T19:00:52.829Z',
    description: '수정일',
  })
  @IsDate()
  @IsOptional()
  updated_at: Date;
}
