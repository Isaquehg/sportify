import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTerminDto } from './create-termin.dto';

export class UpdateTerminDto extends PartialType(CreateTerminDto) {
  @ApiProperty()
  id: number;

  @ApiProperty()
  sport?: string;

  @ApiProperty()
  locationId?: number;

  @ApiProperty()
  startAt?: Date;

  @ApiProperty()
  endAt?: Date;
}
