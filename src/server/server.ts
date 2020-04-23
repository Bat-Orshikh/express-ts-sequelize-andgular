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

    app.listen(process.env.PORT, () => {
      logger.info(`  App is running at http://localhost:${process.env.PORT} in ${process.env.NODE_ENV} mode`);
      logger.info("  Press CTRL-C to stop\n");
    });
  }).catch((error: Error) => console.log(error));
