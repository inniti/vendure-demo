import {MigrationInterface, QueryRunner} from "typeorm";

export class Storefront1754377772975 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "page_translation" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "languageCode" varchar NOT NULL, "title" varchar NOT NULL, "slug" varchar NOT NULL, "content" text NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "baseId" integer)`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_f504584d4dd2807ad249c03305" ON "page_translation" ("baseId") `, undefined);
        await queryRunner.query(`CREATE TABLE "page" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_1050f1bce08c8eb606e1a8607d"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_route" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "path" varchar NOT NULL, "entity" varchar NOT NULL, "entityId" integer NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_route"("createdAt", "updatedAt", "path", "entity", "entityId", "id") SELECT "createdAt", "updatedAt", "path", "entity", "entityId", "id" FROM "route"`, undefined);
        await queryRunner.query(`DROP TABLE "route"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_route" RENAME TO "route"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_1050f1bce08c8eb606e1a8607d" ON "route" ("path") `, undefined);
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
        await queryRunner.query(`DROP INDEX "IDX_f504584d4dd2807ad249c03305"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_page_translation" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "languageCode" varchar NOT NULL, "title" varchar NOT NULL, "slug" varchar NOT NULL, "content" text NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "baseId" integer, CONSTRAINT "FK_f504584d4dd2807ad249c033058" FOREIGN KEY ("baseId") REFERENCES "page" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_page_translation"("createdAt", "updatedAt", "languageCode", "title", "slug", "content", "id", "baseId") SELECT "createdAt", "updatedAt", "languageCode", "title", "slug", "content", "id", "baseId" FROM "page_translation"`, undefined);
        await queryRunner.query(`DROP TABLE "page_translation"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_page_translation" RENAME TO "page_translation"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_f504584d4dd2807ad249c03305" ON "page_translation" ("baseId") `, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_f504584d4dd2807ad249c03305"`, undefined);
        await queryRunner.query(`ALTER TABLE "page_translation" RENAME TO "temporary_page_translation"`, undefined);
        await queryRunner.query(`CREATE TABLE "page_translation" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "languageCode" varchar NOT NULL, "title" varchar NOT NULL, "slug" varchar NOT NULL, "content" text NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "baseId" integer)`, undefined);
        await queryRunner.query(`INSERT INTO "page_translation"("createdAt", "updatedAt", "languageCode", "title", "slug", "content", "id", "baseId") SELECT "createdAt", "updatedAt", "languageCode", "title", "slug", "content", "id", "baseId" FROM "temporary_page_translation"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_page_translation"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_f504584d4dd2807ad249c03305" ON "page_translation" ("baseId") `, undefined);
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
        await queryRunner.query(`DROP INDEX "IDX_1050f1bce08c8eb606e1a8607d"`, undefined);
        await queryRunner.query(`ALTER TABLE "route" RENAME TO "temporary_route"`, undefined);
        await queryRunner.query(`CREATE TABLE "route" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "path" varchar NOT NULL, "entity" varchar NOT NULL, "entityId" integer NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "column_7" varchar(255))`, undefined);
        await queryRunner.query(`INSERT INTO "route"("createdAt", "updatedAt", "path", "entity", "entityId", "id") SELECT "createdAt", "updatedAt", "path", "entity", "entityId", "id" FROM "temporary_route"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_route"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_1050f1bce08c8eb606e1a8607d" ON "route" ("path") `, undefined);
        await queryRunner.query(`DROP TABLE "page"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_f504584d4dd2807ad249c03305"`, undefined);
        await queryRunner.query(`DROP TABLE "page_translation"`, undefined);
   }

}
