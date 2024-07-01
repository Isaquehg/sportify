import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register-user.dto';
import { User, UserSchema } from '../user/user.schema';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        private jwtService: JwtService
    ) {}

    async register(newUser: RegisterUserDto): Promise<User> {
        // Verify existing user
        const existingUser = await this.userModel.findOne({ email: newUser.email });
        if (existingUser) {
        throw new ConflictException('Email already in use!');
        }

        // Encrypt password
        const encryptedPassword = await bcrypt.hash(newUser.password, 10);

        // Save to MongoDB
        const createdUser = new this.userModel({ ...newUser, password: encryptedPassword });
        return await createdUser.save();
    }

    async login(loginDTO: LoginUserDto): Promise<{ token: string }> {
        const { email, password } = loginDTO;
        const user = await this.userModel.findOne({ email });
    
        // Verifying credentials
        if (!user) {
          throw new UnauthorizedException('Invalid Email!');
        }
    
        const correctPassoword = await bcrypt.compare(password, user.password);
    
        if (!correctPassoword) {
          throw new UnauthorizedException('Invalid Password!');
        }

        // Generates the token
        const token = this.jwtService.sign({ userId: user._id });
    
        return { token };
    }

}