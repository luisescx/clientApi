import { Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { Person } from "../../../database/entities/Person";

class PersonsRepository {
  private repository: Repository<Person>;

  constructor() {
    this.repository = AppDataSource.getRepository(Person);
  }

  async list(): Promise<Person[]> {
    return this.repository.find();
  }

  async create({ ...rest }: Person): Promise<Person> {
    const person = this.repository.create({ ...rest });
    return this.repository.save(person);
  }

  async findByAttributes({ ...person }: Person): Promise<Person> {
    const whereConditions = Object.keys(person);
    const whereConditionsValues = Object.values(person);

    const where = whereConditions.map((key, index) => {
      return { [key]: whereConditionsValues[index] };
    });

    return this.repository.findOne({
      where,
    });
  }

  async findById(idPerson: number): Promise<Person> {
    const person = await this.repository.findOne({
      where: {
        idPerson,
      },
    });

    return person;
  }

  async delete(idPerson: number): Promise<boolean> {
    const deleteResult = await this.repository.delete({ idPerson });

    return !!deleteResult;
  }

  async update(person: Person): Promise<Person> {
    return this.repository.save({ ...person });
  }
}

export { PersonsRepository };
