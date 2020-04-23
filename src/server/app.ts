import express, { Request, Response, NextFunction } from "express";
import "reflect-metadata";
import * as bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import { Routers } from "./routes";
import cors from "cors";
import { morganOption, logger } from "./logger/index";
import * as path from "path";
import HttpException from "./helpers/httpException";

class App {
  public app: express.Application;
  public routers: Routers;

  constructor() {
    this.app = express();
    this.routers = new Routers();
    this.config();
  }

  private config(): void {
    //if browser accepts brotli, serve brotli
    //else default back to gzip
    this.app.get('*.js', (req: Request, res: Response, next: NextFunction) => {
      if (process.env.NODE_ENV !== 'development') {
        if (req.header('Accept-Encoding').includes('br')) {
          req.url = req.url + '.br';
          res.set('Content-Encoding', 'br');
          res.set('Content-Type', 'application/javascript');
        } else {
          req.url = req.url + '.gz';
          res.set('Content-Encoding', 'gzip');
          res.set('Content-Type', 'application/javascript');
        }
      }
      next();
    });
    this.app.get('*.css', (req: Request, res: Response, next: NextFunction) => {
      if (process.env.NODE_ENV !== 'development') {
        if (req.header('Accept-Encoding').includes('br')) {
          req.url = req.url + '.br';
          res.set('Content-Encoding', 'br');
          res.set('Content-Type', 'text/css; charset=UTF-8');
        } else {
          req.url = req.url + '.gz';
          res.set('Content-Encoding', 'gzip');
          res.set('Content-Type', 'text/css; charset=UTF-8');
        }
      }
      next();
    });

    this.app.use(express.static(path.join(__dirname, '../client')));
    this.app.use(morgan("combined", morganOption));
    this.app.use(helmet());
    this.app.use(cors());

    // support application/json type post data
    this.app.use(bodyParser.json());
    // support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));

    // add routes
    this.app.use("/api", this.routers.routes());

    // SPA: Catch all other routes and return the index file
    this.app.get('*', (req: Request, res: Response) => {
      return res.sendFile(path.join(__dirname, '../client/index.html'));
    });

    this.app.use(this.errorHandling);
  }
  /* eslint-disable @typescript-eslint/no-unused-vars */
  /* eslint-disable no-unused-vars */
  /* eslint-disable @typescript-eslint/no-explicit-any */
  private errorHandling(err: any, req: Request, res: Response, next: NextFunction): Response {
    if (err instanceof HttpException) {
      return res.status(err.status).json({
        code: err.status,
        message: err.message,
        error: err.stack
      });
    }
    else if (err instanceof Error) {
      logger.error(err.stack);
      if (process.env.NODE_ENV === "production") {
        return res.status(500).json({
          code: 500,
          message: "Internal Server Error"
        });
      } else {
        return res.status(500).json({
          code: 500,
          message: "Internal Server Error",
          error: err.stack
        });
      }
    }
  }
  /* eslint-enable @typescript-eslint/no-unused-vars */
  /* eslint-enable no-unused-vars */
  /* eslint-enable @typescript-eslint/no-explicit-any */
}
export default new App().app;