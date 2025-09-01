import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_accordion_accordion_type" AS ENUM('single', 'multiple');
  CREATE TYPE "public"."enum__pages_v_blocks_accordion_accordion_type" AS ENUM('single', 'multiple');
  CREATE TABLE "pages_blocks_accordion_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb
  );
  
  CREATE TABLE "pages_blocks_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"accordion_type" "enum_pages_blocks_accordion_accordion_type" DEFAULT 'single',
  	"collapsible" boolean DEFAULT true,
  	"default_open" numeric,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_accordion_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"accordion_type" "enum__pages_v_blocks_accordion_accordion_type" DEFAULT 'single',
  	"collapsible" boolean DEFAULT true,
  	"default_open" numeric,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  DROP INDEX "redirects_from_idx";
  ALTER TABLE "forms_emails" ALTER COLUMN "subject" SET DEFAULT 'You''ve received a new message.';
  ALTER TABLE "forms_blocks_select" ADD COLUMN "placeholder" varchar;
  ALTER TABLE "pages_blocks_accordion_accordion_items" ADD CONSTRAINT "pages_blocks_accordion_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_accordion" ADD CONSTRAINT "pages_blocks_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_accordion_accordion_items" ADD CONSTRAINT "_pages_v_blocks_accordion_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_accordion" ADD CONSTRAINT "_pages_v_blocks_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_accordion_accordion_items_order_idx" ON "pages_blocks_accordion_accordion_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_accordion_accordion_items_parent_id_idx" ON "pages_blocks_accordion_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_accordion_order_idx" ON "pages_blocks_accordion" USING btree ("_order");
  CREATE INDEX "pages_blocks_accordion_parent_id_idx" ON "pages_blocks_accordion" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_accordion_path_idx" ON "pages_blocks_accordion" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_accordion_accordion_items_order_idx" ON "_pages_v_blocks_accordion_accordion_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_accordion_accordion_items_parent_id_idx" ON "_pages_v_blocks_accordion_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_accordion_order_idx" ON "_pages_v_blocks_accordion" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_accordion_parent_id_idx" ON "_pages_v_blocks_accordion" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_accordion_path_idx" ON "_pages_v_blocks_accordion" USING btree ("_path");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");`)
}

export async function down({  payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "pages_blocks_accordion_accordion_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_accordion" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_accordion_accordion_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_accordion" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "users_sessions" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_accordion_accordion_items" CASCADE;
  DROP TABLE "pages_blocks_accordion" CASCADE;
  DROP TABLE "_pages_v_blocks_accordion_accordion_items" CASCADE;
  DROP TABLE "_pages_v_blocks_accordion" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP INDEX "redirects_from_idx";
  ALTER TABLE "forms_emails" ALTER COLUMN "subject" SET DEFAULT 'You''''ve received a new message.';
  CREATE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  ALTER TABLE "forms_blocks_select" DROP COLUMN "placeholder";
  DROP TYPE "public"."enum_pages_blocks_accordion_accordion_type";
  DROP TYPE "public"."enum__pages_v_blocks_accordion_accordion_type";`)
}
