import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUUIDExtension1596900362853 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
      DROP EXTENSION "uuid-ossp"
    `);
  }
}
