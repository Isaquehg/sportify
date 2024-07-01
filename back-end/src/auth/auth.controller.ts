import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { Public } from './utils/skip-auth.decorator';

@Public()
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('register')
    async register(@Body() registerDTO: RegisterUserDto) {
        return await this.authService.register(registerDTO);
    }

    @Post('login')
    async signin(@Body() loginUserDTO: LoginUserDto) {
        return await this.authService.login(loginUserDTO);
    }

}
