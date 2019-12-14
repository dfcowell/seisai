import {
  Controller,
  Get,
  UseGuards,
  Param,
  NotFoundException,
  Response,
  Query,
} from '@nestjs/common';
import sharp from 'sharp';

import { RequireSessionGuard } from 'src/auth/require-session.guard';
import { PhotosService } from './photos.service';
import { Stream } from 'stream';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Get()
  @UseGuards(new RequireSessionGuard())
  async allPhotos(@Param('from') fromId, @Param('count') selectCount) {
    const id = fromId || 0;
    const boundedCount = Math.min(100, selectCount || 100);

    const count = await this.photosService.getPhotoCount();
    const photos = await this.photosService.getPhotosFromId(id, boundedCount);

    return { count, photos: photos.map(({ path, ...rest }) => rest) };
  }

  /**
   * Returns an image file (optionally resized) containing the photo.
   * @param id The numeric ID of the photo in the library to retrieve
   * @param size The size of the image to return specified as pixels along the longest edge
   */
  @Get(':id/image')
  @UseGuards(new RequireSessionGuard())
  //@Header('Content-Type', 'image/webp')
  async getPhotoFile(@Param('id') id, @Query('size') size, @Response() res) {
    const stream = await this.photosService.getPhotoStreamById(id);

    const output: Stream = await new Promise((resolve, reject) => {
      let processor = sharp().rotate();

      if (size) {
        const bounds = size.split(',').map(n => parseInt(n, 10));
        processor = processor.resize(bounds[0], bounds[1] || bounds[0], {
          fit: 'inside',
        });
      }

      stream.on('error', () => {
        reject(new NotFoundException());
      });

      stream.on('open', () => {
        resolve(stream.pipe(processor.webp()));
      });
    });

    output.pipe(res);
  }
}
