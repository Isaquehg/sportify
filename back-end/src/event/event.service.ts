import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './event.schema';
import { User } from '../user/user.schema';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event>,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    const createdEvent = new this.eventModel(createEventDto);
    return await createdEvent.save();
  }

  async findAllOpenEvents(): Promise<Event[]> {
    return await this.eventModel.find({ status: true }).exec();
  }

  async findEventById(eventId: string): Promise<Event> {
    const event = await this.eventModel.findById(eventId).exec();
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }

  async registerForEvent(eventId: string, userId: string): Promise<Event> {
    // Find event by ID
    const event = await this.findEventById(eventId);

    // Validating Event registering
    if (!event.status) {
      throw new BadRequestException('Event is not open for registrations');
    }

    if (event.participants.find(participant => participant.userId.toString() === userId)) {
      throw new ConflictException('User is already registered for this event');
    }

    if (!this.areSlotsAvailable(eventId)) {
      throw new ForbiddenException('Event is already full');
    }

    // Add user to event players
    event.participants.push({ userId: new Types.ObjectId(userId) });

    // Saving event
    return await event.save();
  }

  async unregisterFromEvent(eventId: string, userId: string): Promise<Event> {
    const event = await this.findEventById(eventId);

    // Remove user from participants list
    event.participants = event.participants.filter(participant => participant.userId.toString() !== userId);

    return await event.save();
  }

  async areSlotsAvailable(eventId: string): Promise<boolean> {
    const event = await this.findEventById(eventId);

    // Max players allowed
    const maxParticipants = event.maxParticipants;

    // Subscribed participants
    const currentParticipants = event.participants.length;

    return currentParticipants < maxParticipants;
  }

  async findEventBySport(sport: string): Promise<Event[]> {
    return this.eventModel.find({ sport, status: true }).exec();
  }

  async closeEvent(eventId: string): Promise<Event> {
    const event = await this.findEventById(eventId);

    // Update event to closed
    event.status = false;

    await event.save();

    // Add game to user profile
    for (const participant of event.participants) {
      await this.userModel.findByIdAndUpdate(
        participant.userId,
        { $push: { playedGames: eventId } }, // Add game ID
        { new: true }
      );
    }

    return event;
  }

}

