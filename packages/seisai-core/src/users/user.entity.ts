import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 60, unique: true })
  username: string;

  @Column({ length: 100 })
  displayName: string;

  @Column('text')
  bio: string;

  @Column({ length: 200, unique: true })
  email: string;

  @Column({ length: 95 })
  password: string;
}
