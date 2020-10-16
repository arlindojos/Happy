import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImage1602778519427 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: "images",
			columns: [
				{
          name: "id",
          type: "text",
          isPrimary: true,
          isGenerated: true,
          generationStrategy: "uuid"
				},
				{
					name: "path",
					type: "varchar",
				},
				{
					name: "orphanage_id",
					type: "text"
				}
			],
			foreignKeys: [
				{
					name: "orphanageImage",
					columnNames: ["orphanage_id"],
					referencedTableName: "orphanages",
					referencedColumnNames: ["id"],
					onUpdate: "CASCADE",
					onDelete: "CASCADE"
				}
			]
		}))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('images');
  }
}
