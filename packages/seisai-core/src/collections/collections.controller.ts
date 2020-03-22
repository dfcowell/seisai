import {
  Controller,
  UseGuards,
  Get,
  Post,
  Request,
  Param,
} from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { RequireSessionGuard } from 'src/auth/require-session.guard';
import { PrivacyLevel } from 'src/privacy-level.enum';

@Controller('collections')
@UseGuards(new RequireSessionGuard())
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Get()
  public async listCollections() {
    return this.collectionsService.getAllCollections();
  }

  @Get('/imports')
  public async listImports() {
    return this.collectionsService.getImports();
  }

  @Get('/shortcuts')
  public async getShortcuts() {
    const collections = [];

    const lastImport = await this.collectionsService.getLastImport();

    if (lastImport) {
      collections.push({ id: lastImport.id, name: 'Last Import' });
    }

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
