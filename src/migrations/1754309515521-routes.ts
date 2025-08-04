import {MigrationInterface, QueryRunner} from "typeorm";

export class Routes1754309515521 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "route" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "path" varchar NOT NULL, "entity" varchar NOT NULL, "entityId" integer NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_1050f1bce08c8eb606e1a8607d" ON "route" ("path") `, undefined);
        await queryRunner.query(`CREATE TABLE "route_channels_channel" ("routeId" integer NOT NULL, "channelId" integer NOT NULL, PRIMARY KEY ("routeId", "channelId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_c66ab0b5276b659d92c92eb648" ON "route_channels_channel" ("routeId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_764c22fc87934bb987514a27d4" ON "route_channels_channel" ("channelId") `, undefined);
        await queryRunner.query(`DROP INDEX "IDX_c66ab0b5276b659d92c92eb648"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_764c22fc87934bb987514a27d4"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_route_channels_channel" ("routeId" integer NOT NULL, "channelId" integer NOT NULL, CONSTRAINT "FK_c66ab0b5276b659d92c92eb6487" FOREIGN KEY ("routeId") REFERENCES "route" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_764c22fc87934bb987514a27d43" FOREIGN KEY ("channelId") REFERENCES "channel" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("routeId", "channelId"))`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_route_channels_channel"("routeId", "channelId") SELECT "routeId", "channelId" FROM "route_channels_channel"`, undefined);
        await queryRunner.query(`DROP TABLE "route_channels_channel"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_route_channels_channel" RENAME TO "route_channels_channel"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_c66ab0b5276b659d92c92eb648" ON "route_channels_channel" ("routeId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_764c22fc87934bb987514a27d4" ON "route_channels_channel" ("channelId") `, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_764c22fc87934bb987514a27d4"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_c66ab0b5276b659d92c92eb648"`, undefined);
        await queryRunner.query(`ALTER TABLE "route_channels_channel" RENAME TO "temporary_route_channels_channel"`, undefined);
        await queryRunner.query(`CREATE TABLE "route_channels_channel" ("routeId" integer NOT NULL, "channelId" integer NOT NULL, PRIMARY KEY ("routeId", "channelId"))`, undefined);
        await queryRunner.query(`INSERT INTO "route_channels_channel"("routeId", "channelId") SELECT "routeId", "channelId" FROM "temporary_route_channels_channel"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_route_channels_channel"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_764c22fc87934bb987514a27d4" ON "route_channels_channel" ("channelId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_c66ab0b5276b659d92c92eb648" ON "route_channels_channel" ("routeId") `, undefined);
        await queryRunner.query(`DROP INDEX "IDX_764c22fc87934bb987514a27d4"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_c66ab0b5276b659d92c92eb648"`, undefined);
        await queryRunner.query(`DROP TABLE "route_channels_channel"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_1050f1bce08c8eb606e1a8607d"`, undefined);
        await queryRunner.query(`DROP TABLE "route"`, undefined);
   }

}
