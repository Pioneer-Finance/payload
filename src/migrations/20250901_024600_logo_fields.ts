import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "header" ADD COLUMN "logo_image_id" integer;
  ALTER TABLE "header" ADD COLUMN "logo_alt" varchar DEFAULT 'Logo';
  ALTER TABLE "footer" ADD COLUMN "logo_image_id" integer;
  ALTER TABLE "footer" ADD COLUMN "logo_alt" varchar DEFAULT 'Logo';
  DO $$ BEGIN
   ALTER TABLE "header" ADD CONSTRAINT "header_logo_image_id_media_id_fk" FOREIGN KEY ("logo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer" ADD CONSTRAINT "footer_logo_image_id_media_id_fk" FOREIGN KEY ("logo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "header_logo_logo_image_idx" ON "header" USING btree ("logo_image_id");
  CREATE INDEX IF NOT EXISTS "footer_logo_logo_image_idx" ON "footer" USING btree ("logo_image_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "header" DROP CONSTRAINT "header_logo_image_id_media_id_fk";
  
  ALTER TABLE "footer" DROP CONSTRAINT "footer_logo_image_id_media_id_fk";
  
  DROP INDEX IF EXISTS "header_logo_logo_image_idx";
  DROP INDEX IF EXISTS "footer_logo_logo_image_idx";
  ALTER TABLE "header" DROP COLUMN IF EXISTS "logo_image_id";
  ALTER TABLE "header" DROP COLUMN IF EXISTS "logo_alt";
  ALTER TABLE "footer" DROP COLUMN IF EXISTS "logo_image_id";
  ALTER TABLE "footer" DROP COLUMN IF EXISTS "logo_alt";`)
}
