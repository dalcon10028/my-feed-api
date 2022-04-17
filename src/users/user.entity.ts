import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export type UserProvider = 'default' | 'kakao';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ['default', 'kakao'],
    default: 'default',
  })
  provider: UserProvider;

  @Column()
  nickname: string;

  @Column()
  password: string;

  @Column()
  thumnail: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
