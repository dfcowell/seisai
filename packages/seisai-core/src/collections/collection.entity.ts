import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Tree,
  TreeParent,
  TreeChildren,
  TreeLevelColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from 'typeorm';
import { CollectionType } from './collection-type.enum';
import { PrivacyLevel } from 'src/privacy-level.enum';
import { Photo } from 'src/photos/photo.entity';

@Entity('collections')
@Tree('closure-table')
export class Collection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  slug: string;

  @Column({ length: 100 })
  name: string;

  @Column('text')
  description: string;

  @Column({
    enum: [CollectionType.Date, CollectionType.System, CollectionType.User],
  })
  type: CollectionType;

  @Column({
    enum: [PrivacyLevel.Private, PrivacyLevel.Public, PrivacyLevel.Unlisted],
    default: PrivacyLevel.Private,
  })
  privacy: PrivacyLevel;

  @TreeChildren()
  children: Collection[];

  @TreeParent()
  parent: Collection;

  @ManyToMany(
    type => Photo,
    photo => photo.collections,
  )
  @JoinTable()
  photos: Photo[];

  @CreateDateColumn()
  created: Date;
}
