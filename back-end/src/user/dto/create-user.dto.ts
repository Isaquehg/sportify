import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  @MinLength(5)
  @ApiProperty({ required: true })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(300)
  @ApiProperty()
  password: string;

  @IsBoolean()
  @ApiProperty({ required: true, default: true })
  active: boolean;
}
