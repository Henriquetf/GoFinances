import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCategoriesTable1596901766537 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
      CREATE TABLE "categories" (
        "id"         uuid DEFAULT uuid_generate_v4(),
        "title"      VARCHAR(200) NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(),

        CONSTRAINT pk_categories_id PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
      DROP TABLE "categories"
    `);
  }
}
