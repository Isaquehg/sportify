import { IsNotEmpty, IsBoolean, IsDateString, IsArray, ArrayMinSize, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { EventParticipantDto } from './event-participant.dto';

export class CreateEventDto {
  @IsNotEmpty()
  sport: string;

  @IsBoolean()
  status: boolean = true;

  @IsDateString()
  startAt: Date;

  @IsDateString()
  endAt: Date;

  @IsArray()
  @ArrayMinSize(0)
  @ValidateNested({ each: true })
  @Type(() => EventParticipantDto)
  participants: EventParticipantDto[];

  location: { type: string; coordinates: [number, number] };

  @IsNotEmpty()
  @IsNumber()
  maxParticipants: number;
}
