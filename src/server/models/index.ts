import { Sequelize, Model, ModelCtor } from "sequelize";
import { logger } from "../logger";
import { Company, initCompany, associateCompany } from "./company.model";
import { Institution, initInstitution, associateInstitution } from "./institution.model";

export class Database {
  private sequelize: Sequelize;
  private models: { [key: string]: ModelCtor<Model> };
  private static instance: Database;

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {
    try {
      this.sequelize = new Sequelize({
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: "postgres",
        ssl: true,
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false
          }
        },
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        logging: sql => logger.info(sql),
      });
    } catch (error) {
      logger.error(error.stack);
      throw error;
    }
    this.models = {};
    this.models["Company"] = Company;
    this.models["Institution"] = Institution;

    try {
      initCompany(this.sequelize);
      initInstitution(this.sequelize);

      associateCompany(this.models);
      associateInstitution(this.models);
    } catch (error) {
      logger.error(error.stack);
      throw error;
    }
  }

  public getConnection(): Sequelize {
    return this.sequelize;
  }
  public getModels(): { [key: string]: ModelCtor<Model> } {
    return this.models;
  }
}
