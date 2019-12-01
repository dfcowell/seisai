import { Controller, UseGuards, Get, Post, Request } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { RequireSessionGuard } from 'src/auth/require-session.guard';
import { PrivacyLevel } from 'src/privacy-level.enum';

@Controller('collections')
@UseGuards(new RequireSessionGuard())
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Get()
  public async listCollections() {
    const collections = await this.collectionsService.getAllCollections();

    return collections;
  }

  @Post()
  public async createCollection(@Request() req) {
    const result = await this.collectionsService.createCollection({
      ...req.body,
      type: 'user',
      privacy: req.body.privacy || PrivacyLevel.Private,
    });

    return result;
  }
}
