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
  constructor(private readonly importsService: ImportsService) {}

  @Post()
  public async createImportSession(@Request() req) {
    const sessionId = await this.importsService.createImportSession(req.user);

    return { sessionId };
  }

  @Post(':id/photos')
  @UseInterceptors(FileInterceptor('file'))
  public async importPhoto(
    @Request() req,
    @Param('id') sessionId,
    @UploadedFile() file,
  ) {
    const photo = await this.importsService.importPhoto(
      req.user,
      sessionId,
      file,
    );

    return photo;
  }
}
