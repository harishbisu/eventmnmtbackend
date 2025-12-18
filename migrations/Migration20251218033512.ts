import { Migration } from '@mikro-orm/migrations';

export class Migration20251218033512 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create schema if not exists "skailama";`);
    this.addSql(`create table "skailama"."user" ("id" uuid not null default gen_random_uuid(), "user_name" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "user_pkey" primary key ("id"));`);
    this.addSql(`alter table "skailama"."user" add constraint "user_user_name_unique" unique ("user_name");`);
  }

}
