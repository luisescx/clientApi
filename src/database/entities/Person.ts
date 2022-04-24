import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("pessoas")
class Person {
  @PrimaryGeneratedColumn({ name: "id_pessoa" })
  idPerson: number;

  @Column({ name: "nome" })
  name: string;

  @Column()
  rg: string;

  @Column()
  cpf: string;

  @Column({ name: "data_nascimento" })
  birthDate: Date;

  @Column({ name: "data_admissao" })
  admissionDate: Date;

  @Column({
    name: "funcao",
    nullable: true,
  })
  occupation: string;
}

export { Person };
