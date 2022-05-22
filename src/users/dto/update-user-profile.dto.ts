import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';

export class UpdateUserProfileDto {
  @ApiProperty({
    example: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
    description: '프로필 이미지 주소',
    required: false,
  })
  @IsUrl()
  thumnail: string;
}
