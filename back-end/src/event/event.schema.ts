import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class EventParticipant {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) // Reference to User schema
  userId: Types.ObjectId;
}

@Schema({ collection: 'events' })
export class Event extends Document {
  @Prop({ required: true })
  sport: string;

  @Prop({ default: true })
  status: boolean;

  @Prop({ required: true })
  startAt: Date;

  @Prop({ required: true })
  endAt: Date;

  @Prop({ type: [EventParticipant], default: [] }) // Event Participants
  participants: EventParticipant[];

  @Prop({ type: { type: String }, coordinates: [Number] }) // Geographic Coordinates
  location: { type: string; coordinates: [number, number] };

  @Prop({ required: true })
  maxParticipants: number;
}

export const EventSchema = SchemaFactory.createForClass(Event);
