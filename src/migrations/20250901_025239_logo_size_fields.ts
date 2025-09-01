import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "header" ADD COLUMN "logo_width" numeric;
  ALTER TABLE "header" ADD COLUMN "logo_height" numeric;
  ALTER TABLE "header" ADD COLUMN "logo_max_width" varchar DEFAULT '9.375rem';
  ALTER TABLE "footer" ADD COLUMN "logo_width" numeric;
  ALTER TABLE "footer" ADD COLUMN "logo_height" numeric;
  ALTER TABLE "footer" ADD COLUMN "logo_max_width" varchar DEFAULT '9.375rem';`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "header" DROP COLUMN IF EXISTS "logo_width";
  ALTER TABLE "header" DROP COLUMN IF EXISTS "logo_height";
  ALTER TABLE "header" DROP COLUMN IF EXISTS "logo_max_width";
  ALTER TABLE "footer" DROP COLUMN IF EXISTS "logo_width";
  ALTER TABLE "footer" DROP COLUMN IF EXISTS "logo_height";
  ALTER TABLE "footer" DROP COLUMN IF EXISTS "logo_max_width";`)
}
