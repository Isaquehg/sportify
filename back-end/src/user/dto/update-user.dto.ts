import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsBoolean,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  email?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  @MinLength(5)
  @ApiProperty({ required: true })
  name?: string;

  @IsString()
  @MinLength(8)
  @MaxLength(300)
  @ApiProperty()
  password?: string; // Optional for password updates

  @IsBoolean()
  @ApiProperty({ required: true })
  active?: boolean;
}
