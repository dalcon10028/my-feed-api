export interface KakaoUserAccount {
  profile: {
    is_default_image: boolean;
    nickname: string;
    profile_image_url: string;
    thumbnail_image_url: string;
  };
  profile_image_needs_agreement: boolean;
  profile_nickname_needs_agreement: boolean;
}

export interface KakaoUserProfile {
  connected_at: Date;
  id: number;
  kakao_account: KakaoUserAccount;
  properties: {
    nickname: string;
    profile_image: string;
    thumbnail_image: string;
  };
}

export interface KakaoLoginResponseDto {
  newbie: boolean;
  username: string;
  nickname: string;
  token: string;
}
