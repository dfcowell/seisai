import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: User, done: CallableFunction) {
    console.log('serializeUser', user);
    done(null, user.id);
  }

  async deserializeUser(userId: string, done: CallableFunction) {
    try {
      const { password, ...user } = await this.usersService.findUserById(
        Number(userId),
      );

      done(null, user);
    } catch (err) {
      return done(err);
    }
  }
}
