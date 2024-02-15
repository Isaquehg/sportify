import { ApiProperty } from '@nestjs/swagger';

export class CreateUsersOnTermineDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  terminId: number;
}
