import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Import } from 'src/imports/import.entity';
import { Collection } from 'src/collections/collection.entity';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne(type => User, user => user.photos)
  user: User;

  @ManyToOne(type => Import, i => i.photos)
  import: Import;

  @ManyToMany(type => Collection)
  @JoinTable()
  collections: Collection[];

  @Column({ type: "varchar", length: "200" })
  title: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "jsonb" })
  metadata: any;
}
