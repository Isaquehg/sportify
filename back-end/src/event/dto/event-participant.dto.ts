import { IsNotEmpty } from 'class-validator';

export class EventParticipantDto {
  @IsNotEmpty()
  userId: string;
}
