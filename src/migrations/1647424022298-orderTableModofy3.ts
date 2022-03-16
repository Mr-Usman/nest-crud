import {MigrationInterface, QueryRunner} from "typeorm";

export class orderTableModofy31647424022298 implements MigrationInterface {
    name = 'orderTableModofy31647424022298'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Order" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "Order" ADD "productId" integer`);
        await queryRunner.query(`ALTER TABLE "Order" ADD CONSTRAINT "FK_cdc25a0a42e8f451020a26680b3" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Order" ADD CONSTRAINT "FK_ccf3e5dad88bd746580f824cba9" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Order" DROP CONSTRAINT "FK_ccf3e5dad88bd746580f824cba9"`);
        await queryRunner.query(`ALTER TABLE "Order" DROP CONSTRAINT "FK_cdc25a0a42e8f451020a26680b3"`);
        await queryRunner.query(`ALTER TABLE "Order" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "Order" DROP COLUMN "userId"`);
    }

}
