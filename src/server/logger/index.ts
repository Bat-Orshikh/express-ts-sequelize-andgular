import * as winston from 'winston';
import * as fs from 'fs';
import path from "path";
import { Options } from 'morgan';

const dirLogs = path.join(__dirname, '../logs');
if (!fs.existsSync(dirLogs)) {
  fs.mkdirSync(dirLogs);
}

const options = {
  combined: {
    filename: dirLogs + "/combined.log",
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  exception: {
    level: "error",
    filename: dirLogs + "/error.log"
  }
};

// Creating logger
export const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.combined),
    new winston.transports.File(options.exception)
  ],
  exitOnError: false
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

export const morganOption: Options = {
  stream: {
    write: function (message: string) {
      logger.info(message.trim());
    }
  }
};