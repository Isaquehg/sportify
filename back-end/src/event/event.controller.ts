import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './event.schema';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('create')
  async createEvent(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return this.eventService.createEvent(createEventDto);
  }

  @Get('open')
  async findAllOpenEvents(): Promise<Event[]> {
    return this.eventService.findAllOpenEvents();
  }

  @Get(':id')
  async findEventById(@Param('id') eventId: string): Promise<Event> {
    return this.eventService.findEventById(eventId);
  }

  @Post(':id/register')
  async registerForEvent(@Param('id') eventId: string, @Body() body: { userId: string }): Promise<Event> {
    const { userId } = body;
    return this.eventService.registerForEvent(eventId, userId);
  }
  
  @Post(':id/unregister')
  async unregisterFromEvent(@Param('id') eventId: string, @Body() body: { userId: string }): Promise<Event> {
    const { userId } = body;
    return this.eventService.unregisterFromEvent(eventId, userId);
  }

  @Get('open/:sport')
  async findEventBySport(@Param('sport') sport: string): Promise<Event[]> {
    return this.eventService.findEventBySport(sport);
  }

  @Post(':id/close')
  async closeEvent(@Param('id') eventId: string): Promise<Event> {
    return this.eventService.closeEvent(eventId);
  }

}
