export class KakaoLoginDto {
  access_token: string;
  token_type: string;
  refresh_token: string;
  id_token?: string;
  expires_in: number;
  scope?: string;
  refresh_token_expires_in: string;
}
