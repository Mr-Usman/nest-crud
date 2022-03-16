// import { MigrationInterface, QueryRunner } from 'typeorm';

// export class skuIdColumnNameupdated1647365806189 implements MigrationInterface {
//   name = 'skuIdColumnNameupdated1647365806189';

//   public async up(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.query(
//       `ALTER TABLE "Product" RENAME COLUMN "sku_id" TO "skuId"`,
//     );
//   }

//   public async down(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.query(
//       `ALTER TABLE "Product" RENAME COLUMN "skuId" TO "sku_id"`,
//     );
//   }
// }
