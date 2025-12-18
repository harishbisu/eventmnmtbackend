import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';

@Entity()
export class EventUpdateLog {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @ManyToOne(() => Event)
  event!: Event;

  @Property({ type: 'jsonb' })
  oldValues!: Record<string, any>;

  @Property({ type: 'jsonb' })
  newValues!: Record<string, any>;

  @Property()
  updatedBy!: string;

  @Property({ type: 'timestamptz' })
  timezone!: string;

  @Property({ type: 'timestamptz' })
  updatedAt: Date = new Date();

  constructor(data: Partial<EventUpdateLog>) {
    Object.assign(this, data);
  }
}
