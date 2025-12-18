import {
  Controller,
  Post,
  Body,
  Get,
  Query
} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { EventsService } from './event.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  async create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }
  @Get()
  async findAllForProfile(@Query('profileId') profileId: string, @Query('timezone') timezone: string) {
    return this.eventsService.findAllForProfile(profileId, timezone);
  }
}
