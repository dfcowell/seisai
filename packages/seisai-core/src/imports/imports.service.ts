import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Import } from './import.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';

@Injectable()
export class ImportsService {
  constructor(
    @InjectRepository(Import)
    private readonly importRepository: Repository<Import>
  ) { }

  async createImportSession(user: User) {
    // We don't need to supply anything else here because the
    // ID and date on the import are generated in the DB.
    const result = await this.importRepository.insert({
      user
    });

    return result.identifiers.pop();
  }
}
