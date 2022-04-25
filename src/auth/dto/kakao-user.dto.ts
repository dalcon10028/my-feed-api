export class KakaoUserDto {
  id: number;
  connected_at?: Date;
  properties?: KakaoUserProperty;
}

interface KakaoUserProperty {
  nickname: string;
  profile_image: string;
  thumbnail_image: string;
}
