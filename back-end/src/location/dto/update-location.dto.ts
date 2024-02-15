import { ApiProperty } from '@nestjs/swagger';

export class UpdateLocationDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  adress?: string;

  @ApiProperty()
  latitude?: number;

  @ApiProperty()
  longitude?: number;

  @ApiProperty()
  observation?: string;

  @ApiProperty()
  sportsList?: string[];
}
