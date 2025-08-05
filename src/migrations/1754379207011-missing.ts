import {MigrationInterface, QueryRunner} from "typeorm";

export class Missing1754379207011 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_1df5bc14a47ef24d2e681f4559"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_order_modification" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "note" varchar NOT NULL, "shippingAddressChange" text, "billingAddressChange" text, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "priceChange" integer NOT NULL, "orderId" integer, "paymentId" integer, "refundId" integer, CONSTRAINT "REL_ad2991fa2933ed8b7f86a71633" UNIQUE ("paymentId"), CONSTRAINT "REL_cb66b63b6e97613013795eadbd" UNIQUE ("refundId"))`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_order_modification"("createdAt", "updatedAt", "note", "shippingAddressChange", "billingAddressChange", "id", "priceChange", "orderId", "paymentId", "refundId") SELECT "createdAt", "updatedAt", "note", "shippingAddressChange", "billingAddressChange", "id", "priceChange", "orderId", "paymentId", "refundId" FROM "order_modification"`, undefined);
        await queryRunner.query(`DROP TABLE "order_modification"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_order_modification" RENAME TO "order_modification"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_1df5bc14a47ef24d2e681f4559" ON "order_modification" ("orderId") `, undefined);
        await queryRunner.query(`DROP INDEX "IDX_1df5bc14a47ef24d2e681f4559"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_order_modification" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "note" varchar NOT NULL, "shippingAddressChange" text, "billingAddressChange" text, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "priceChange" integer NOT NULL, "orderId" integer, "paymentId" integer, "refundId" integer, CONSTRAINT "REL_ad2991fa2933ed8b7f86a71633" UNIQUE ("paymentId"), CONSTRAINT "REL_cb66b63b6e97613013795eadbd" UNIQUE ("refundId"))`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_order_modification"("createdAt", "updatedAt", "note", "shippingAddressChange", "billingAddressChange", "id", "priceChange", "orderId", "paymentId", "refundId") SELECT "createdAt", "updatedAt", "note", "shippingAddressChange", "billingAddressChange", "id", "priceChange", "orderId", "paymentId", "refundId" FROM "order_modification"`, undefined);
        await queryRunner.query(`DROP TABLE "order_modification"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_order_modification" RENAME TO "order_modification"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_1df5bc14a47ef24d2e681f4559" ON "order_modification" ("orderId") `, undefined);
        await queryRunner.query(`DROP INDEX "IDX_1df5bc14a47ef24d2e681f4559"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_order_modification" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "note" varchar NOT NULL, "shippingAddressChange" text, "billingAddressChange" text, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "priceChange" integer NOT NULL, "orderId" integer, "paymentId" integer, "refundId" integer, CONSTRAINT "REL_ad2991fa2933ed8b7f86a71633" UNIQUE ("paymentId"), CONSTRAINT "REL_cb66b63b6e97613013795eadbd" UNIQUE ("refundId"), CONSTRAINT "FK_1df5bc14a47ef24d2e681f45598" FOREIGN KEY ("orderId") REFERENCES "order" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_ad2991fa2933ed8b7f86a716338" FOREIGN KEY ("paymentId") REFERENCES "payment" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_cb66b63b6e97613013795eadbd5" FOREIGN KEY ("refundId") REFERENCES "refund" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_order_modification"("createdAt", "updatedAt", "note", "shippingAddressChange", "billingAddressChange", "id", "priceChange", "orderId", "paymentId", "refundId") SELECT "createdAt", "updatedAt", "note", "shippingAddressChange", "billingAddressChange", "id", "priceChange", "orderId", "paymentId", "refundId" FROM "order_modification"`, undefined);
        await queryRunner.query(`DROP TABLE "order_modification"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_order_modification" RENAME TO "order_modification"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_1df5bc14a47ef24d2e681f4559" ON "order_modification" ("orderId") `, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_1df5bc14a47ef24d2e681f4559"`, undefined);
        await queryRunner.query(`ALTER TABLE "order_modification" RENAME TO "temporary_order_modification"`, undefined);
        await queryRunner.query(`CREATE TABLE "order_modification" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "note" varchar NOT NULL, "shippingAddressChange" text, "billingAddressChange" text, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "priceChange" integer NOT NULL, "orderId" integer, "paymentId" integer, "refundId" integer, CONSTRAINT "REL_ad2991fa2933ed8b7f86a71633" UNIQUE ("paymentId"), CONSTRAINT "REL_cb66b63b6e97613013795eadbd" UNIQUE ("refundId"))`, undefined);
        await queryRunner.query(`INSERT INTO "order_modification"("createdAt", "updatedAt", "note", "shippingAddressChange", "billingAddressChange", "id", "priceChange", "orderId", "paymentId", "refundId") SELECT "createdAt", "updatedAt", "note", "shippingAddressChange", "billingAddressChange", "id", "priceChange", "orderId", "paymentId", "refundId" FROM "temporary_order_modification"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_order_modification"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_1df5bc14a47ef24d2e681f4559" ON "order_modification" ("orderId") `, undefined);
        await queryRunner.query(`DROP INDEX "IDX_1df5bc14a47ef24d2e681f4559"`, undefined);
        await queryRunner.query(`ALTER TABLE "order_modification" RENAME TO "temporary_order_modification"`, undefined);
        await queryRunner.query(`CREATE TABLE "order_modification" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "note" varchar NOT NULL, "shippingAddressChange" text, "billingAddressChange" text, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "priceChange" integer NOT NULL, "orderId" integer, "paymentId" integer, "refundId" integer, CONSTRAINT "REL_ad2991fa2933ed8b7f86a71633" UNIQUE ("paymentId"), CONSTRAINT "REL_cb66b63b6e97613013795eadbd" UNIQUE ("refundId"))`, undefined);
        await queryRunner.query(`INSERT INTO "order_modification"("createdAt", "updatedAt", "note", "shippingAddressChange", "billingAddressChange", "id", "priceChange", "orderId", "paymentId", "refundId") SELECT "createdAt", "updatedAt", "note", "shippingAddressChange", "billingAddressChange", "id", "priceChange", "orderId", "paymentId", "refundId" FROM "temporary_order_modification"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_order_modification"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_1df5bc14a47ef24d2e681f4559" ON "order_modification" ("orderId") `, undefined);
        await queryRunner.query(`DROP INDEX "IDX_1df5bc14a47ef24d2e681f4559"`, undefined);
        await queryRunner.query(`ALTER TABLE "order_modification" RENAME TO "temporary_order_modification"`, undefined);
        await queryRunner.query(`CREATE TABLE "order_modification" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "note" varchar NOT NULL, "shippingAddressChange" text, "billingAddressChange" text, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "priceChange" integer NOT NULL, "orderId" integer, "paymentId" integer, "refundId" integer, CONSTRAINT "REL_ad2991fa2933ed8b7f86a71633" UNIQUE ("paymentId"), CONSTRAINT "REL_cb66b63b6e97613013795eadbd" UNIQUE ("refundId"), CONSTRAINT "FK_ad2991fa2933ed8b7f86a716338" FOREIGN KEY ("paymentId") REFERENCES "payment" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "order_modification"("createdAt", "updatedAt", "note", "shippingAddressChange", "billingAddressChange", "id", "priceChange", "orderId", "paymentId", "refundId") SELECT "createdAt", "updatedAt", "note", "shippingAddressChange", "billingAddressChange", "id", "priceChange", "orderId", "paymentId", "refundId" FROM "temporary_order_modification"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_order_modification"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_1df5bc14a47ef24d2e681f4559" ON "order_modification" ("orderId") `, undefined);
   }

}
