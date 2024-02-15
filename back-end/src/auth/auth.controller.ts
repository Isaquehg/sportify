import { AuthService } from './auth.service';
import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  signin() {
    return { message: 'Signin' };
  }

  @Post('register')
  signup() {
    return { message: 'Signup' };
  }
}
