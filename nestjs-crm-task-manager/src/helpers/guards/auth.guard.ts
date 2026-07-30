import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decarators/public.decorator';
import { AuthenticatedUser } from '../../utils/types/auth.types';
import { JwtService } from '@nestjs/jwt';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly loggerService: LoggerService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<{
      headers: Record<string, string | undefined>;
      user?: AuthenticatedUser;
    }>();

    const bearerToken = request.headers['Authorization'];
    if (!bearerToken) {
      this.loggerService.error('User is not authroized');
      throw new HttpException('Un authorized', HttpStatus.UNAUTHORIZED);
    }

    const jwtToken = bearerToken.split('Bearer ', 2);

    if (jwtToken.length < 2) {
      this.loggerService.error('Invalid token');
      throw new HttpException('Un authorized', HttpStatus.UNAUTHORIZED);
    }

    const data: AuthenticatedUser = await this.jwtService.verify(jwtToken[1]);

    request.user = data;

    return true;
  }
}
