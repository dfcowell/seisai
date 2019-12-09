import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Import } from 'src/imports/import.entity';
import { Photo } from 'src/photos/photo.entity';

@Entity('users')
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

  @OneToMany(
    type => Import,
    i => i.user,
  )
  imports: Import[];

  @OneToMany(
    type => Photo,
    photo => photo.user,
  )
  photos: Photo[];
}
