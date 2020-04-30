import app from "./app";
import { logger } from "./logger";
import { Database } from "./models";

/**
 * Start Express server.
 */

Database.getInstance()
  .getConnection()
  .authenticate()
  .then(() => {
    logger.info("Connected to Database server!");

    return new Promise((resolve, reject) => {
      app.listen(process.env.PORT, () => {
        return resolve("OK");
      }).on("error", async (error) => {
        return reject(error);
      });
    });
  })
  .then(() => {
    logger.info(`  App is running at http://localhost:${process.env.PORT} in ${process.env.NODE_ENV} mode`);
    logger.info("  Press CTRL-C to stop\n");
  }).catch((error: Error) => {
    logger.error(error);
  });
