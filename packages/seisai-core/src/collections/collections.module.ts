import { Module } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CollectionsController } from './collections.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collection } from './collection.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Collection])],
  exports: [CollectionsService],
  providers: [CollectionsService],
  controllers: [CollectionsController],
})
export class CollectionsModule {}
