import { Module } from '@nestjs/common';
import { ImportsService } from './imports.service';
import { ImportsController } from './imports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Import } from './import.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([Import]),
    MulterModule.register({
      dest: process.env.UPLOAD_PATH || '/tmp/uploads'
    })
  ],
  providers: [ImportsService],
  controllers: [ImportsController]
})
export class ImportsModule { }
