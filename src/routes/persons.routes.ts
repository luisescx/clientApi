import { Router } from "express";
import { PersonsController } from "../modules/persons/controllers/PersonsController";

const personsRoutes = Router();

const personController = new PersonsController();

personsRoutes.get("/list", personController.listPersons);

personsRoutes.get("/delete/:id", personController.deletePerson);

personsRoutes.post("/create", personController.createPerson);

personsRoutes.post("/update", personController.updatePerson);

export { personsRoutes };
