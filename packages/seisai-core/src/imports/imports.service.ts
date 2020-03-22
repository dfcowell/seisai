import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { CollectionsService } from 'src/collections/collections.service';
import moment = require('moment');
import { PhotosService } from 'src/photos/photos.service';
import { CollectionType } from 'src/collections/collection-type.enum';

@Injectable()
export class ImportsService {
  constructor(
    private readonly collectionsService: CollectionsService,
    private readonly photosService: PhotosService,
  ) {}

  async createImportSession(user: User) {
    const now = moment();

    const result = await this.collectionsService.createCollection({
      name: now.format(`YYYY-MM-DD h:mm A`),
      slug: now.format(`import-YYYY-MM-DD-h-mm-a`),
      description: `Import session started by ${
        user.displayName
      } at ${now.format('dddd, MMMM Do YYYY, h:mm:ss A')}`,
      type: CollectionType.Import,
    });

    return result.id;
  }

  async importPhoto(user: User, sessionId: number, file: Express.Multer.File) {
    const photo = await this.photosService.addPhoto(file, user);

    await this.collectionsService.link(sessionId, photo.id);

    return photo;
  }
}
