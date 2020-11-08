const path    = require("path"),
      logger  = require("./logger"),
      express = require("express");

const BASE_DIR  = path.join(__dirname, ".."),
      apiRouter = express.Router();

apiRouter.use((req, res, next) => {
    logger.info(`URL:  ${req.originalUrl}`);
    next();
});

apiRouter.use(express.static(path.join(BASE_DIR, "client")));
apiRouter.use(express.static(path.join(BASE_DIR, "dist")));
apiRouter.use(express.static(path.join(BASE_DIR, "node_modules")));

module.exports = apiRouter;
