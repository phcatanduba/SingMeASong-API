import {MigrationInterface, QueryRunner} from "typeorm";

export class SongEntity1639672787461 implements MigrationInterface {
    name = 'SongEntity1639672787461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "songs" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "youtubeLink" character varying NOT NULL, "score" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_e504ce8ad2e291d3a1d8f1ea2f4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "songs"`);
    }

}
