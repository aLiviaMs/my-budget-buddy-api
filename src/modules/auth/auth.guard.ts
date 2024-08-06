// Libs
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

// Envs
import { env } from 'src/shared/config/env';
import { IS_PUBLIC_KEY } from 'src/shared/decorators/IsPublic';

/**
 * `AuthGuard` is a custom guard implementing `CanActivate` to protect routes.
 *
 * It checks for JWT tokens in the authorization header of incoming requests.
 * If a valid token is found, the request is allowed to proceed. Otherwise, it throws
 * an `UnauthorizedException`.
 *
 * @remarks
 * The guard uses `Reflector` to check if the `@IsPublic()` decorator is applied to a route,
 * allowing it to bypass authentication if necessary.
 *
 * @see {@link JwtService} for JWT token verification.
 * @see {@link IS_PUBLIC_KEY} for checking if a route is public.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private _jwtService: JwtService,
    private _reflector: Reflector
  ) {}

  /**
   * Determines if an incoming request can proceed to the route handler.
   *
   * @param context - The execution context of the request.
   * @returns A boolean indicating if the request is authorized.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Check if the route is marked as public
    const isPublic = this._reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getClass(), context.getHandler()]);

    // Allow the request if the route is public
    if (isPublic) return true;

    // Extract the request object from the context
    const request = context.switchToHttp().getRequest<Request>();
    // Attempt to extract the token from the request header
    const token = this._extractTokenFromHeader(request);

    // If no token is found, deny the request
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      // Verify the token
      const payload = await this._jwtService.verifyAsync(token, {
        secret: env.JWT_SECRET
      });

      // Assign the payload's subject (usually user ID) to the request object
      request['userId'] = payload.sub;
    } catch {
      // If token verification fails, deny the request
      throw new UnauthorizedException();
    }
    return true;
  }

  /**
   * Extracts the JWT token from the authorization header of the request.
   *
   * @param request - The incoming request object.
   * @returns The extracted token, or `undefined` if no valid token is found.
   */
  private _extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
