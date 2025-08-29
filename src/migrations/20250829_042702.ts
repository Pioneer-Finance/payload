import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TYPE "public"."enum_pages_hero_text_color" AS ENUM('white', 'black', 'gray-light', 'gray-dark', 'blue', 'red', 'green', 'yellow', 'purple', 'pink');
  CREATE TYPE "public"."enum_pages_blocks_split_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_split_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_gradient_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_gradient_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_gradient_hero_text_color" AS ENUM('white', 'black', 'gray-light', 'gray-dark', 'blue', 'red', 'green', 'yellow', 'purple', 'pink');
  CREATE TYPE "public"."enum__pages_v_version_hero_text_color" AS ENUM('white', 'black', 'gray-light', 'gray-dark', 'blue', 'red', 'green', 'yellow', 'purple', 'pink');
  CREATE TYPE "public"."enum__pages_v_blocks_split_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_split_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_gradient_hero_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_gradient_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_gradient_hero_text_color" AS ENUM('white', 'black', 'gray-light', 'gray-dark', 'blue', 'red', 'green', 'yellow', 'purple', 'pink');
  ALTER TYPE "public"."enum_pages_hero_type" ADD VALUE 'split';
  ALTER TYPE "public"."enum_pages_hero_type" ADD VALUE 'centered';
  ALTER TYPE "public"."enum_pages_hero_type" ADD VALUE 'minimal';
  ALTER TYPE "public"."enum_pages_hero_type" ADD VALUE 'gradient';
  ALTER TYPE "public"."enum_pages_hero_type" ADD VALUE 'card';
  ALTER TYPE "public"."enum_pages_hero_type" ADD VALUE 'overlay';
  ALTER TYPE "public"."enum_pages_hero_type" ADD VALUE 'stacked';
  ALTER TYPE "public"."enum_pages_hero_type" ADD VALUE 'sidebar';
  ALTER TYPE "public"."enum_pages_hero_type" ADD VALUE 'banner';
  ALTER TYPE "public"."enum_pages_hero_type" ADD VALUE 'vertical';
  ALTER TYPE "public"."enum_pages_hero_type" ADD VALUE 'compact';
  ALTER TYPE "public"."enum_pages_hero_type" ADD VALUE 'floating';
  ALTER TYPE "public"."enum__pages_v_version_hero_type" ADD VALUE 'split';
  ALTER TYPE "public"."enum__pages_v_version_hero_type" ADD VALUE 'centered';
  ALTER TYPE "public"."enum__pages_v_version_hero_type" ADD VALUE 'minimal';
  ALTER TYPE "public"."enum__pages_v_version_hero_type" ADD VALUE 'gradient';
  ALTER TYPE "public"."enum__pages_v_version_hero_type" ADD VALUE 'card';
  ALTER TYPE "public"."enum__pages_v_version_hero_type" ADD VALUE 'overlay';
  ALTER TYPE "public"."enum__pages_v_version_hero_type" ADD VALUE 'stacked';
  ALTER TYPE "public"."enum__pages_v_version_hero_type" ADD VALUE 'sidebar';
  ALTER TYPE "public"."enum__pages_v_version_hero_type" ADD VALUE 'banner';
  ALTER TYPE "public"."enum__pages_v_version_hero_type" ADD VALUE 'vertical';
  ALTER TYPE "public"."enum__pages_v_version_hero_type" ADD VALUE 'compact';
  ALTER TYPE "public"."enum__pages_v_version_hero_type" ADD VALUE 'floating';
  CREATE TABLE IF NOT EXISTS "pages_blocks_split_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_split_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_split_hero_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_split_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"media_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_gradient_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_gradient_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_gradient_hero_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_gradient_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"media_id" integer,
  	"text_color" "enum_pages_blocks_gradient_hero_text_color" DEFAULT 'white',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_split_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_split_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_split_hero_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_split_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"media_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_gradient_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_gradient_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_gradient_hero_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_gradient_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"media_id" integer,
  	"text_color" "enum__pages_v_blocks_gradient_hero_text_color" DEFAULT 'white',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages" ADD COLUMN "hero_text_color" "enum_pages_hero_text_color" DEFAULT 'white';
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_text_color" "enum__pages_v_version_hero_text_color" DEFAULT 'white';
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_split_hero_links" ADD CONSTRAINT "pages_blocks_split_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_split_hero"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_split_hero" ADD CONSTRAINT "pages_blocks_split_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_split_hero" ADD CONSTRAINT "pages_blocks_split_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_gradient_hero_links" ADD CONSTRAINT "pages_blocks_gradient_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gradient_hero"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_gradient_hero" ADD CONSTRAINT "pages_blocks_gradient_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_gradient_hero" ADD CONSTRAINT "pages_blocks_gradient_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_split_hero_links" ADD CONSTRAINT "_pages_v_blocks_split_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_split_hero"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_split_hero" ADD CONSTRAINT "_pages_v_blocks_split_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_split_hero" ADD CONSTRAINT "_pages_v_blocks_split_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_gradient_hero_links" ADD CONSTRAINT "_pages_v_blocks_gradient_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gradient_hero"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_gradient_hero" ADD CONSTRAINT "_pages_v_blocks_gradient_hero_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_gradient_hero" ADD CONSTRAINT "_pages_v_blocks_gradient_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_blocks_split_hero_links_order_idx" ON "pages_blocks_split_hero_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_split_hero_links_parent_id_idx" ON "pages_blocks_split_hero_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_split_hero_order_idx" ON "pages_blocks_split_hero" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_split_hero_parent_id_idx" ON "pages_blocks_split_hero" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_split_hero_path_idx" ON "pages_blocks_split_hero" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_split_hero_media_idx" ON "pages_blocks_split_hero" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_gradient_hero_links_order_idx" ON "pages_blocks_gradient_hero_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_gradient_hero_links_parent_id_idx" ON "pages_blocks_gradient_hero_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_gradient_hero_order_idx" ON "pages_blocks_gradient_hero" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_gradient_hero_parent_id_idx" ON "pages_blocks_gradient_hero" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_gradient_hero_path_idx" ON "pages_blocks_gradient_hero" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_gradient_hero_media_idx" ON "pages_blocks_gradient_hero" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_split_hero_links_order_idx" ON "_pages_v_blocks_split_hero_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_split_hero_links_parent_id_idx" ON "_pages_v_blocks_split_hero_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_split_hero_order_idx" ON "_pages_v_blocks_split_hero" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_split_hero_parent_id_idx" ON "_pages_v_blocks_split_hero" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_split_hero_path_idx" ON "_pages_v_blocks_split_hero" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_split_hero_media_idx" ON "_pages_v_blocks_split_hero" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_gradient_hero_links_order_idx" ON "_pages_v_blocks_gradient_hero_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_gradient_hero_links_parent_id_idx" ON "_pages_v_blocks_gradient_hero_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_gradient_hero_order_idx" ON "_pages_v_blocks_gradient_hero" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_gradient_hero_parent_id_idx" ON "_pages_v_blocks_gradient_hero" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_gradient_hero_path_idx" ON "_pages_v_blocks_gradient_hero" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_gradient_hero_media_idx" ON "_pages_v_blocks_gradient_hero" USING btree ("media_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "pages_blocks_split_hero_links" CASCADE;
  DROP TABLE "pages_blocks_split_hero" CASCADE;
  DROP TABLE "pages_blocks_gradient_hero_links" CASCADE;
  DROP TABLE "pages_blocks_gradient_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_split_hero_links" CASCADE;
  DROP TABLE "_pages_v_blocks_split_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_gradient_hero_links" CASCADE;
  DROP TABLE "_pages_v_blocks_gradient_hero" CASCADE;
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_text_color";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_text_color";
  ALTER TABLE "public"."pages" ALTER COLUMN "hero_type" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_hero_type";
  CREATE TYPE "public"."enum_pages_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  ALTER TABLE "public"."pages" ALTER COLUMN "hero_type" SET DATA TYPE "public"."enum_pages_hero_type" USING "hero_type"::"public"."enum_pages_hero_type";
  ALTER TABLE "public"."_pages_v" ALTER COLUMN "version_hero_type" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_version_hero_type";
  CREATE TYPE "public"."enum__pages_v_version_hero_type" AS ENUM('none', 'highImpact', 'mediumImpact', 'lowImpact');
  ALTER TABLE "public"."_pages_v" ALTER COLUMN "version_hero_type" SET DATA TYPE "public"."enum__pages_v_version_hero_type" USING "version_hero_type"::"public"."enum__pages_v_version_hero_type";
  DROP TYPE "public"."enum_pages_hero_text_color";
  DROP TYPE "public"."enum_pages_blocks_split_hero_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_split_hero_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_gradient_hero_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_gradient_hero_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_gradient_hero_text_color";
  DROP TYPE "public"."enum__pages_v_version_hero_text_color";
  DROP TYPE "public"."enum__pages_v_blocks_split_hero_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_split_hero_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_gradient_hero_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_gradient_hero_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_gradient_hero_text_color";`)
}
