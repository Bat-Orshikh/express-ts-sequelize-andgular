import express, { Request, Response } from "express";
import * as bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import { Routers } from "./routes";
import cors from "cors";
import { morganOption } from "./logger/index";
import * as path from "path";

class App {
  public app: express.Application;
  public routers: Routers;

  constructor() {
    this.app = express();
    this.routers = new Routers();
    this.connectDatabase();
    this.config();
    this.errorHandling();
  }

  private config(): void {
    this.app.use(express.static(path.join(__dirname, '../client')));
    this.app.use(morgan("combined", morganOption));
    this.app.use(helmet());
    this.app.use(cors());

    // support application/json type post data
    this.app.use(bodyParser.json());
    // support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));

    // add routes
    this.app.use("/", this.routers.routes());

    // SPA: Catch all other routes and return the index file
    this.app.get('*', (req: Request, res: Response) => {
      return res.sendFile(path.join(__dirname, '../client/index.html'));
    });
  }
  private errorHandling() {
    // this.app.use()
  }

  private connectDatabase() {
    // connect postgres database server
  }
}

export default new App().app;
