import { Person } from "../../../database/entities/Person";
import { AppError } from "../../../errors/AppError";
import { PersonsRepository } from "../repositories/PersonsRepository";

const personsRepository = new PersonsRepository();

class PersonUseCase {
  async listPersons(): Promise<Person[]> {
    const persons = await personsRepository.list();

    return persons;
  }

  async createPerson(person: Person): Promise<Person> {
    if (!person.name) {
      throw new AppError("Nome é obrigatório");
    }
    if (!person.cpf) {
      throw new AppError("CPF é obrigatório");
    }
    if (!person.rg) {
      throw new AppError("RG é obrigatório");
    }
    if (!person.admissionDate) {
      throw new AppError("Data de admissão é obrigatório");
    }
    if (!person.birthDate) {
      throw new AppError("Data de Nascimento é obrigatório");
    }

    const newPerson = {
      cpf: person.cpf,
      rg: person.rg,
    } as Person;

    const personAlreadyExist = await personsRepository.findByAttributes({
      ...newPerson,
    });

    if (personAlreadyExist) {
      throw new AppError("CPF ou RG já cadastrado por outro usuário");
    }

    return personsRepository.create(person);
  }

  async delete(idPerson: number): Promise<boolean> {
    const person = await personsRepository.findById(idPerson);

    if (!person) {
      throw new AppError("Colaborador não existe");
    }

    const isDeleted = await personsRepository.delete(idPerson);
    return !!isDeleted;
  }

  async update(person: Person): Promise<Person> {
    const personExist = await personsRepository.findById(person.idPerson);

    if (!personExist) {
      throw new AppError("Colaborador não existe");
    }

    const personToUpdate = {} as Person;

    if (person.cpf) {
      personToUpdate.cpf = person.cpf;
    }

    if (person.rg) {
      personToUpdate.rg = person.rg;
    }
    console.log("personToUpdate", personToUpdate);

    if (Object.keys(personToUpdate).length > 0) {
      const personAlreadyExist = await personsRepository.findByAttributes({
        ...personToUpdate,
      });

      console.log("personAlreadyExist", personAlreadyExist);
      if (
        personAlreadyExist &&
        personAlreadyExist.idPerson !== person.idPerson
      ) {
        throw new AppError(
          "CPF ou RG já está sendo usado por outro colaborador"
        );
      }
    }

    return personsRepository.update(person);
  }
}

export { PersonUseCase };
