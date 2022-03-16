// import { MigrationInterface, QueryRunner } from 'typeorm';

// export class productTable1647330409438 implements MigrationInterface {
//   name = 'productTable1647330409438';

//   public async up(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.query(
//       `CREATE TABLE "Product" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "name" character varying(100) NOT NULL, "sku_id" character varying(100) NOT NULL, "price" character varying(100) NOT NULL, "userId" integer, CONSTRAINT "PK_9fc040db7872192bbc26c515710" PRIMARY KEY ("id"))`,
//     );
//     await queryRunner.query(
//       `ALTER TABLE "Product" ADD CONSTRAINT "FK_de75905c3b4987f4b5bb1472644" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
//     );
//   }

//   public async down(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.query(
//       `ALTER TABLE "Product" DROP CONSTRAINT "FK_de75905c3b4987f4b5bb1472644"`,
//     );
//     await queryRunner.query(`DROP TABLE "Product"`);
//   }
// }
