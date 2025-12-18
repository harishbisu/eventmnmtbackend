// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@mikro-orm/nestjs';
// import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
// import { EventUpdateLog } from './entities/event-update-log.entity';

// @Injectable()
// export class AuditService {
//   constructor(
//     @InjectRepository(EventUpdateLog)
//     private readonly logRepository: EntityRepository<EventUpdateLog>,
//     private readonly em: EntityManager,
//   ) {}

//   async logEventUpdate(
//     event: Event,
//     oldValues: Record<string, any>,
//     updatedBy: string,
//     timezone: string,
//   ): Promise<void> {
//     const newValues = {
//       title: event.title,
//       startTime: event.startTime,
//       endTime: event.endTime,
//       timezone: event.timezone,
//     };

//     const log = this.logRepository.create({
//       event,
//       oldValues,
//       newValues,
//       updatedBy,
//       timezone,
//     });

//     await this.em.persistAndFlush(log);
//   }

//   async getEventUpdateLogs(eventId: string): Promise<EventUpdateLog[]> {
//     return this.logRepository.find(
//       { event: eventId },
//       { orderBy: { updatedAt: 'DESC' } }
//     );
//   }
// }