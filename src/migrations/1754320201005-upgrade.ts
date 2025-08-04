import {MigrationInterface, QueryRunner} from "typeorm";

export class Upgrade1754320201005 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_94e15d5f12d355d117390131ac"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_e5598363000cab9d9116bd5835"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_f3a761f6bcfabb474b11e1e51f"`, undefined);
        await queryRunner.query(`CREATE TABLE "settings_store_entry" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "key" varchar NOT NULL, "value" json, "scope" varchar, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_ab560f7983976aec91b91c26a4" ON "settings_store_entry" ("key") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_8d8ddb95a0fbd11ffb5606ef0c" ON "settings_store_entry" ("scope") `, undefined);
        await queryRunner.query(`CREATE UNIQUE INDEX "settings_store_key_scope_unique" ON "settings_store_entry" ("key", "scope") `, undefined);
        await queryRunner.query(`CREATE TABLE "job_record_buffer" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "bufferId" varchar NOT NULL, "job" text NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`, undefined);
        await queryRunner.query(`CREATE TABLE "scheduled_task_record" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "taskId" varchar NOT NULL, "enabled" boolean NOT NULL DEFAULT (1), "lockedAt" datetime(3), "lastExecutedAt" datetime(3), "manuallyTriggeredAt" datetime(3), "lastResult" json, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, CONSTRAINT "UQ_661876d97056cad9fd37eaa8774" UNIQUE ("taskId"))`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_1df5bc14a47ef24d2e681f4559"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_order_modification" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "note" varchar NOT NULL, "shippingAddressChange" text, "billingAddressChange" text, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "priceChange" integer NOT NULL, "orderId" integer, "paymentId" integer, "refundId" integer, CONSTRAINT "REL_cb66b63b6e97613013795eadbd" UNIQUE ("refundId"), CONSTRAINT "REL_ad2991fa2933ed8b7f86a71633" UNIQUE ("paymentId"))`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_order_modification"("createdAt", "updatedAt", "note", "shippingAddressChange", "billingAddressChange", "id", "priceChange", "orderId", "paymentId", "refundId") SELECT "createdAt", "updatedAt", "note", "shippingAddressChange", "billingAddressChange", "id", "priceChange", "orderId", "paymentId", "refundId" FROM "order_modification"`, undefined);
        await queryRunner.query(`DROP TABLE "order_modification"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_order_modification" RENAME TO "order_modification"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_1df5bc14a47ef24d2e681f4559" ON "order_modification" ("orderId") `, undefined);
        await queryRunner.query(`DROP INDEX "IDX_1df5bc14a47ef24d2e681f4559"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_order_modification" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "note" varchar NOT NULL, "shippingAddressChange" text, "billingAddressChange" text, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "priceChange" integer NOT NULL, "orderId" integer, "paymentId" integer, "refundId" integer, CONSTRAINT "REL_cb66b63b6e97613013795eadbd" UNIQUE ("refundId"), CONSTRAINT "REL_ad2991fa2933ed8b7f86a71633" UNIQUE ("paymentId"))`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_order_modification"("createdAt", "updatedAt", "note", "shippingAddressChange", "billingAddressChange", "id", "priceChange", "orderId", "paymentId", "refundId") SELECT "createdAt", "updatedAt", "note", "shippingAddressChange", "billingAddressChange", "id", "priceChange", "orderId", "paymentId", "refundId" FROM "order_modification"`, undefined);
        await queryRunner.query(`DROP TABLE "order_modification"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_order_modification" RENAME TO "order_modification"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_1df5bc14a47ef24d2e681f4559" ON "order_modification" ("orderId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_af13739f4962eab899bdff34be" ON "order" ("orderPlacedAt") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_86bc376c56af8cefd41a847a95" ON "job_record" ("createdAt") `, undefined);
        await queryRunner.query(`DROP INDEX "IDX_1df5bc14a47ef24d2e681f4559"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_order_modification" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "note" varchar NOT NULL, "shippingAddressChange" text, "billingAddressChange" text, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "priceChange" integer NOT NULL, "orderId" integer, "paymentId" integer, "refundId" integer, CONSTRAINT "REL_cb66b63b6e97613013795eadbd" UNIQUE ("refundId"), CONSTRAINT "REL_ad2991fa2933ed8b7f86a71633" UNIQUE ("paymentId"), CONSTRAINT "FK_1df5bc14a47ef24d2e681f45598" FOREIGN KEY ("orderId") REFERENCES "order" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_ad2991fa2933ed8b7f86a716338" FOREIGN KEY ("paymentId") REFERENCES "payment" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_cb66b63b6e97613013795eadbd5" FOREIGN KEY ("refundId") REFERENCES "refund" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_order_modification"("createdAt", "updatedAt", "note", "shippingAddressChange", "billingAddressChange", "id", "priceChange", "orderId", "paymentId", "refundId") SELECT "createdAt", "updatedAt", "note", "shippingAddressChange", "billingAddressChange", "id", "priceChange", "orderId", "paymentId", "refundId" FROM "order_modification"`, undefined);
        await queryRunner.query(`DROP TABLE "order_modification"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_order_modification" RENAME TO "order_modification"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_1df5bc14a47ef24d2e681f4559" ON "order_modification" ("orderId") `, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_1df5bc14a47ef24d2e681f4559"`, undefined);
        await queryRunner.query(`ALTER TABLE "order_modification" RENAME TO "temporary_order_modification"`, undefined);
        await queryRunner.query(`CREATE TABLE "order_modification" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "note" varchar NOT NULL, "shippingAddressChange" text, "billingAddressChange" text, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "priceChange" integer NOT NULL, "orderId" integer, "paymentId" integer, "refundId" integer, CONSTRAINT "REL_cb66b63b6e97613013795eadbd" UNIQUE ("refundId"), CONSTRAINT "REL_ad2991fa2933ed8b7f86a71633" UNIQUE ("paymentId"))`, undefined);
        await queryRunner.query(`INSERT INTO "order_modification"("createdAt", "updatedAt", "note", "shippingAddressChange", "billingAddressChange", "id", "priceChange", "orderId", "paymentId", "refundId") SELECT "createdAt", "updatedAt", "note", "shippingAddressChange", "billingAddressChange", "id", "priceChange", "orderId", "paymentId", "refundId" FROM "temporary_order_modification"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_order_modification"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_1df5bc14a47ef24d2e681f4559" ON "order_modification" ("orderId") `, undefined);
        await queryRunner.query(`DROP INDEX "IDX_86bc376c56af8cefd41a847a95"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_af13739f4962eab899bdff34be"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_1df5bc14a47ef24d2e681f4559"`, undefined);
        await queryRunner.query(`ALTER TABLE "order_modification" RENAME TO "temporary_order_modification"`, undefined);
        await queryRunner.query(`CREATE TABLE "order_modification" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "note" varchar NOT NULL, "shippingAddressChange" text, "billingAddressChange" text, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "priceChange" integer NOT NULL, "orderId" integer, "paymentId" integer, "refundId" integer, CONSTRAINT "REL_cb66b63b6e97613013795eadbd" UNIQUE ("refundId"), CONSTRAINT "REL_ad2991fa2933ed8b7f86a71633" UNIQUE ("paymentId"))`, undefined);
        await queryRunner.query(`INSERT INTO "order_modification"("createdAt", "updatedAt", "note", "shippingAddressChange", "billingAddressChange", "id", "priceChange", "orderId", "paymentId", "refundId") SELECT "createdAt", "updatedAt", "note", "shippingAddressChange", "billingAddressChange", "id", "priceChange", "orderId", "paymentId", "refundId" FROM "temporary_order_modification"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_order_modification"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_1df5bc14a47ef24d2e681f4559" ON "order_modification" ("orderId") `, undefined);
        await queryRunner.query(`DROP INDEX "IDX_1df5bc14a47ef24d2e681f4559"`, undefined);
        await queryRunner.query(`ALTER TABLE "order_modification" RENAME TO "temporary_order_modification"`, undefined);
        await queryRunner.query(`CREATE TABLE "order_modification" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "note" varchar NOT NULL, "shippingAddressChange" text, "billingAddressChange" text, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "priceChange" integer NOT NULL, "orderId" integer, "paymentId" integer, "refundId" integer, CONSTRAINT "REL_cb66b63b6e97613013795eadbd" UNIQUE ("refundId"), CONSTRAINT "REL_ad2991fa2933ed8b7f86a71633" UNIQUE ("paymentId"), CONSTRAINT "FK_ad2991fa2933ed8b7f86a716338" FOREIGN KEY ("paymentId") REFERENCES "payment" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "order_modification"("createdAt", "updatedAt", "note", "shippingAddressChange", "billingAddressChange", "id", "priceChange", "orderId", "paymentId", "refundId") SELECT "createdAt", "updatedAt", "note", "shippingAddressChange", "billingAddressChange", "id", "priceChange", "orderId", "paymentId", "refundId" FROM "temporary_order_modification"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_order_modification"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_1df5bc14a47ef24d2e681f4559" ON "order_modification" ("orderId") `, undefined);
        await queryRunner.query(`DROP TABLE "scheduled_task_record"`, undefined);
        await queryRunner.query(`DROP TABLE "job_record_buffer"`, undefined);
        await queryRunner.query(`DROP INDEX "settings_store_key_scope_unique"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_8d8ddb95a0fbd11ffb5606ef0c"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_ab560f7983976aec91b91c26a4"`, undefined);
        await queryRunner.query(`DROP TABLE "settings_store_entry"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_f3a761f6bcfabb474b11e1e51f" ON "history_entry" ("discriminator") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_e5598363000cab9d9116bd5835" ON "session" ("type") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_94e15d5f12d355d117390131ac" ON "stock_movement" ("discriminator") `, undefined);
   }

}
