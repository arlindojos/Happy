import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphanages1602733625686 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable( new Table({
      name: "orphanages",
      columns: [
        {
          name: "id",
          type: "text",
          isPrimary: true,
          isGenerated: true,
          generationStrategy: "uuid"
        },
        {
          name: "name",
          type: "varchar"
        },
        {
          name: "latitude",
          type: "decimal",
          scale: 10,
          precision: 2
        },
        {
          name: "longitude",
          type: "decimal",
          scale: 10,
          precision: 2
        },
        {
          name: "about",
          type: "text"
        },
        {
          name: "instructions",
          type: "text"
        }, 
        {
          name: "opening_hour",
          type: "text"
        }, 
        {
          name: "open_on_weekends",
          type: "boolean",
          default: false
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("orphanages");
  }
}
