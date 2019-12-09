import {
  Controller,
  Request,
  UseGuards,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImportsService } from './imports.service';
import { RequireSessionGuard } from 'src/auth/require-session.guard';
import { PhotosService } from 'src/photos/photos.service';

@Controller('imports')
@UseGuards(new RequireSessionGuard())
export class ImportsController {
  constructor(
    private readonly importsService: ImportsService,
    private readonly photosService: PhotosService,
  ) {}

  @Post()
  public async createImportSession(@Request() req) {
    const { id } = await this.importsService.createImportSession(req.user);

    return { sessionId: id };
  }

  @Post(':id/photos')
  @UseInterceptors(FileInterceptor('file'))
  public async importPhoto(
    @Request() req,
    @Param('id') sessionId,
    @UploadedFile() file,
  ) {
    await this.importsService.incrementPhotoCount(sessionId);
    const photoId = await this.photosService.addPhoto(
      file,
      req.user,
      sessionId,
    );

    return { photoId };
  }
}
