import { Controller, Post, Request, UseGuards, Get } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LocalAuthGuard } from './local.authguard';
import { RequireSessionGuard } from './require-session.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(new RequireSessionGuard())
  @Get()
  public getUser(@Request() req) {
    const { id, password, ...user } = req.user;

    return user;
  }

  @UseGuards(new LocalAuthGuard())
  @Post('login')
  public login(@Request() req) {
    const { id, password, ...user } = req.user;

    return user;
  }

  @Post('signup')
  public async signup(@Request() req) {
    const user = await this.usersService.createUser(
      req.body,
      req.body.password,
    );

    return user;
  }
}
