import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async signup(email: string, password: string) {
    return this.usersService.create(email, password);
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findOne(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign({ email });
    return token;
  }
  

}
