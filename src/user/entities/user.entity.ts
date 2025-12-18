import {
    Collection,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Event } from '../../event/entities/event.entity';

@Entity()
export class User {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Unique()
  @Property()
  userName!: string;

  @ManyToMany(() => Event, event => event.users)
  events = new Collection<Event>(this);

  @Property({ type: 'timestamptz' })
  createdAt: Date = new Date();

  @Property({ type: 'timestamptz', onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  constructor(userName: string) {
    this.userName = userName;
  }
}
