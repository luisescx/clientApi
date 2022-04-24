import { Request, Response } from "express";
import { Person } from "../../../database/entities/Person";
import { AppError } from "../../../errors/AppError";
import { PersonUseCase } from "./PersonUseCase";

const personsUseCase = new PersonUseCase();

class PersonsController {
  async listPersons(request: Request, response: Response): Promise<Response> {
    const personsList = await personsUseCase.listPersons();

    return response.json(personsList);
  }

  async createPerson(request: Request, response: Response): Promise<Response> {
    const person = { ...request.body } as Person;

    const newPerson = await personsUseCase.createPerson(person);

    return response.status(201).json(newPerson);
  }

  async deletePerson(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    if (!id) {
      throw new AppError("Por favor, informe o id!");
    }

    const idNumber = Number(id);
    if (isNaN(idNumber)) {
      throw new AppError("Por favor, id precisa ser um número");
    }

    const isDeleted = await personsUseCase.delete(idNumber);

    return response.status(201).json(isDeleted);
  }

  async updatePerson(request: Request, response: Response): Promise<Response> {
    const person = { ...request.body } as Person;

    if (!person.idPerson) {
      throw new AppError("Por favor, informe o id!");
    }

    const personUpdated = await personsUseCase.update(person);
    return response.status(201).json(personUpdated);
  }
}

export { PersonsController };
