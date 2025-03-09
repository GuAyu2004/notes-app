import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ✅ Signup Endpoint
  @Post('signup')
  async signup(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    const newUser = await this.authService.signup(email, password);
    return { message: 'User registered successfully', user: newUser };
  }

  // ✅ Login Endpoint
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    const access_token = await this.authService.login(email, password);
    console.log(access_token)
    // return { message: 'Login successfuuul', access_token, email };
    return { 
      message: 'Login successful', 
      email,  // Add email here
      access_token 
  };
  }
  
  
}
