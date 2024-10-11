import { MigrationInterface, QueryRunner } from 'typeorm';

export class CofeeRefactor1728667427224 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "cofee" RENAME COLUMN "name" TO "title"`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "cofee" RENAME COLUMN "title" TO "name"`,
        );
    }
}
