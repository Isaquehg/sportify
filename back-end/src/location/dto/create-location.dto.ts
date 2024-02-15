import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  adress: string;

  @ApiProperty()
  latitude: number;

  @ApiProperty()
  longitude: number;

  @ApiProperty()
  observation: string;

  @ApiProperty()
  sportsList: string[];
}
