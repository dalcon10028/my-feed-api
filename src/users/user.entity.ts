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

  @Column({
    type: 'enum',
    enum: UserProvider,
    default: UserProvider.DEFAULT,
  })
  provider: UserProvider;

  @Column()
  password: string;

  @Column()
  thumnail: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
