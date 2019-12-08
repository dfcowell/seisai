import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Photo } from 'src/photos/photo.entity';

@Entity()
export class Import {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created: Date;

  @ManyToOne(type => User, user => user.imports)
  user: User;

  @OneToMany(type => Photo, photo => photo.import)
  photos: Photo[];

  @Column({ type: "int", default: 0 })
  photoCount: number;
}
