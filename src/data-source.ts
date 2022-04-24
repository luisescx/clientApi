import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "jobs.visie.com.br",
  port: 3306,
  username: "luisesculapio",
  password: "bHVpc2VzY3Vs",
  database: "luisesculapio",
  synchronize: false,
  logging: false,
  entities: ["./src/database/entities/*.ts"],
  migrations: ["./src/database/migrations"],
  subscribers: [],
});
