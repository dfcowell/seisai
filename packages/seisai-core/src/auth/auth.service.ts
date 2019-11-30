import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UsersService } from 'src/users/users.service';
import { verify } from 'argon2';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  public async validateUser(username: string, plainTextPassword: string) {
    const user = await this.usersService.findUserByUsername(username);

    if (!user || !user.password) {
      throw new UnauthorizedException();
    }

    const match = await verify(user.password, plainTextPassword);

    if (!match) {
      throw new UnauthorizedException();
    }

    const { password, ...result } = user;

    return result;
  }
}
