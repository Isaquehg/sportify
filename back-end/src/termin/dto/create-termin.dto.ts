import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTerminDto {
  @ApiProperty()
  @IsNotEmpty()
  sport: string;

  @ApiProperty()
  @IsNotEmpty()
  startAt: Date;

  @ApiProperty()
  @IsNotEmpty()
  endAt: Date;

  
}
