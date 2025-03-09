import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Missing Authorization header');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Invalid Authorization format');
    }

    try {
      request.user = this.jwtService.verify(token, { secret: 'secret' }); // 👈 Ensure secret key is used here!
      console.log("✅ Token Verified:", request.user);
      return true;
    } catch (error) {
      console.error("❌ Token Verification Failed:", error.message);
      throw new UnauthorizedException("Invalid or expired token");
    }
  }
  validateToken(token: string) {
    try {
        const decoded = this.jwtService.verify(token);
        return { userId: decoded.sub, email: decoded.email }; // ✅ Ensure `sub` (user ID) is extracted
    } catch (err) {
        throw new UnauthorizedException('Invalid or expired token');
    }
}

}
