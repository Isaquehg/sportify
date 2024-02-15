import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUsersOnTermineDto } from './create-users-on-termine.dto';

export class UpdateUsersOnTermineDto extends PartialType(
  CreateUsersOnTermineDto,
) {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  terminId: number;

  @ApiProperty()
  status: 'pending' | 'confirmed' | 'canceled';
}
