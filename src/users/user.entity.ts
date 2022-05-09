import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserProvider {
  DEFAULT = 'DEFAULT',
  KAKAO = 'KAKAO',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  nickname: string;

  @Column({
    type: 'enum',
    enum: UserProvider,
    default: UserProvider.DEFAULT,
  })
  provider: UserProvider;

  @Column()
  password: string;

  @Column({
    default: 'https://i.ibb.co/y5HVH48/584830f5cef1014c0b5e4aa1.png',
  })
  thumnail: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
