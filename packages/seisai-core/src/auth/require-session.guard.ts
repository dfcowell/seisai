import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class RequireSessionGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    if (request.user) {
      return true;
    }

    return false;
  }
}
