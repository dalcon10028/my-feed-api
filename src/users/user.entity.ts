import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export type UserProvider = 'default' | 'kakao'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({
        type: 'enum',
        enum: ['default', 'kakao'],
        default: 'default'
    })
    provider: UserProvider;

    @Column()
    nickname: string;
    
    @Column()
    password: string;
    
    @Column()
    thumnail: string;
    
    @Column({ type: 'timestamptz' })
    created_at: Date;
    
    @Column({ type: 'timestamptz' })
    updated_at: Date;
}