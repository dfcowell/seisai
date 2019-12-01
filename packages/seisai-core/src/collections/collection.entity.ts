import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Tree,
  TreeParent,
  TreeChildren,
  TreeLevelColumn,
} from 'typeorm';
import { CollectionType } from './collection-type.enum';
import { PrivacyLevel } from 'src/privacy-level.enum';

@Entity()
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
  })
  privacy: PrivacyLevel;

  @TreeChildren()
  children: Collection[];

  @TreeParent()
  parent: Collection;
}
