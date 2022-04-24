import { Router } from "express";
import { personsRoutes } from "./persons.routes";

const router = Router();

router.use("/persons", personsRoutes);

export { router };
