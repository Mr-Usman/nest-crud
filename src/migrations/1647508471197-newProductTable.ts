import {MigrationInterface, QueryRunner} from "typeorm";

export class newProductTable1647508471197 implements MigrationInterface {
    name = 'newProductTable1647508471197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Product" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "name" character varying(100) NOT NULL, "skuId" character varying(100) NOT NULL, "price" character varying(100) NOT NULL, CONSTRAINT "PK_9fc040db7872192bbc26c515710" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Product"`);
    }

}
