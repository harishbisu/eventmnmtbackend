import {
  Entity,
  PrimaryKey,
  Property,
  ManyToMany,
  Collection,
  BeforeCreate,
  BeforeUpdate,
} from '@mikro-orm/core';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Event {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property()
  title!: string;

  @Property({ type: 'timestamptz' })
  startTime!: Date;

  @Property({ type: 'timestamptz' })
  endTime!: Date;

  @Property()
  timezone!: string;

  @ManyToMany(() => User, (user) => user.events, { owner: true })
  users = new Collection<User>(this);

  @Property()
  createdBy!: string;

  @Property({ defaultRaw: 'now()' })
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date(), defaultRaw: 'now()' })
  updatedAt: Date = new Date();

  @BeforeCreate()
  @BeforeUpdate()
  validateTimes() {
    if (this.endTime <= this.startTime) {
      throw new Error('End time must be after start time');
    }
  }
  constructor(
    title: string,
    startTime: Date,
    endTime: Date,
    timezone: string,
    createdBy: string,
  ) {
    this.title = title;
    this.startTime = startTime;
    this.endTime = endTime;
    this.timezone = timezone;
    this.createdBy = createdBy;
  }
}
