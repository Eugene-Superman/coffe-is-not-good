import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaSync1728669021656 implements MigrationInterface {
    name = 'SchemaSync1728669021656'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cofee" ADD "description" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cofee" DROP COLUMN "description"`);
    }

}
