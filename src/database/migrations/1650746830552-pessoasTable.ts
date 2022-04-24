import { MigrationInterface, QueryRunner } from "typeorm";

export class pessoasTable1650746830552 implements MigrationInterface {
  name = "pessoasTable1650746830552";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE pessoas(
        \`id_pessoa\` TINYINT(255) NOT NULL AUTO_INCREMENT,
        \`nome\` CHAR(100) NOT NULL,
        \`rg\` CHAR(100) NOT NULL,
        \`cpf\` CHAR(100) NOT NULL,
        \`data_nascimento\` DATE NOT NULL,
        \`data_admissao\` DATE NOT NULL,
        \`funcao\` CHAR(100) NULL,
      PRIMARY KEY (\`id_pessoa\`));`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`pessoas\``);
  }
}
