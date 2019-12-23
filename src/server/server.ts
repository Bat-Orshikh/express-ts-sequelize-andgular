import app from "./app";

/**
 * Start Express server.
 */
app.listen(process.env.PORT, () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    process.env.PORT,
    process.env.NODE_ENV
  );
  console.log("  Press CTRL-C to stop\n");
});
