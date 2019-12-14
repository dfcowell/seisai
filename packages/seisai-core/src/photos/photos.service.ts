import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { createReadStream } from 'fs';

import { Photo } from './photo.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
  ) {}

  async addPhoto(file: Express.Multer.File, user: User, importId?: number) {
    const { identifiers } = await this.photoRepository.insert({
      size: file.size,
      user: user,
      import: importId ? { id: importId } : undefined,
      originalFilename: file.originalname,
      path: file.path,
    });

    return identifiers.pop();
  }

  getPhotoCount() {
    return this.photoRepository.count();
  }

  getPhotosFromId(id: number, count: number) {
    return this.photoRepository.find({
      where: { id: MoreThan(id) },
      take: count,
    });
  }

  getPhotoById(id: number) {
    return this.photoRepository.findOne(id);
  }

  async getPhotoStreamById(id: number) {
    const photo = await this.getPhotoById(id);

    if (!photo) {
      throw new NotFoundException();
    }

    return createReadStream(photo.path);
  }
}
