import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Collection } from './collection.entity';
import { TreeRepository } from 'typeorm';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepository: TreeRepository<Collection>,
  ) {}

  async getAllCollections() {
    return this.collectionRepository.find();
  }

  async createCollection(data: Partial<Collection>) {
    const result = await this.collectionRepository.save({
      ...data,
    });

    return result;
  }
}
