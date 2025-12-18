import { Module } from '@nestjs/common';
import { EventsController } from './event.controller';
import { EventsService } from './event.service';
import { User } from '../user/entities/user.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TimezoneService } from './timezone.service';
import { Event } from './entities/event.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Event, User])],
  controllers: [EventsController],
  providers: [EventsService, TimezoneService],
})
export class EventsModule {}
