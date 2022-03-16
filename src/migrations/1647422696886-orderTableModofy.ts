import {MigrationInterface, QueryRunner} from "typeorm";

export class orderTableModofy1647422696886 implements MigrationInterface {
    name = 'orderTableModofy1647422696886'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "FK_0f0062f9eee0c5cbb8aa1f002d6"`);
        await queryRunner.query(`ALTER TABLE "Product" DROP CONSTRAINT "FK_2c1d78a2dd508da5aa9863ee4fd"`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "orderId"`);
        await queryRunner.query(`ALTER TABLE "Product" DROP COLUMN "orderId"`);
        await queryRunner.query(`ALTER TABLE "Order" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "Order" ADD CONSTRAINT "FK_cdc25a0a42e8f451020a26680b3" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Order" DROP CONSTRAINT "FK_cdc25a0a42e8f451020a26680b3"`);
        await queryRunner.query(`ALTER TABLE "Order" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "Product" ADD "orderId" integer`);
        await queryRunner.query(`ALTER TABLE "User" ADD "orderId" integer`);
        await queryRunner.query(`ALTER TABLE "Product" ADD CONSTRAINT "FK_2c1d78a2dd508da5aa9863ee4fd" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "FK_0f0062f9eee0c5cbb8aa1f002d6" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
