import { Test, TestingModule } from '@nestjs/testing';
import { ImportsService } from './imports.service';

describe('ImportsService', () => {
  let service: ImportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImportsService],
    }).compile();

    service = module.get<ImportsService>(ImportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
