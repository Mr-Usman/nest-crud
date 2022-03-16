// import { MigrationInterface, QueryRunner } from 'typeorm';

// export class orderTable1647413600962 implements MigrationInterface {
//   name = 'orderTable1647413600962';

//   public async up(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.query(
//       `CREATE TABLE "Product" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "name" character varying(100) NOT NULL, "skuId" character varying(100) NOT NULL, "price" character varying(100) NOT NULL, "orderId" integer, CONSTRAINT "PK_9fc040db7872192bbc26c515710" PRIMARY KEY ("id"))`,
//     );
//     await queryRunner.query(
//       `CREATE TABLE "User" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "username" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, "orderId" integer, CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`,
//     );
//     await queryRunner.query(
//       `CREATE TABLE "Order" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "title" character varying(100), "description" character varying(100), "productId" integer, CONSTRAINT "PK_3d5a3861d8f9a6db372b2b317b7" PRIMARY KEY ("id"))`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE "Product" ADD CONSTRAINT "FK_2c1d78a2dd508da5aa9863ee4fd" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE "User" ADD CONSTRAINT "FK_0f0062f9eee0c5cbb8aa1f002d6" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE "Order" ADD CONSTRAINT "FK_ccf3e5dad88bd746580f824cba9" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
//     );
//   }

//   public async down(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.query(
//       `ALTER TABLE "Order" DROP CONSTRAINT "FK_ccf3e5dad88bd746580f824cba9"`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE "User" DROP CONSTRAINT "FK_0f0062f9eee0c5cbb8aa1f002d6"`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE "Product" DROP CONSTRAINT "FK_2c1d78a2dd508da5aa9863ee4fd"`,
//     );
//     await queryRunner.query(`DROP TABLE "Order"`);
//     await queryRunner.query(`DROP TABLE "User"`);
//     await queryRunner.query(`DROP TABLE "Product"`);
//   }
// }
