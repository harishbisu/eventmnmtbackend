import { Migration } from '@mikro-orm/migrations';

export class Migration20251218044621 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "skailama"."event" ("id" uuid not null default gen_random_uuid(), "title" varchar(255) not null, "start_time" timestamptz not null, "end_time" timestamptz not null, "timezone" varchar(255) not null, "created_by" varchar(255) not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), constraint "event_pkey" primary key ("id"));`);

    this.addSql(`create table "skailama"."event_update_log" ("id" uuid not null default gen_random_uuid(), "event_id" uuid not null, "old_values" jsonb not null, "new_values" jsonb not null, "updated_by" varchar(255) not null, "timezone" timestamptz not null, "updated_at" timestamptz not null, constraint "event_update_log_pkey" primary key ("id"));`);

    this.addSql(`create table "skailama"."event_users" ("event_id" uuid not null, "user_id" uuid not null, constraint "event_users_pkey" primary key ("event_id", "user_id"));`);

    this.addSql(`alter table "skailama"."event_update_log" add constraint "event_update_log_event_id_foreign" foreign key ("event_id") references "skailama"."event" ("id") on update cascade;`);

    this.addSql(`alter table "skailama"."event_users" add constraint "event_users_event_id_foreign" foreign key ("event_id") references "skailama"."event" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "skailama"."event_users" add constraint "event_users_user_id_foreign" foreign key ("user_id") references "skailama"."user" ("id") on update cascade on delete cascade;`);
  }

}
