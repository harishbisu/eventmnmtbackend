import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository, wrap } from '@mikro-orm/postgresql';
import { Event } from './entities/event.entity';
import { User } from 'src/user/entities/user.entity';
// import { AuditService } from 'src/audit/audit.service';
import { TimezoneService } from './timezone.service';
import { CreateEventDto } from './dto/create-event.dto';
import { start } from 'repl';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: EntityRepository<Event>,
    @InjectRepository(User)
    private readonly profileRepository: EntityRepository<User>,
    private readonly timezoneService: TimezoneService,
    private readonly em: EntityManager,
  ) {}

  async create(createEventDto: CreateEventDto) {
    const startTimeUTC = this.timezoneService.convertToUTC(
      createEventDto.startTime,
      createEventDto.timezone,
    );

    const endTimeUTC = this.timezoneService.convertToUTC(
      createEventDto.endTime,
      createEventDto.timezone,
    );

    const users = await this.profileRepository.find({
      id: { $in: createEventDto.userIds },
    });

    if (users.length !== createEventDto.userIds.length) {
      throw new BadRequestException('One or more users not found');
    }

    const event = new Event(
      createEventDto.title,
      startTimeUTC,
      endTimeUTC,
      createEventDto.timezone,
      createEventDto.createdBy,
    );
    users.forEach((user) => event.users.add(user));
    await this.em.persistAndFlush(event);
  }

  async findAllForProfile(profileId: string, timezone: string) {
    if (!timezone) {
      throw new BadRequestException('Timezone query parameter is required');
    }
    if (!profileId) {
      throw new BadRequestException('ProfileId query parameter is required');
    }
    const profile = await this.profileRepository.findOneOrFail(profileId, {
      populate: ['events', 'events.users.userName'],
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return profile.events.getItems().map((event) => ({
      ...event,
      users: event.users.getItems().map((user) => user.userName),
      startTime: this.timezoneService.convertFromUTC(event.startTime, timezone),
      endTime: this.timezoneService.convertFromUTC(event.endTime, timezone),
      createdAt: this.timezoneService.convertFromUTC(event.createdAt, timezone),
      updatedAt: this.timezoneService.convertFromUTC(event.updatedAt, timezone),
    }));
  }

  async findOne(id: string): Promise<Event> {
    const event = await this.eventRepository.findOne(
      { id },
      { populate: ['users'] },
    );

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return event;
  }

  //   async update(
  //     id: string,
  //     updateEventDto: UpdateEventDto,
  //     updatedBy: string,
  //   ): Promise<Event> {
  //     const event = await this.findOne(id);

  //     // Store old values for audit
  //     const oldValues = {
  //       title: event.title,
  //       description: event.description,
  //       startTime: event.startTime,
  //       endTime: event.endTime,
  //       timezone: event.timezone,
  //     };

  //     // Update event
  //     wrap(event).assign(updateEventDto);

  //     // Convert times if provided
  //     if (updateEventDto.startTime && updateEventDto.timezone) {
  //       event.startTime = this.timezoneService.convertToUTC(
  //         updateEventDto.startTime,
  //         updateEventDto.timezone,
  //       );
  //     }

  //     if (updateEventDto.endTime && updateEventDto.timezone) {
  //       event.endTime = this.timezoneService.convertToUTC(
  //         updateEventDto.endTime,
  //         updateEventDto.timezone,
  //       );
  //     }

  //     await this.eventRepository.flush();

  //     // Log changes
  //     await this.auditService.logEventUpdate(
  //       event,
  //       oldValues,
  //       updatedBy,
  //       updateEventDto.timezone || event.timezone,
  //     );

  //     return event;
  //   }
}
