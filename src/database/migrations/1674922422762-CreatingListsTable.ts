import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatingListsTable1674922422762 implements MigrationInterface {
    name = 'CreatingListsTable1674922422762'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lists" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "userId" integer, CONSTRAINT "PK_268b525e9a6dd04d0685cb2aaaa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "lists" ADD CONSTRAINT "FK_d13ad3f1ae1abae672c3edbef90" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lists" DROP CONSTRAINT "FK_d13ad3f1ae1abae672c3edbef90"`);
        await queryRunner.query(`DROP TABLE "lists"`);
    }

}
