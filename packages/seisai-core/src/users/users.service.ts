import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash, verify } from 'argon2';
import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findUserByUsername(username: string) {
    return this.userRepository.findOne({ username });
  }

  async findUserById(id: number) {
    return this.userRepository.findOne({ id });
  }

  async createUser(data: Partial<User>, plainTextPassword?: string) {
    const { password, ...userData } = data;
    let hashedPassword = '';

    if (plainTextPassword) {
      hashedPassword = await hash(plainTextPassword);
    }

    try {
      const result = await this.userRepository.insert({
        bio: '',
        displayName: userData.displayName || userData.username,
        ...userData,
        password: hashedPassword,
      });

      if (result.identifiers.length) {
        return userData;
      }
    } catch (err) {
      if (err.code === '23505') {
        throw new HttpException(
          { message: 'Username or email address already exists.' },
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    throw new Error('Failed to insert user data.');
  }

  async updateUser(data: Partial<User>, plainTextPassword?: string) {
    const { password, id, ...update } = data;

    if (plainTextPassword) {
      (update as Partial<User>).password = await hash(plainTextPassword);
    }

    const result = await this.userRepository.update({ id: data.id }, update);

    return result.affected;
  }
}
