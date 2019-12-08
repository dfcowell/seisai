import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
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

  @ManyToOne(
    type => User,
    user => user.photos,
  )
  user: User;

  @ManyToOne(
    type => Import,
    i => i.photos,
    { nullable: true },
  )
  import?: Import;

  @ManyToMany(type => Collection)
  @JoinTable()
  collections: Collection[];

  @Column({ type: 'varchar', length: '200', default: '' })
  title: string;

  @Column({ type: 'text', default: '' })
  description: string;

  @Column({ type: 'jsonb', default: {} })
  metadata: any;

  @Column({ type: 'integer', unsigned: true })
  size: number;

  @Column({ type: 'varchar', length: '255' })
  path: string;

  @Column({ type: 'varchar', length: '255' })
  originalFilename: string;
}
