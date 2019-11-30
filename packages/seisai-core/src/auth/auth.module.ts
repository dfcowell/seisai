import { Module } from '@nestjs/common';

import { UsersModule } from 'src/users/users.module';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { LocalSerializer } from './local.serializer';
import { LocalAuthGuard } from './local.authguard';

@Module({
  imports: [UsersModule],
  providers: [AuthService, LocalStrategy, LocalSerializer, LocalAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
