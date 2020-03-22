import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Collection } from './collection.entity';
import { TreeRepository } from 'typeorm';
import { Photo } from 'src/photos/photo.entity';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepository: TreeRepository<Collection>,
  ) {}

  async createCollection(data: Partial<Collection>) {
    const result = await this.collectionRepository.save({
      ...data,
    });

    return result;
  }

  getAllCollections() {
    return this.collectionRepository.find();
  }

  getImports() {
    return this.collectionRepository.find({
      where: { type: 'import' },
    });
  }

  async getLastImport() {
    const result = await this.collectionRepository.find({
      where: {
        type: 'import',
      },
      order: { created: 'DESC' },
      take: 1,
    });

    return result.pop();
  }

  getCollectionById(id: number) {
    return this.collectionRepository.findOneOrFail({ id });
  }

  link(collectionId: number, photoId: number) {
    this.collectionRepository
      .createQueryBuilder()
      .relation('photos')
      .of(collectionId)
      .add(photoId);
  }
}
