import { Module } from '@nestjs/common';
import { ImportsService } from './imports.service';
import { ImportsController } from './imports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Import } from './import.entity';
import { MulterModule } from '@nestjs/platform-express';
import { PhotosModule } from 'src/photos/photos.module';
import { CollectionsModule } from 'src/collections/collections.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Import]),
    MulterModule.register({
      dest: process.env.UPLOAD_PATH || '/tmp/uploads',
      fileFilter: (req, file, cb) => cb(null, /^image\//.test(file.mimetype)),
      limits: {
        files: 1,
        fileSize: process.env.MAX_IMAGE_SIZE_BYTES
          ? Number(process.env.MAX_IMAGE_SIZE_BYTES)
          : 50 * 1000 * 1000,
      },
    }),
    CollectionsModule,
    PhotosModule,
  ],
  providers: [ImportsService],
  controllers: [ImportsController],
})
export class ImportsModule {}
