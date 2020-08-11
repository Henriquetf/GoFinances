import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTransactionsTable1596901772070
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
      CREATE TYPE "transaction_type" AS ENUM (
        'income',
        'outcome'
      )
    `);

    await queryRunner.query(/* sql */ `
      CREATE TABLE "transactions" (
        "id"          uuid DEFAULT uuid_generate_v4(),
        "title"       VARCHAR(200) NOT NULL,
        "value"       NUMERIC(20, 2) NOT NULL,
        "type"        transaction_type NOT NULL,
        "category_id" uuid NOT NULL,
        "created_at"  TIMESTAMP NOT NULL DEFAULT NOW(),
        "updated_at"  TIMESTAMP NOT NULL DEFAULT NOW(),

        CONSTRAINT pk_transactions_id PRIMARY KEY ("id"),
        CONSTRAINT fk_transactions_categories_id
          FOREIGN KEY ("category_id") REFERENCES categories ("id")
          ON DELETE SET NULL
          ON UPDATE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
      DROP TABLE "transactions"
    `);

    await queryRunner.query(/* sql */ `
      DROP TYPE "transaction_type"
    `);
  }
}
