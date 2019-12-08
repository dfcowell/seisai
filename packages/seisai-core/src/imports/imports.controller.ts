import { Controller, Request, UseGuards, Post } from '@nestjs/common';
import { ImportsService } from './imports.service';
import { RequireSessionGuard } from 'src/auth/require-session.guard';

@Controller('imports')
@UseGuards(new RequireSessionGuard())
export class ImportsController {
  constructor(
    private readonly importsService: ImportsService
  ) { }

  @Post()
  public async createImportSession(@Request() req) {
    const sessionId = await this.importsService.createImportSession(req.user);

    return { sessionId };
  }
}
