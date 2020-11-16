/**
 * @file index.js
 *
 * @version 1.0
 *
 * @author Calum Judd Anderson
 *
 * @brief Entry point for the web server
 */
const logger  = require("./logger"),
      router  = require("./router"),
      express = require("express");

const app = express();

const port = process.env.PORT || 8080;

app.use(router);

app.listen(port, () => {
    logger.info(`Listening on ${port}`);
});
