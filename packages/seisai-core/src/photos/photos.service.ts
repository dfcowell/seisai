import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './photo.entity';
import { Repository } from 'typeorm';
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
}
